import { fetchProperties } from '@/utils/actions/home/action'
import type { PropertyCardProps } from '@/utils/types'
import EmptyList from './empty-list.component'
import PropertiesList from './properties-list.component'

const PropertiesContainer = async ({
  category,
  search,
}: {
  category?: string
  search?: string
}) => {
  const properties: PropertyCardProps[] = await fetchProperties({
    category,
    search,
  })

  return (
    <>
      {properties.length ? (
        <PropertiesList properties={properties} />
      ) : (
        <EmptyList
          heading='No results'
          message='Try changing or removing some of your filters'
          buttonText='Clear filters'
        />
      )}
    </>
  )
}
export default PropertiesContainer
