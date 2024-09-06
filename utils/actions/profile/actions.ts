'use server'

import { clerkClient, currentUser } from '@clerk/nextjs/server'
import db from '../../db'
import { profileSchema } from '../../schemas'
import type { actionFunction } from '@/utils/types'
import { redirect } from 'next/navigation'

export const createProfileAction: actionFunction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    // get current user from clerk
    const user = await currentUser()

    if (!user) throw new Error('Please login to create a profile.')

    // create object from formdata
    const formDataObject = Object.fromEntries(formData)

    // validate formData fields
    const validatedFields = profileSchema.parse(formDataObject)

    // create new user profile in db using info from clerk and formdata
    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      },
    })

    // add 'hasProfile' metadata to the users clerk profile
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    })
  } catch (error: unknown) {
    return {
      message:
        error instanceof Error ? error.message : 'Something went wrong...',
    }
  }

  return redirect('/')
}
