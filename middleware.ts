export function middleware(req: Request) {
  const { url } = req
  console.log(url)
}

export const config = {
  matcher: ['/about/:path*', '/tours/:path*'],
}
