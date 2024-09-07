import { z, ZodSchema } from 'zod'

/** USER PROFILE FORMDATA SCHEMA */
export const profileSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is too short' }),
  lastName: z.string().min(2, { message: 'Last name is too short' }),
  username: z
    .string()
    .min(4, { message: 'Username is too short' })
    .max(12, { message: 'Username is too long' }),
})

// validate image file size and type helper function for zod
const validateFile = () => {
  const maxUploadSize = 1024 * 1024
  const acceptedFileTypes = ['image/']

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize
    }, 'File size must be less than 1 MB')
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      )
    }, 'File must be an image')
}

/** PROFILE IMAGE INPUT SCHEMA */
export const imageSchema = z.object({
  image: validateFile(),
})

// generic zod validator helper function
export const validateWithZodSchema = <T>(
  schema: ZodSchema<T>,
  data: unknown
): T => {
  // validate the object that contains the formData against the provided schema
  const result = schema.safeParse(data)

  // check zod validation output
  if (!result.success) {
    const errors = result.error.errors.map((e) => e.message)

    throw new Error(errors.join(' | '))
  }

  return result.data
}
