import PropertyCard from '../card/property-card.component'
import type { PropertyCardProps } from '@/utils/types'

const PropertiesList = ({
  properties,
}: {
  properties: PropertyCardProps[]
}) => {
  return (
    <section>
      {properties.map((property, index) => (
        <PropertyCard key={index} {...property} />
      ))}
    </section>
  )
}
export default PropertiesList
