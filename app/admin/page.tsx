import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const AdminPage = async () => {
  const user = await currentUser()

  if (!user?.privateMetadata?.isAdmin) redirect('/')

  return <div>AdminPage</div>
}
export default AdminPage
