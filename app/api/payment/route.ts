import db from '../../../utils/db'
import Stripe from 'stripe'
import { formatDate } from '@/utils/format'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const requestHeaders = new Headers(req.headers)

    const origin = requestHeaders.get('origin')

    // get bookingId from req body
    const { bookingId } = await req.json()

    // find booking from db
    const booking = await db.booking.findUnique({
      where: {
        id: bookingId,
      },

      include: {
        property: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    if (!booking)
      return Response.json(null, {
        status: 404,
        statusText: 'Booking Not Found',
      })

    const {
      totalNights,
      orderTotal,
      checkIn,
      checkOut,
      property: { image, name },
    } = booking

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { bookingId: booking.id },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name,
              images: [image],
              description: `Thank you for choosing to stay with us! Your reservation details are as follows: Check-in date is ${formatDate(
                checkIn
              )}, check-out date is ${formatDate(
                checkOut
              )}, for a total of ${totalNights} ${
                totalNights <= 1 ? 'night' : 'nights'
              }. Please review this information before proceeding with your payment. We hope you enjoy your stay.`,
            },
            unit_amount: orderTotal * 100,
          },
        },
      ],
      mode: 'payment',

      // sessionId will be injected my stripe and then user is forwarded to our api route
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.log(error)
    return NextResponse.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    })
  }
}
