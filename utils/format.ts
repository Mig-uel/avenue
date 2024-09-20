/**
 *  Locale number to currency formatter
 * @param amount
 * @returns
 */
export const formatCurrency = (amount: number | null) => {
  const value = amount || 0

  return new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatQuantity = (qty: number, noun: string) =>
  qty === 1 ? `${qty} ${noun}` : `${qty} ${noun}s`

/**
 * Date formatter for /bookings route
 * @param date
 * @returns
 */
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
