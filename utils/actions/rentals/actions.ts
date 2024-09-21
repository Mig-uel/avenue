import { revalidatePath } from 'next/cache'
import db from '../../db'
import { errorMessage, getAuthUser } from '@/utils/functions.utils'
/**
 * DELETE RENTALS BY PROPERTY ID AND USER ID
 * @param prevState
 * @returns
 */
export const deleteRentalAction = async (prevState: { propertyId: string }) => {
  try {
    const user = await getAuthUser()
    const { propertyId } = prevState

    const property = await db.property.delete({
      where: {
        id: propertyId,
        profileId: user.id,
      },
      select: {
        name: true,
      },
    })

    revalidatePath('/rentals')

    return {
      message: `Rental '${property.name} was deleted'`,
    }
  } catch (error) {
    return errorMessage(error)
  }
}

/**
 * FETCH RENTALS
 * @returns
 */
export const fetchRentals = async () => {
  const user = await getAuthUser()

  const rentals = await db.property.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  })

  const rentalsWithBookings = await Promise.all(
    rentals.map(async (rental) => {
      const totalNightsSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
        },
        _sum: {
          totalNights: true,
        },
      })

      const orderTotalSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
        },
        _sum: {
          orderTotal: true,
        },
      })

      return {
        ...rental,
        totalNightsSum: totalNightsSum._sum.totalNights,
        orderTotalSum: orderTotalSum._sum.orderTotal,
      }
    })
  )

  return rentalsWithBookings
}
