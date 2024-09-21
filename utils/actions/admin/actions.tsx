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

  const adminId = admin.id

  const usersCount = await db.profile.count()
  const propertiesCount = await db.property.count()
  const bookingsCount = await db.booking.count()

  return {
    usersCount,
    propertiesCount,
    bookingsCount,
  }
}
