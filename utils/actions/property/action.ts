'use server'

import db from '../../db'
import type { actionFunction } from '@/utils/types'

import {
  imageSchema,
  propertySchema,
  validateWithZodSchema,
} from '@/utils/schemas'
import { errorMessage, getAuthUser } from '@/utils/functions.utils'
import { redirect } from 'next/navigation'
import { uploadImage } from '@/utils/supabase'

/**
 * CREATE PROPERTY ACTION
 * @param prevState
 * @param formData
 * @returns
 */
export const createPropertyAction: actionFunction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser()

    const formDataObject = Object.fromEntries(formData)
    const uploadedFile = formData.get('image') as File

    const validatedFields = validateWithZodSchema(
      propertySchema,
      formDataObject
    )
    const validatedFile = validateWithZodSchema(imageSchema, {
      image: uploadedFile,
    })

    // upload property image to supabase bucket
    const uploadedImagePublicUrl = await uploadImage(
      validatedFile.image,
      'properties'
    )

    // insert new property into supabase db
    await db.property.create({
      data: {
        ...validatedFields,
        image: uploadedImagePublicUrl,
        profileId: user.id,
      },
    })
  } catch (error) {
    return errorMessage(error)
  }

  return redirect('/')
}

/**
 * FETCH PROPERTY DETAILS
 * @param id
 */
export const fetchPropertyDetails = async (id: string) => {
  return db.property.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  })
}
