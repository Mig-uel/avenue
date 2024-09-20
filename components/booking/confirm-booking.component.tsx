'use client'

import { usePropertyState } from '@/utils/store'
import { SignInButton, useAuth } from '@clerk/nextjs'
import { Button } from '../ui/button'
import FormContainer from '../form/form-container.component'
import SubmitButton from '../form/buttons.component'
import { createBookingAction } from '@/utils/actions/bookings/actions'

const ConfirmBooking = () => {
  const { userId } = useAuth()

  const range = usePropertyState((state) => state.range)
  const propertyId = usePropertyState((state) => state.propertyId)

  const checkIn = range?.from as Date
  const checkOut = range?.to as Date

  if (!userId)
    return (
      <SignInButton mode='modal'>
        <Button type='button' className='w-full'>
          Sign In To Complete Booking
        </Button>
      </SignInButton>
    )

  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  })

  return (
    <section>
      <FormContainer action={createBooking}>
        <SubmitButton text='Reserve' className='w-full' />
      </FormContainer>
    </section>
  )
}
export default ConfirmBooking
