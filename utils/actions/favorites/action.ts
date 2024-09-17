'use server'

import { revalidatePath } from 'next/cache'
import db from '../../db'
import { errorMessage, getAuthUser } from '@/utils/functions.utils'

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string
}) => {
  try {
    // get user from getAuthUser() helper function
    const user = await getAuthUser()

    // find favorite
    const favorite = await db.favorite.findFirst({
      where: {
        propertyId,
        profileId: user.id,
      },
      select: {
        id: true,
      },
    })

    return favorite?.id || null
  } catch (error) {
    console.log(error)
  }
}

export const toggleFavoriteAction = async (prevState: {
  propertyId: string
  favoriteId: string | null | undefined
  pathname: string
}) => {
  const { favoriteId, pathname, propertyId } = prevState
  try {
    const user = await getAuthUser()

    if (favoriteId)
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      })
    else
      await db.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      })

    revalidatePath(pathname)
    return {
      message: favoriteId ? 'Removed from Favorites' : 'Added to Favorites',
    }
  } catch (error) {
    return errorMessage(error)
  }
}

export const fetchFavorites = async () => {
  const user = await getAuthUser()

  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
          image: true,
        },
      },
    },
  })

  return favorites.map((fave) => fave.property)
}
