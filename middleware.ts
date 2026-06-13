import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow login page
  if (pathname === '/admin') {
    return NextResponse.next()
  }

  // Protect dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    const token = req.cookies.get('adminToken')?.value

    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}