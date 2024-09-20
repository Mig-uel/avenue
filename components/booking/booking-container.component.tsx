'use client'
import { usePropertyState } from '@/utils/store'
import ConfirmBooking from './confirm-booking.component'
import BookingForm from './booking-form.component'

const BookingContainer = () => {
  const state = usePropertyState((state) => state)

  console.log(state)

  return (
    <div className='w-full'>
      <BookingForm />
      <ConfirmBooking />
    </div>
  )
}
export default BookingContainer
