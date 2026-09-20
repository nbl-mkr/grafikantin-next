import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { routing } from '@/i18n/routing'

const LOCALE_COOKIE = 'NEXT_LOCALE'

const PUBLIC_ROUTE_SEGMENTS = [
  'order',
  'about',
  'menu',
  'product',
  'shopping',
  'history',
  'checkout',
  'invoice',
  'auth',
  'kritik-saran',
  'dashboard',
]

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

  return routing.defaultLocale
}

function withLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })
  return response
}

function isPublicLocalePath(pathname: string) {
  if (pathname === '/') return true
  const first = pathname.split('/')[1]
  return typeof first === 'string' && PUBLIC_ROUTE_SEGMENTS.includes(first)
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const pathLocale = localeFromPathname(pathname)

  if (!pathLocale && isPublicLocalePath(pathname)) {
    const locale = resolveLocale(request)
    const target =
      pathname === '/' ? `/${locale}` : `/${locale}${pathname === '/' ? '' : pathname}${search}`
    const redirectUrl = new URL(target, request.nextUrl.origin)
    return withLocaleCookie(NextResponse.redirect(redirectUrl), locale)
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return pathLocale
      ? withLocaleCookie(supabaseResponse, pathLocale.locale)
      : supabaseResponse
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

  const activeLocale = pathLocale?.locale ?? resolveLocale(request)

  const rest = pathLocale?.rest ?? pathname
  const isDashboard = rest === '/dashboard' || rest.startsWith('/dashboard/')

  if (isDashboard && !user) {
    return NextResponse.redirect(
      new URL(`/${activeLocale}/auth/login`, request.nextUrl.origin)
    )
  }

  if (pathLocale) {
    return withLocaleCookie(supabaseResponse, pathLocale.locale)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|webmanifest)$).*)',
  ],
}