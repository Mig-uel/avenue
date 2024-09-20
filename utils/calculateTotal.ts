'use client'

import { calculateDaysBetween } from './calendar'

type BookingDetails = {
  checkIn: Date
  checkOut: Date
  price: number
}

type Fees = {
  cleaning: number
  service: number
}

/**
 * CALCULATE SELECTED CALENDAR TOTAL PRICE
 * @param param0
 */
export const calculateTotals = ({
  checkIn,
  checkOut,
  price,
}: BookingDetails) => {
  // calculate num of days using helper function
  const totalNights = calculateDaysBetween({ checkIn, checkOut })

  // calculate subtotal
  const subTotal = totalNights * price

  const fees: Fees = {
    cleaning: 21,
    service: 40,
  }

  const taxRate = 0.1
  const tax = subTotal * taxRate

  const total = Object.values(fees).reduce((acc, curr) => acc + curr, 0) + tax

  return {
    totalNights,
    subTotal,
    total,
    fees,
    tax,
  }
}
