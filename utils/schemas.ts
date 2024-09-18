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
  const maxUploadSize = 3000000
  const acceptedFileTypes = ['image/']

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize
    }, 'File size must be less than 3 MB')
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

/** PROPERTY SCHEMA */
export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(100, {
      message: 'Name must be less than 100 characters.',
    }),
  tagline: z
    .string()
    .min(2, {
      message: 'Tagline must be at least 2 characters.',
    })
    .max(100, {
      message: 'Tagline must be less than 100 characters.',
    }),
  price: z.coerce.number().int().min(0, {
    message: 'Price must be a positive number.',
  }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length
      return wordCount >= 10 && wordCount <= 1000
    },
    {
      message: 'Description must be between 10 and 1000 words.',
    }
  ),
  country: z.string(),
  guests: z.coerce.number().int().min(0, {
    message: 'Number of guest must be a positive number.',
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: 'Number of bedrooms must be a positive number.',
  }),
  beds: z.coerce.number().int().min(0, {
    message: 'Number of beds must be a positive number.',
  }),
  baths: z.coerce.number().int().min(0, {
    message: 'Number of baths must be a positive number.',
  }),
  amenities: z.string(),
})
