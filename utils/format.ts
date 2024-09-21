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

/**
 * Format singular or plural sentence
 * @param qty
 * @param noun
 * @returns
 */
export const formatQuantity = (qty: number, noun: string) =>
  qty === 1 ? `${qty} ${noun}` : `${qty} ${noun}s`

/**
 * Date formatter for /bookings route
 * @param date
 * @returns
 */
export const formatDate = (date: Date, onlyMonth?: boolean) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  }

  if (!onlyMonth) {
    options.day = 'numeric'
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}
