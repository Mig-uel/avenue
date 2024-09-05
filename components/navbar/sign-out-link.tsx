'use client'

import { useToast } from '@/hooks/use-toast'
import { SignOutButton } from '@clerk/nextjs'

const SignOutLink = () => {
  const { toast } = useToast()

  const handleClick = () => {
    toast({ description: 'You have been signed out' })
  }

  return (
    <SignOutButton redirectUrl='/'>
      <span className='capitalize w-full text-left' onClick={handleClick}>
        Logout
      </span>
    </SignOutButton>
  )
}

export default SignOutLink
