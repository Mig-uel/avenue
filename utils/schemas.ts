import { z } from 'zod'

/** USER PROFILE FORMDATA SCHEMA */
export const profileSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is too short' }),
  lastName: z.string().min(2, { message: 'Last name is too short' }),
  username: z
    .string()
    .min(4, { message: 'Username is too short' })
    .max(12, { message: 'Username is too long' }),
})
