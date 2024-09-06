'use server'

import { clerkClient, currentUser } from '@clerk/nextjs/server'
import db from '../../db'
import { profileSchema } from '../../schemas'
import type { actionFunction } from '@/utils/types'
import { redirect } from 'next/navigation'

const getAuthUser = async () => {
  const user = await currentUser()

  if (!user) throw new Error('You must be logged in to access this route')

  if (!user.privateMetadata.hasProfile) return redirect('/profile/create')

  return user
}

const errorMessage = (error: unknown): { message: string } => {
  console.log(error)

  return {
    message: error instanceof Error ? error.message : 'Something went wrong...',
  }
}

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
    return {
      message: 'update profile action',
    }
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
