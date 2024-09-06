import { z } from 'zod'

/** USER PROFILE FORMDATA SCHEMA */
export const profileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(4).max(12),
})
