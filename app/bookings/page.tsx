import CountryName from '@/components/card/country-name.component'
import { ActionButton } from '@/components/form/buttons.component'
import FormContainer from '@/components/form/form-container.component'
import EmptyList from '@/components/home/empty-list.component'
import Title from '@/components/properties/title.component'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  deleteBookingAction,
  fetchBookings,
} from '@/utils/actions/bookings/actions'
import { formatCurrency, formatDate } from '@/utils/format'

import Link from 'next/link'

const DeleteBooking = ({ bookingId }: { bookingId: string }) => {
  const deleteBooking = deleteBookingAction.bind(null, { bookingId })

  return (
    <FormContainer action={deleteBooking}>
      <ActionButton buttonAction='delete' />
    </FormContainer>
  )
}

const BookingsPage = async () => {
  const bookings = await fetchBookings()

  if (!bookings.length)
    return (
      <>
        <Title text='Your Bookings' />
        <EmptyList heading='Just tumbleweeds here. Let’s track down what you’re after!' />
      </>
    )

  return (
    <div className=''>
      <Title text='Your Bookings' />
      <h4 className='mb-4 capitalize'>Total Bookings: {bookings.length}</h4>

      <Table>
        <TableCaption>A list of your recent bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking, index) => {
            const { id, orderTotal, totalNights, checkIn, checkOut } = booking
            const {
              property: { id: propertyId, name, country },
            } = booking

            const startDate = formatDate(checkIn)
            const endDate = formatDate(checkOut)

            return (
              <TableRow key={index}>
                <TableCell>
                  <Link
                    href={`/properties/${propertyId}}`}
                    className='underline text-muted-foreground tracking-wide'
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>
                  <CountryName countryCode={country} />
                </TableCell>
                <TableCell>{totalNights}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{startDate}</TableCell>
                <TableCell>{endDate}</TableCell>
                <TableCell>
                  <DeleteBooking bookingId={id} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default BookingsPage
