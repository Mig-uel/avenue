import { fetchReservationStats } from '@/utils/actions/reservations/actions'
import Title from '../properties/title.component'
import StatsCard from '../admin/stats-card.component'
import { formatCurrency } from '@/utils/format'

const ReservationStats = async () => {
  const stats = await fetchReservationStats()

  return (
    <div className='mt-8 mb-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
      <StatsCard title='properties' value={stats.properties} />
      <StatsCard title='nights' value={stats.nights} />
      <StatsCard
        title='total amount'
        value={formatCurrency(stats.totalAmount)}
      />
    </div>
  )
}
export default ReservationStats
