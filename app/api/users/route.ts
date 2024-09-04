import { fetchUsers } from '@/utils/actions.utils'
import { NextRequest, NextResponse } from 'next/server'

// NextRequest and NextResponse wrap around the FetchAPI/WebAPI

export const GET = async (req: NextRequest) => {
  const { url } = req
  const id = req.nextUrl.searchParams.get('id')

  const users = await fetchUsers()

  return NextResponse.redirect(new URL('/', url))
}
