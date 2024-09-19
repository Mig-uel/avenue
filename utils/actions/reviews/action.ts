'use server'

import db from '../../db'
import { errorMessage, getAuthUser } from '@/utils/functions.utils'
import { reviewSchema, validateWithZodSchema } from '@/utils/schemas'
import { revalidatePath } from 'next/cache'

/**
 * CREATE REVIEW ACTION
 * @param prevState
 * @param formData
 * @returns
 */
export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser()

    const formDataObject = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(reviewSchema, formDataObject)

    await db.review.create({
      data: {
        ...validatedFields,
        profileId: user.id,
      },
    })

    revalidatePath(`/properties/${validatedFields.propertyId}`)

    return {
      message: 'Added review',
    }
  } catch (error) {
    return errorMessage(error)
  }
}

/**
 * FETCH PROPERTY REVIEWS
 * @param propertyId
 * @returns
 */
export const fetchPropertyReviews = async (propertyId: string) => {
  const reviews = await db.review.findMany({
    where: {
      propertyId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return reviews
}

export const fetchPropertyReviewsByUser = async () => {}

export const deleteReviewAction = async () => {}
