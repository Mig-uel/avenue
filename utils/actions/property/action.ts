import type { actionFunction } from '@/utils/types'

import { propertySchema, validateWithZodSchema } from '@/utils/schemas'
import { errorMessage, getAuthUser } from '@/utils/functions.utils'
import { redirect } from 'next/navigation'

export const createPropertyAction: actionFunction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser()

    const formDataObject = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(
      propertySchema,
      formDataObject
    )

    // return redirect('/')
    return {
      message: 'property created',
    }
  } catch (error) {
    return errorMessage(error)
  }
}
