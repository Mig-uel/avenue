import FavoriteButton from '@/components/card/favorite-button.component'
import PropertyRating from '@/components/card/property-rating.component'
import BookingCalendar from '@/components/properties/booking-calendar.component'
import Breadcrumbs from '@/components/properties/breadcrumbs.component'
import ImageContainer from '@/components/properties/image-container.component'
import ShareButton from '@/components/properties/share-button.component'
import { fetchPropertyDetails } from '@/utils/actions/property/action'
import { redirect } from 'next/navigation'

const PropertyDetailsPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const property = await fetchPropertyDetails(id)

  if (!property) redirect('/')

  const { name, baths, bedrooms, beds, guests, tagline, image } = property
  const details = { baths, bedrooms, beds, guests }

  return (
    <section>
      <Breadcrumbs name={name} />

      <header className='flex justify-between items-center mt-4'>
        <h1 className='text-4xl font-bold capitalize'>{tagline}</h1>

        <div className='flex items-center gap-x-4'>
          <ShareButton propertyId={property.id} name={name} />
          <FavoriteButton propertyId={property.id} />
        </div>
      </header>

      <ImageContainer src={image} alt={name} />

      <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
        <div className='lg:col-span-8'>
          '
          <div className='flex gap-x-4 items-center'>
            <h1 className='text-xl font-bold'>{property.name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
        </div>

        <div className='lg:col-span-4 flex flex-col items-center'>
          <BookingCalendar />
        </div>
      </section>
    </section>
  )
}
export default PropertyDetailsPage
