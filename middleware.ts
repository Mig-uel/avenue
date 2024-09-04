import { NextResponse } from 'next/server'

export function middleware(req: Request) {
  const { url } = req

  console.log('middleware')

  return NextResponse.redirect(new URL('/', url))
}

export const config = {
  matcher: ['/about/:path*', '/tours/:path*'],
}
