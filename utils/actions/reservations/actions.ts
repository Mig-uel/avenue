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
