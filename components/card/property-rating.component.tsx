import { fetchPropertyRating } from '@/utils/actions/reviews/action'
import { FaStar } from 'react-icons/fa'

async function PropertyRating({
  propertyId,
  inPage,
}: {
  propertyId: string
  inPage: boolean
}) {
  const { rating, count } = await fetchPropertyRating(propertyId)

  if (!count) return null
  
  const className = `flex gap-1 items-center ${inPage ? 'text-md' : 'text-sm'}`
  const numOfRatingsText = count > 1 ? 'reviews' : 'review'
  const ratingPreview = `(${count}) ${inPage ? numOfRatingsText : ''}`

  return (
    <span className={className}>
      <FaStar className='w-3 h-3' />
      {rating} {ratingPreview}
    </span>
  )
}
export default PropertyRating
