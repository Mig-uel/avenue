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
  deleteRentalAction,
  fetchRentals,
} from '@/utils/actions/rentals/actions'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'

const DeleteRentalButton = ({ propertyId }: { propertyId: string }) => {
  const deleteRental = deleteRentalAction.bind(null, { propertyId })

  return (
    <FormContainer action={deleteRental}>
      <ActionButton buttonAction='delete' />
    </FormContainer>
  )
}

const RentalsPage = async () => {
  const rentals = await fetchRentals()

  if (!rentals.length)
    return (
      <>
        <Title text='Your Rentals' />
        <EmptyList
          heading="Desert silence... let's stir up some action!"
          message="Don't hesitate to create a rental"
          buttonText='Create Rental'
          href='/rentals/create'
        />
      </>
    )

  return (
    <>
      <Title text='Your Rentals' />

      <div className='mt-4'>
        <h4 className='mb-4 capitalize'>Active Properties: {rentals.length}</h4>

        <Table>
          <TableCaption>
            A list of all your active rental properties
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Nightly Rate</TableHead>
              <TableHead>Nights Booked</TableHead>
              <TableHead>Total Income</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals.map((rental, index) => {
              const {
                id: propertyId,
                name,
                price,
                totalNightsSum,
                orderTotalSum,
              } = rental

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
                  <TableCell>{formatCurrency(price)}</TableCell>
                  <TableCell>{totalNightsSum || 0}</TableCell>
                  <TableCell>{formatCurrency(orderTotalSum)}</TableCell>
                  <TableCell className='flex items-center gap-x-2'>
                    <Link href={`/rentals/${propertyId}/edit`}>
                      <ActionButton buttonAction='edit' />
                    </Link>
                    <DeleteRentalButton propertyId={propertyId} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default RentalsPage
