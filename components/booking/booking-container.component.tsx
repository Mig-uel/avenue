'use client'
import { usePropertyState } from '@/utils/store'
import ConfirmBooking from './confirm-booking.component'
import BookingForm from './booking-form.component'

const BookingContainer = () => {
  const range = usePropertyState((state) => state.range)

  if (!range || !range.from || !range.to) return null

  if (range.to.getTime() === range.from.getTime()) return null

  return (
    <div className='w-full'>
      <BookingForm />
      <ConfirmBooking />
    </div>
  )
}
export default BookingContainer
