import FavoriteButton from '@/components/card/favorite-button.component'
import Breadcrumbs from '@/components/properties/breadcrumbs.component'
import { fetchPropertyDetails } from '@/utils/actions/property/action'
import { redirect } from 'next/navigation'

const PropertyDetailsPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const property = await fetchPropertyDetails(id)

  if (!property) redirect('/')

  const { name, baths, bedrooms, beds, guests, tagline } = property
  const details = { baths, bedrooms, beds, guests }

  return (
    <section>
      <Breadcrumbs name={name} />

      <header className='flex justify-between items-center mt-4'>
        <h1 className='text-4xl font-bold capitalize'>{tagline}</h1>

        <div className='flex items-center gap-x-4'>
          {/* TODO: share button */}
          <FavoriteButton propertyId={property.id} />
        </div>
      </header>
    </section>
  )
}
export default PropertyDetailsPage
