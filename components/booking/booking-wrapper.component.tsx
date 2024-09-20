'use client'

import { useEffect } from 'react'
import { usePropertyState } from '@/utils/store' // state
import BookingCalendar from './booking-calendar.component'
import BookingContainer from './booking-container.component'
import type { Booking } from '@/utils/types'

type BookingWrapper = {
  propertyId: string
  price: number
  bookings: Booking[]
}

const BookingWrapper = ({ propertyId, price, bookings }: BookingWrapper) => {
  // setting property state from server
  useEffect(() => {
    usePropertyState.setState({
      price,
      propertyId,
      bookings,
    })
  }, [])

  return (
    <>
      <BookingCalendar />
      <BookingContainer />
    </>
  )
}
export default BookingWrapper
