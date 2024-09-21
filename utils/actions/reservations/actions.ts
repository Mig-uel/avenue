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
      profileId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
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
