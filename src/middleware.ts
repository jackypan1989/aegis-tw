import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  return NextResponse.rewrite(new URL('/community', req.url))
}

export const config = {
  matcher: '/',
}