import { FaStar } from 'react-icons/fa'

function PropertyRating({
  propertyId,
  inPage,
}: {
  propertyId: string
  inPage: boolean
}) {
  const rating = 4.7
  const numOfRatings = 100

  const className = `flex gap-1 items-center ${inPage ? 'text-md' : 'text-sm'}`
  const numOfRatingsText = numOfRatings > 1 ? 'reviews' : 'review'
  const ratingPreview = `(${numOfRatings}) ${inPage ? numOfRatingsText : ''}`

  return (
    <span className={className}>
      <FaStar className='w-3 h-3' />
      {rating} {ratingPreview}
    </span>
  )
}
export default PropertyRating
