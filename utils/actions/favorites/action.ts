import db from '../../db'
import { getAuthUser } from '@/utils/functions.utils'

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

export const toggleFavoriteAction = async () => {
  return {
    message: 'favorite toggled',
  }
}
