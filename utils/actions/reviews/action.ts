'use server'

import db from '../../db'
import { errorMessage, getAuthUser } from '@/utils/functions.utils'
import { reviewSchema, validateWithZodSchema } from '@/utils/schemas'
import { revalidatePath } from 'next/cache'

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

export const fetchPropertyReviews = async () => {}

export const fetchPropertyReviewsByUser = async () => {}

export const deleteReviewAction = async () => {}
