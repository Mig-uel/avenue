import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { calculateDaysBetween } from './calendar'

/**
 * GET USER DATA FROM CLERK
 * @returns
 */
export const getAuthUser = async () => {
  const user = await currentUser()

  if (!user) throw new Error('You must be logged in to access this route')

  if (!user.privateMetadata.hasProfile) return redirect('/profile/create')

  return user
}

/**
 * RETURN ERROR MESSAGE
 * @param error
 * @returns
 */
export const errorMessage = (error: unknown): { message: string } => {
  console.log(error)

  return {
    message: error instanceof Error ? error.message : 'Something went wrong...',
  }
}

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
  }
}
