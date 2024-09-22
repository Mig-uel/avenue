'use server'

import { calculateTotals } from '@/utils/calculateTotal'
import db from '../../db'
import { errorMessage, getAuthUser } from '@/utils/functions.utils'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export const createBookingAction = async (prevState: {
  propertyId: string
  checkIn: Date
  checkOut: Date
}) => {
  // booking id
  let bookingId: null | string = null

  try {
    const user = await getAuthUser()

    // delete bookings where user has not paid
    await db.booking.deleteMany({
      where: {
        profileId: user.id,
        paymentStatus: false,
      },
    })

    const { propertyId, checkIn, checkOut } = prevState

    const property = await db.property.findUnique({
      where: {
        id: propertyId,
      },
      select: {
        price: true,
      },
    })

    if (!property) throw new Error('Oops, that property was not found...')

    const { total, totalNights } = calculateTotals({
      checkIn,
      checkOut,
      price: property.price,
    })

    const booking = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        totalNights,
        orderTotal: total,
        profileId: user.id,
        propertyId: propertyId,
      },
    })

    bookingId = booking.id
  } catch (error) {
    return errorMessage(error)
  }

  redirect(`/checkout?bookingId=${bookingId}`)
}

/**
 * FETCH BOOKINGS
 * @returns
 */
export const fetchBookings = async () => {
  const user = await getAuthUser()

  const bookings = await db.booking.findMany({
    where: {
      profileId: user.id,
      paymentStatus: true,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return bookings
}

/**
 * DELETE BOOKING
 * @param prevState
 * @returns
 */
export const deleteBookingAction = async (prevState: { bookingId: string }) => {
  try {
    const { bookingId } = prevState

    const user = await getAuthUser()

    const result = await db.booking.delete({
      where: {
        id: bookingId,
        profileId: user.id,
      },
    })

    revalidatePath('/bookings')

    return {
      message: 'Booking has been deleted',
    }
  } catch (error) {
    return errorMessage(error)
  }
}
