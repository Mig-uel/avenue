import CategoriesList from '@/components/home/categories-list.component'
import PropertiesContainer from '@/components/home/properties-container.component'

const HomePage = ({
  searchParams,
}: {
  searchParams: { category?: string; search?: string }
}) => {
  return (
    <section>
      <CategoriesList
        category={searchParams.category}
        search={searchParams.search}
      />
      <PropertiesContainer
        category={searchParams.category}
        search={searchParams.search}
      />
    </section>
  )
}

export default HomePage
