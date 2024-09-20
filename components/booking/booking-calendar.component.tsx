'use client'

import { useEffect, useState } from 'react'
import { defaultSelected } from '@/utils/calendar'
import type { DateRange } from 'react-day-picker'
import { Calendar } from '../ui/calendar'
import { usePropertyState } from '@/utils/store'

const BookingCalendar = () => {
  const currentDate = new Date()
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)

  useEffect(() => {
    usePropertyState.setState({ range })
  }, [range])

  return (
    <Calendar
      mode='range'
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className='mb-4'
    />
  )
}
export default BookingCalendar
