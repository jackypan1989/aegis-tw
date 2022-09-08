import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { user } = await getUser(req)
  const { pathname } = req.nextUrl

  if (user && pathname === '/auth/signIn') {
    return NextResponse.redirect(new URL(`/community`, req.url))
  }
  return NextResponse.next()
}

async function getUser(req: NextRequest): Promise<any> {
  const token = req.cookies.get("sb-access-token")
  if (!token) {
    return {
      user: null,
      data: null,
      error: "There is no supabase token in request cookies",
    }
  }
  const authRequestResult = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    },
  })

  const result = await authRequestResult.json()
  if (authRequestResult.status != 200) {
    return {
      user: null,
      data: null,
      error: `Supabase auth returned ${authRequestResult.status}. See logs for details`,
    }
  } else if (result.aud === "authenticated") {
    return {
      user: result,
      data: result,
      error: null,
    }
  }
}
