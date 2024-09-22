import db from '../../db'
import { getAuthUser } from '@/utils/functions.utils'

/**
 * FETCH USER OWNED RENTALS
 * @returns
 */
export const fetchReservations = async () => {
  const user = await getAuthUser()

  return await db.booking.findMany({
    where: {
      paymentStatus: true,
      property: {
        profileId: user.id,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      orderTotal: true,
      totalNights: true,
      checkIn: true,
      checkOut: true,

      property: {
        select: {
          id: true,
          name: true,
          price: true,
          country: true,
        },
      },
    },
  })
}

export const fetchReservationStats = async () => {
  const user = await getAuthUser()

  const properties = await db.property.count({
    where: {
      profileId: user.id,
    },
  })

  const totals = await db.booking.aggregate({
    _sum: {
      orderTotal: true,
      totalNights: true,
    },

    where: {
      paymentStatus: true,
      property: {
        profileId: user.id,
      },
    },
  })

  return {
    properties,
    nights: totals._sum.totalNights || 0,
    totalAmount: totals._sum.orderTotal || 0,
  }
}
