'use server'

import { profileSchema } from '../../schemas'
import type { actionFunction } from '@/utils/types'

export const createProfileAction: actionFunction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const formDataObject = Object.fromEntries(formData)

    // validate formData fields
    const validatedFields = profileSchema.parse(formDataObject)

    console.log(validatedFields)

    return {
      message: 'Profile updated.',
    }
  } catch (error: unknown) {
    console.log(error)
    return {
      message: 'There was an error',
    }
  }
}
