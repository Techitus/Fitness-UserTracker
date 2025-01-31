/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    try {
        jwt.verify(token, process.env.TOKEN_SECRET!)
        return NextResponse.next()
    } catch (error) {
        const response = NextResponse.redirect(new URL('/auth/signin', request.url))
        response.cookies.delete('token')
        return response
    }
}

export const config = {
    matcher: ['/users/:path*', '/attendance/:path*', '/setting/:path*']
}