import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { canAccessPath, DASHBOARD_LANDING, type Role } from '@/lib/roles'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return supabaseResponse
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')

  if (isDashboard && !user) {
    const redirectUrl = new URL('/auth/login', request.nextUrl.origin)
    return NextResponse.redirect(redirectUrl)
  }

  if (isDashboard && user) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = (profile?.role ?? null) as Role | null

    if (!role) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    if (!canAccessPath(role, request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(DASHBOARD_LANDING[role], request.nextUrl.origin))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/dashboard',
  ],
}
