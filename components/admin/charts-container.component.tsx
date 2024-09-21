import { fetchChartsData } from '@/utils/actions/admin/actions'
import Chart from './chart.component'

const ChartsContainer = async () => {
  const bookings = await fetchChartsData()

  if (bookings.length < 1) return null

  return <Chart data={bookings} />
}
export default ChartsContainer
