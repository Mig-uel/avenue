import { Suspense } from 'react'
import CategoriesList from '@/components/home/categories-list.component'
import PropertiesContainer from '@/components/home/properties-container.component'
import LoadingCards from '@/components/card/loading-cards.component'

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
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          category={searchParams.category}
          search={searchParams.search}
        />
      </Suspense>
    </section>
  )
}

export default HomePage
