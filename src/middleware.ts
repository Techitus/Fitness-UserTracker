import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/auth/signin' || path === '/auth/signup'
  const token =  request.cookies.get('token')?.value || ''
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }else{
    // return NextResponse.redirect(new URL('/auth/signin', request.url))

  }
}
 
export const config = {
  matcher: [
    '/',
    '/auth/signup',
    '/auth/signin',
    '/users/',
    '/attendence/'
,
    '/setting/'
  ]
}