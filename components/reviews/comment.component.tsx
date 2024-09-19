'use client'

import { useState } from 'react'
import { Button } from '../ui/button'

const Comment = ({ comment }: { comment: string }) => {
  const isLongComment = comment.length > 130

  const [isExpanded, setIsExpanded] = useState(!isLongComment)

  const modifiedComment = isLongComment
    ? `${comment.slice(0, 130)}...`
    : comment

  return (
    <div>
      <p className='text-sm'>{isExpanded ? comment : modifiedComment}</p>

      {isLongComment && (
        <Button
          variant='link'
          className='pl-0 text-muted-foreground'
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  )
}
export default Comment
