import { Card, CardHeader } from '../ui/card'

const StatsCard = ({
  title,
  value,
}: {
  title: string
  value: number | string
}) => {
  return (
    <Card className='bg-muted'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <h3 className='font-bold text-3xl capitalize'>{title}</h3>
        <span className='text-primary text-5xl font-extrabold'>{value}</span>
      </CardHeader>
    </Card>
  )
}
export default StatsCard
