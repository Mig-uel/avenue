'use server'

import { auth } from '@clerk/nextjs/server'
import { CardSignInButton } from '../form/buttons.component'
import { fetchFavoriteId } from '@/utils/actions/favorites/action'
import FavoriteButtonForm from './favorite-button-form.component'

const FavoriteButton = async ({ propertyId }: { propertyId: string }) => {
  const { userId } = auth()

  if (!userId) return <CardSignInButton />

  const favoriteId = await fetchFavoriteId({ propertyId })

  return <FavoriteButtonForm favoriteId={favoriteId} propertyId={propertyId} />
}
export default FavoriteButton
