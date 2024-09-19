import EmptyList from '@/components/home/empty-list.component'
import PropertiesList from '@/components/home/properties-list.component'
import Title from '@/components/properties/title.component'
import { fetchFavorites } from '@/utils/actions/favorites/action'

const FavoritesPage = async () => {
  const favorites = await fetchFavorites()

  return (
    <>
      <Title text='Your Favorites' />

      {favorites.length ? (
        <PropertiesList properties={favorites} />
      ) : (
        <EmptyList />
      )}
    </>
  )
}

export default FavoritesPage
