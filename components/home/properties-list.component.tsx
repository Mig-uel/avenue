import PropertyCard from '../card/property-card.component'
import type { PropertyCardProps } from '@/utils/types'

const PropertiesList = ({
  properties,
}: {
  properties: PropertyCardProps[]
}) => {
  return (
    <section className='mt-4 gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {properties.map((property, index) => (
        <PropertyCard key={index} {...property} />
      ))}
    </section>
  )
}
export default PropertiesList
