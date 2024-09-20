'use client'

import { calculateTotals } from '@/utils/calculateTotal'
import { formatCurrency } from '@/utils/format'
import { usePropertyState } from '@/utils/store'
import { Card, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

const FormRow = ({ label, amount }: { label: string; amount: number }) => {
  return (
    <p className='flex justify-between text-sm mb-2'>
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  )
}

const BookingForm = () => {
  const range = usePropertyState((state) => state.range)
  const price = usePropertyState((state) => state.price)

  const checkIn = range?.from as Date
  const checkOut = range?.to as Date

  const { totalNights, subTotal, fees, tax, total } = calculateTotals({
    checkIn,
    checkOut,
    price,
  })

  return (
    <Card className='p-8 mb-4'>
      <CardTitle className='mb-8'>Summary</CardTitle>

      <FormRow label={`$${price} x ${totalNights} nights`} amount={subTotal} />
      <FormRow label='Cleaning Fee' amount={fees.cleaning} />
      <FormRow label='Service Fee' amount={fees.service} />
      <FormRow label='Tax' amount={tax} />

      <Separator className='mt-4' />

      <CardTitle className='mt-8'>
        <FormRow label='Booking Total' amount={total} />
      </CardTitle>
    </Card>
  )
}
export default BookingForm
