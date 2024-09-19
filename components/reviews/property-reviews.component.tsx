import { fetchPropertyReviews } from '@/utils/actions/reviews/action'
import Title from '../properties/title.component'
import ReviewCard from './review-card.components'

const PropertyReviews = async ({ propertyId }: { propertyId: string }) => {
  const reviews = await fetchPropertyReviews(propertyId)

  if (!reviews.length) return null

  return (
    <div className='mt-8'>
      <Title text='Reviews' />

      <div className='grid md:grid-cols-2 gap-8 mt-4'>
        {reviews.map((review, index) => {
          const {
            comment,
            rating,
            profile: { firstName: name, profileImage: image },
          } = review

          const reviewInfo = { comment, rating, name, image }

          return <ReviewCard key={index} {...reviewInfo} isUser />
        })}
      </div>
    </div>
  )
}
export default PropertyReviews
