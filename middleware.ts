export function middleware(req: Request) {
  return Response.json({ message: 'hello' })
}

export const config = {
  matcher: '/about',
}
