import { formatDate } from '@/utils/format'
import db from '../../db'
import { getAuthUser } from '@/utils/functions.utils'
import { redirect } from 'next/navigation'

/**
 * FETCH APP STATS
 * @returns
 */
export const fetchStats = async () => {
  const admin = await getAuthUser()

  if (!admin.privateMetadata.isAdmin) return redirect('/')

  const usersCount = await db.profile.count()
  const propertiesCount = await db.property.count()
  const bookingsCount = await db.booking.count()

  return {
    usersCount,
    propertiesCount,
    bookingsCount,
  }
}

export const fetchChartsData = async () => {
  const admin = await getAuthUser()

  if (!admin.privateMetadata.isAdmin) return redirect('/')

  const date = new Date()
  date.setMonth(date.getMonth() - 6)

  const sixMonthsAgo = date

  const bookings = await db.booking.findMany({
    where: {
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  let bookingsPerMonth = bookings.reduce((acc, curr) => {
    const date = formatDate(curr.createdAt, true)
    const existingEntry = acc.find((entry) => entry.date === date)

    if (existingEntry) existingEntry.count += 1
    else acc.push({ date, count: 1 })

    return acc
  }, [] as Array<{ date: string; count: number }>)

  return bookingsPerMonth
}
