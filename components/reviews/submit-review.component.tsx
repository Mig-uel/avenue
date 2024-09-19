'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import FormContainer from '../form/form-container.component'
import { createReviewAction } from '@/utils/actions/reviews/action'
import RatingInput from '../form/rating-input.component'
import TextAreaInput from '../form/text-area.component'
import SubmitButton from '../form/buttons.component'

const placeholder = `Please share more about your experience! Consider reviewing the following aspects:
  - Cleanliness of the property
  - Comfort and quality of furnishings
  - Location and accessibility
  - Communication with the host
  - Overall value for money
Your insights help future renters!  
`

const SubmitReview = ({ propertyId }: { propertyId: string }) => {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)

  return (
    <div className='mt-8'>
      <Button onClick={() => setIsReviewFormOpen((prev) => !prev)}>
        Leave a Review
      </Button>

      {isReviewFormOpen && (
        <Card className='p-8 mt-8'>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='propertyId' value={propertyId} />

            <RatingInput name='rating' />
            <TextAreaInput
              rows={7}
              name='comment'
              label='How was your experience?'
              placeholder={placeholder}
            />
            <SubmitButton text='Submit' className='mt-4' />
          </FormContainer>
        </Card>
      )}
    </div>
  )
}
export default SubmitReview
