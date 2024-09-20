'use client'

import { useEffect, useState } from 'react'
import {
  defaultSelected,
  generateBlockedPeriods,
  generateDateRange,
  generateDisabledDates,
} from '@/utils/calendar'
import type { DateRange } from 'react-day-picker'
import { Calendar } from '../ui/calendar'
import { usePropertyState } from '@/utils/store'
import { useToast } from '@/hooks/use-toast'

const BookingCalendar = () => {
  const { toast } = useToast()
  const currentDate = new Date()
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)

  const bookings = usePropertyState((state) => state.bookings)

  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  })

  const unavailableDates = generateDisabledDates(blockedPeriods)

  useEffect(() => {
    const selectedRange = generateDateRange(range)

    selectedRange.some((date) => {
      if (unavailableDates[date]) {
        setRange(defaultSelected)
        toast({
          description: 'Selected days are unavailable. Please select again.',
        })
        return true
      }
      return false
    })

    usePropertyState.setState({ range })
  }, [range])

  return (
    <Calendar
      mode='range'
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className='mb-4'
      disabled={blockedPeriods}
    />
  )
}
export default BookingCalendar
