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

/**
 * FETCH REVIEWS BY USER
 */
export const fetchPropertyReviewsByUser = async () => {
  const user = await getAuthUser()

  const reviews = await db.review.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,

      property: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return reviews
}

/**
 * DELETE REVIEW ACTION
 * @param prevState
 * @returns
 */
export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  try {
    const user = await getAuthUser()
    const { reviewId } = prevState

    await db.review.delete({
      where: {
        id: reviewId,
        profileId: user.id,
      },
    })

    revalidatePath('/reviews')
    return {
      message: 'Review deleted',
    }
  } catch (error) {
    return errorMessage(error)
  }
}

/**
 * FETCH PROPERTY RATING AVG AND COUNT
 * @param propertyId
 * @returns
 */
export const fetchPropertyRating = async (propertyId: string) => {
  const result = await db.review.groupBy({
    by: ['propertyId'],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      propertyId,
    },
  })

  return {
    rating: result[0]?._avg?.rating?.toFixed() ?? 0,
    count: result[0]?._count?.rating ?? 0,
  }
}
