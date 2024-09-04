import { fetchUsers } from '@/utils/actions.utils'

export const GET = async (req: Request) => {
  const { url } = req
  const { searchParams } = new URL(url)
  const searchParamsObject = Object.fromEntries(searchParams)

  const users = await fetchUsers()

  return Response.json({ users })
}
