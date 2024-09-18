import { formatQuantity } from '@/utils/format'

type PropertyDetails = {
  bedrooms: number
  baths: number
  guests: number
  beds: number
}

const PropertyDetails = ({
  bedrooms,
  baths,
  guests,
  beds,
}: PropertyDetails) => {
  return (
    <p className='text-md font-light'>
      <span>{formatQuantity(bedrooms, 'bedroom')} &middot;</span>
      <span>{formatQuantity(baths, 'bath')} &middot;</span>
      <span>{formatQuantity(guests, 'guest')} &middot;</span>
      <span>{formatQuantity(beds, 'bed')}</span>
    </p>
  )
}
export default PropertyDetails
