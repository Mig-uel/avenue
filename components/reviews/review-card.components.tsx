import Link from 'next/link'
import { Card, CardContent, CardHeader } from '../ui/card'
import Comment from './comment.component'
import Rating from './rating.component'

type ReviewCard = {
  propertyId?: string
  comment: string
  rating: number
  name: string
  image: string
  children?: React.ReactNode
}

const ReviewCard = ({
  comment,
  rating,
  name,
  image,
  children,
  propertyId,
}: ReviewCard) => {
  return (
    <Card className='relative'>
      <CardHeader>
        <div className='flex items-center'>
          <img
            src={image}
            alt={`${name} profile image`}
            className='w-12 h-12 rounded-full object-cover'
          />
          <div className='ml-4'>
            <h3 className='text-sm font-bold mb-1'>
              <Link
                href={`/properties/${propertyId}`}
                className='hover:underline'
              >
                {name}
              </Link>
            </h3>
            <Rating rating={rating} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Comment comment={comment} />
      </CardContent>
      {/* TODO: add delete button */}
      <div className='absolute top-3 right-3'>{children}</div>
    </Card>
  )
}
export default ReviewCard
