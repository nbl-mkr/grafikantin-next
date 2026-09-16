import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { canAccessPath, DASHBOARD_LANDING, type Role } from '@/lib/roles'
import { routing } from '@/i18n/routing'

const LOCALE_COOKIE = 'NEXT_LOCALE'

function isValidLocale(value: unknown): value is (typeof routing.locales)[number] {
  return typeof value === 'string' && (routing.locales as readonly string[]).includes(value)
}

function localeFromPathname(pathname: string) {
  const [, segment] = pathname.split('/')
  if (!isValidLocale(segment)) return undefined
  return {
    locale: segment,
    rest: pathname.slice(segment.length + 1) || '/',
  } as const
}

function resolveLocale(request: NextRequest, pathLocale?: string) {
  if (isValidLocale(pathLocale)) return pathLocale

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (isValidLocale(cookieLocale)) return cookieLocale

  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    for (const part of acceptLanguage.split(',')) {
      const code = part.split(';')[0].trim().slice(0, 2).toLowerCase()
      if (isValidLocale(code)) return code
    }
  }

  return routing.defaultLocale
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- i18n: bare "/" redirects to the locale-prefixed home ---
  if (pathname === '/') {
    const locale = resolveLocale(request)
    const redirectUrl = new URL(`/${locale}`, request.nextUrl.origin)
    const res = NextResponse.redirect(redirectUrl)
    res.cookies.set(LOCALE_COOKIE, locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
    return res
  }

  // --- i18n: keep the NEXT_LOCALE cookie in sync on /id & /en pages ---
  const pathLocale = localeFromPathname(pathname)
  if (pathLocale) {
    const localeRes = NextResponse.next({ request })
    localeRes.cookies.set(LOCALE_COOKIE, pathLocale.locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
    return localeRes
  }

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
    '/',
    '/id',
    '/id/:path*',
    '/en',
    '/en/:path*',
  ],
}
