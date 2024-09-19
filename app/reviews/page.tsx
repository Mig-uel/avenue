import {
  deleteReviewAction,
  fetchPropertyReviewsByUser,
} from '@/utils/actions/reviews/action'
import { ActionButton } from '@/components/form/buttons.component'
import EmptyList from '@/components/home/empty-list.component'
import Title from '@/components/properties/title.component'
import ReviewCard from '@/components/reviews/review-card.components'
import FormContainer from '@/components/form/form-container.component'

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId })

  return (
    <FormContainer action={deleteReview}>
      <ActionButton buttonAction='delete' />
    </FormContainer>
  )
}

const ReviewsPage = async () => {
  const reviews = await fetchPropertyReviewsByUser()

  if (!reviews.length)
    return (
      <EmptyList heading='Nothing but sand and silence... better retrace your steps.' />
    )

  return (
    <>
      <Title text='Your Reviews' />

        <section className='grid md:grid-cols-2 gap-8 mt-4'>
          {reviews.map((review, index) => {
            const reviewInfo = {
              name: review.property.name,
              comment: review.comment,
              rating: review.rating,
              image: review.property.image,
              propertyId: review.property.id,
            }

            return (
              <ReviewCard key={index} {...reviewInfo}>
                <DeleteReview reviewId={review.id} />
              </ReviewCard>
            )
          })}
        </section>
    </>
  )
}

export default ReviewsPage
