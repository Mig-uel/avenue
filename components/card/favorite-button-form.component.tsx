'use client'

import { usePathname } from 'next/navigation'
import FormContainer from '../form/form-container.component'
import { CardSubmitButton } from '../form/buttons.component'
import { toggleFavoriteAction } from '@/utils/actions/favorites/action'

type FavoriteButtonFormProps = {
  propertyId: string
  favoriteId: string | null | undefined
}

const FavoriteButtonForm = ({
  propertyId,
  favoriteId,
}: FavoriteButtonFormProps) => {
  const pathname = usePathname()

  const toggleAction = toggleFavoriteAction.bind(null, {
    propertyId,
    favoriteId,
    pathname,
  })

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  )
}
export default FavoriteButtonForm
