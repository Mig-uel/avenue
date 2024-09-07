'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'

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

export default SubmitButton
