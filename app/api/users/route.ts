import { fetchUsers, saveUser } from '@/utils/actions.utils'
import { NextRequest, NextResponse } from 'next/server'

// NextRequest and NextResponse wrap around the FetchAPI/WebAPI with more functionality

type PostData = {
  firstName: string
  lastName: string
}

type User = PostData & {
  id: string
}

export const GET = async (req: NextRequest) => {
  const { url } = req
  const id = req.nextUrl.searchParams.get('id')

  const users = await fetchUsers()

  return Response.json({ users })
}

export const POST = async (req: Request) => {
  const postData: PostData = await req.json()

  const user: User = { ...postData, id: Date.now().toString() }

  await saveUser(user)

  return Response.json({ message: 'user created', user })
}
