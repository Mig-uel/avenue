'use server'

import { clerkClient, currentUser } from '@clerk/nextjs/server'
import db from '../../db'
import {
  imageSchema,
  profileSchema,
  validateWithZodSchema,
} from '../../schemas'
import type { actionFunction } from '@/utils/types'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { removeOldImage, uploadImage } from '@/utils/supabase'
import { errorMessage, getAuthUser } from '@/utils/functions.utils'

// create profile action
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

    // use generic validate helper function
    const validatedFields = validateWithZodSchema(profileSchema, formDataObject)

    const isUsernameTaken = await db.profile.findFirst({
      where: {
        username: validatedFields.username,
      },
    })

    // check if username exists
    if (isUsernameTaken)
      return {
        message: 'Username is not available',
      }

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
    return errorMessage(error)
  }

  return redirect('/')
}

// update profile action
export const updateProfileAction: actionFunction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    // get user from clerk
    const user = await getAuthUser()

    // create object from formData
    const formDataObject = Object.fromEntries(formData)

    // use generic validate helper function
    const validatedFields = validateWithZodSchema(profileSchema, formDataObject)

    const isUsernameTaken = await db.profile.findFirst({
      where: {
        username: validatedFields.username,
      },
    })

    if (isUsernameTaken && isUsernameTaken.clerkId !== user.id)
      return {
        message: 'Username is not available',
      }

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    })

    revalidatePath('/profile')

    return {
      message: 'Profile updated',
    }
  } catch (error) {
    return errorMessage(error)
  }
}

// updateProfileImageAction
export const updateProfileImageAction: actionFunction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser()
    const image = formData.get('image') as File

    const validatedFields = validateWithZodSchema(imageSchema, { image })

    const newImagePath = await uploadImage(validatedFields.image, 'avatars')

    /* --------------------- */
    // TODO: remove old user avatar
    // get user from supabase
    // const userFromDb = await db.profile.findUnique({
    //   where: {
    //     clerkId: user.id,
    //   },
    // })

    // if (!userFromDb) throw new Error('User not found')

    // const oldImage = userFromDb.profileImage
    // await removeOldImage(oldImage)
    /* --------------------- */

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: newImagePath,
      },
    })

    revalidatePath('/profile')

    return { message: 'Profile image updated' }
  } catch (error) {
    return errorMessage(error)
  }
}

// fetch profile image from supabase
export const fetchProfileImage = async () => {
  // get user info from clerk
  const user = await currentUser()

  // if no user, return null
  if (!user) return null

  // find user profile where clerkId === user.id from clerk and
  // select profileImage
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  })

  // if no profileImage, return null
  if (!profile?.profileImage) return null

  // return profile image
  return profile.profileImage
}

// fetch user from clerk, and, fetch their profile from supabase
export const fetchProfile = async () => {
  const user = await getAuthUser()

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!profile) return redirect('/profile/create')

  return profile
}
