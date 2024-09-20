'use server'

import { calculateTotals } from '@/utils/calculateTotal'
import db from '../../db'
import { errorMessage, getAuthUser } from '@/utils/functions.utils'
import { redirect } from 'next/navigation'

export const createBookingAction = async (prevState: {
  propertyId: string
  checkIn: Date
  checkOut: Date
}) => {
  try {
    const user = await getAuthUser()

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
  } catch (error) {
    return errorMessage(error)
  }

  redirect('/bookings')
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

