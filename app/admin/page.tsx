import ChartsContainer from '@/components/admin/charts-container.component'
import {
  ChartsLoadingContainer,
  StatsLoadingContainer,
} from '@/components/admin/loading.component'
import StatsContainer from '@/components/admin/stats-container.component'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const AdminPage = async () => {
  const user = await currentUser()

  if (!user?.privateMetadata?.isAdmin) redirect('/')

  return (
    <>
      <Suspense fallback={<StatsLoadingContainer />}>
        <StatsContainer />
      </Suspense>
      <Suspense fallback={<ChartsLoadingContainer />}>
        <ChartsContainer />
      </Suspense>
    </>
  )
}
export default AdminPage
