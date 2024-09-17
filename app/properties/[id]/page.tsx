import { fetchPropertyDetails } from '@/utils/actions/property/action'
import { redirect } from 'next/navigation'

const PropertyDetailsPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const property = await fetchPropertyDetails(id)

  if (!property) redirect('/')

  const { baths, bedrooms, beds, guests } = property
  const details = { baths, bedrooms, beds, guests }

  return <div>PropertyDetailsPage</div>
}
export default PropertyDetailsPage
