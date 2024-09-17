import EmptyList from '@/components/home/empty-list.component'
import PropertiesList from '@/components/home/properties-list.component'
import { fetchFavorites } from '@/utils/actions/favorites/action'

const FavoritesPage = async () => {
  const favorites = await fetchFavorites()

  return (
    <>
      {favorites.length ? (
        <PropertiesList properties={favorites} />
      ) : (
        <EmptyList />
      )}
    </>
  )
}

export default FavoritesPage
