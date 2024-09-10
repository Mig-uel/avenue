import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

/**
 * GET USER DATA FROM CLERK
 * @returns
 */
export const getAuthUser = async () => {
  const user = await currentUser()

  if (!user) throw new Error('You must be logged in to access this route')

  if (!user.privateMetadata.hasProfile) return redirect('/profile/create')

  return user
}

/**
 * RETURN ERROR MESSAGE
 * @param error
 * @returns
 */
export const errorMessage = (error: unknown): { message: string } => {
  console.log(error)

  return {
    message: error instanceof Error ? error.message : 'Something went wrong...',
  }
}
