import { create } from 'zustand'
import type { DateRange } from 'react-day-picker'
import type { Booking } from './types'

// state shape
type PropertyState = {
  propertyId: string
  price: number
  bookings: Booking[]
  range: DateRange | undefined
}

// init store
export const usePropertyState = create<PropertyState>(() => {
  return {
    propertyId: '',
    price: 0,
    bookings: [],
    range: undefined,
  }
})
