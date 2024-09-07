'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CircleUserRound } from 'lucide-react'
import type { actionFunction } from '@/utils/types'
import { Button } from '../ui/button'
import ImageInput from './image-input.component'
import FormContainer from './form-container.component'
import SubmitButton from './buttons.component'

type ImageInputContainerProps = {
  image: string
  name: string
  action: actionFunction
  text: string
  children?: React.ReactNode
}

const ImageInputContainer = ({
  image,
  name,
  action,
  text,
  children,
}: ImageInputContainerProps) => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)

  return (
    <div>
      {image ? (
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className='rounded object-cover mb-4 w-24 h-24'
        />
      ) : (
        <CircleUserRound className='w-24 h-24 bg-primary rounded text-white mb-4' />
      )}
      <Button
        variant='outline'
        size='sm'
        onClick={() => setIsFormVisible((prev) => !prev)}
      >
        {text}
      </Button>
      {isFormVisible && (
        <div className='max-w-lg mt-4'>
          <FormContainer action={action}>
            {children}
            <ImageInput />
            <SubmitButton size='sm' />
          </FormContainer>
        </div>
      )}
    </div>
  )
}
export default ImageInputContainer
