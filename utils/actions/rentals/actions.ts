'use server'

import { revalidatePath } from 'next/cache'
import db from '../../db'
import { errorMessage, getAuthUser } from '@/utils/functions.utils'
import { propertySchema, validateWithZodSchema } from '@/utils/schemas'
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

/**
 * FETCH PROPERTY/RENTAL DETAILS
 * @param propertyId
 * @returns
 */
export const fetchRentalDetails = async (propertyId: string) => {
  const user = await getAuthUser()
  return db.property.findUnique({
    where: {
      id: propertyId,
      profileId: user.id,
    },
  })
}

/**
 * UPDATE PROPERTY ACTION
 * @param prevState
 * @param formData
 * @returns
 */
export const updatePropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser()

    const propertyId = formData.get('propertyId') as string

    const formDataObject = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(
      propertySchema,
      formDataObject
    )

    await db.property.update({
      where: {
        id: propertyId,
        profileId: user.id,
      },
      data: {
        ...validatedFields,
      },
    })

    revalidatePath(`/rentals/${propertyId}/edit`)

    return {
      message: 'Rental has been updated',
    }
  } catch (error) {
    return errorMessage(error)
  }
}
