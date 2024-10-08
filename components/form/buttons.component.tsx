'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { SignInButton } from '@clerk/nextjs'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { LucidePenSquare, LucideTrash2 } from 'lucide-react'

type SubmitButtonProps = {
  className?: string
  text?: string
  loadingText?: string
  size?: 'default' | 'lg' | 'sm'
}

const SubmitButton = ({
  className = '',
  text = 'submit',
  loadingText = 'Submitting...',
  size = 'lg',
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      className={`capitalize ${className}`}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  )
}

export const CardSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button
        type='button'
        size='icon'
        variant='outline'
        className='p-2 cursor-pointer'
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  )
}

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className='p-2 cursor-pointer'
    >
      {pending ? (
        <ReloadIcon className='animate-spin' />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  )
}

type ActionButton = 'edit' | 'delete'

export const ActionButton = ({
  buttonAction,
}: {
  buttonAction: ActionButton
}) => {
  const { pending } = useFormStatus()

  const buttonIcon =
    buttonAction === 'edit' ? (
      <LucidePenSquare />
    ) : buttonAction === 'delete' ? (
      <LucideTrash2 />
    ) : (
      (() => {
        const never: never = buttonAction
        throw new Error(`Invalid action type: ${never}`)
      })()
    )

  return (
    <Button
      type='submit'
      size='icon'
      variant='link'
      className='p-2 cursor-pointer'
    >
      {pending ? <ReloadIcon className='animate-spin' /> : buttonIcon}
    </Button>
  )
}

export default SubmitButton
