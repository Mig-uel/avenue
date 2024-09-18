'use client'

import { useState } from 'react'
import Title from './title.component'
import { Button } from '../ui/button'

const Description = ({ description }: { description: string }) => {
  const words = description.split(' ')
  const isLongDescription = words.length > 100

  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState<boolean>(
    !isLongDescription
  )

  const modifiedDescription = isLongDescription
    ? words.splice(0, 100).join(' ') + '...'
    : description

  return (
    <article className='mt-4'>
      <Title text='Description' />

      <p className='text-muted-foreground font-light leading-loose'>
        {isFullDescriptionShown ? description : modifiedDescription}
      </p>
      {isLongDescription && (
        <Button
          variant='link'
          className='p-0'
          onClick={() => setIsFullDescriptionShown((prev) => !prev)}
        >
          {isFullDescriptionShown ? 'Show less' : 'Show more'}
        </Button>
      )}
    </article>
  )
}
export default Description
