'use server'

import { auth } from '@clerk/nextjs/server'
import { FaHeart } from 'react-icons/fa'
import { Button } from '../ui/button'
import { CardSignInButton } from '../form/buttons.component'

const FavoriteButton = ({ propertyId }: { propertyId: string }) => {
  const { userId } = auth()

  if (!userId) return <CardSignInButton />

  return (
    <Button size='icon' variant='outline' className='p-2 cursor-pointer'>
      <FaHeart />
    </Button>
  )
}
export default FavoriteButton
