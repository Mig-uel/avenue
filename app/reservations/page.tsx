import CountryName from '@/components/card/country-name.component'
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
import { fetchReservations } from '@/utils/actions/reservations/actions'
import { findCountryByCode } from '@/utils/countries'
import { formatCurrency, formatDate } from '@/utils/format'
import Link from 'next/link'

const ReservationsPage = async () => {
  const reservations = await fetchReservations()

  if (!reservations.length)
    return (
      <>
        <Title text='Your Rental Reservations' />
        <EmptyList
          buttonText='Create Rental'
          heading='Sand, just sand up ahead...'
          message='Start renting out your properties today'
        />
      </>
    )

  return (
    <div>
      <Title text='Your Rental Reservations' />

      <h4 className='mb-4 capitalize'>
        Total Reservations: {reservations.length}
      </h4>

      <Table>
        <TableCaption>
          A list of your recent rental reservations made by others
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reservations.map((item, index) => {
            const {
              id,
              totalNights,
              checkIn,
              checkOut,
              orderTotal,
              property: { id: propertyId, country, name },
            } = item

            const startDate = formatDate(checkIn)
            const endDate = formatDate(checkOut)

            return (
              <TableRow key={index}>
                <TableCell>
                  <Link
                    href={`/properties/${propertyId}`}
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
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
export default ReservationsPage
