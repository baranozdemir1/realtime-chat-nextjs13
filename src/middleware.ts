import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

async function middleware(req: NextRequest): Promise<NextResponse | void> {
  const pathname = req.nextUrl.pathname

  const isAuth = await getToken({ req })
  const isLoginPage = pathname.startsWith('/login')

  const sensitiveRoutes = ['/dashboard']
  const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isLoginPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  }

  if (!isAuth && isAccessingSensitiveRoute) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
}

export default middleware

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
}
