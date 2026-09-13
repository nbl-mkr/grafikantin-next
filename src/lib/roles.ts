export type Role = 'siswa' | 'penjual' | 'admin'

export const ALL_ROLES: Role[] = ['admin', 'penjual', 'siswa']

export const DASHBOARD_LANDING: Record<Role, string> = {
  admin: '/dashboard',
  penjual: '/dashboard/menu',
  siswa: '/dashboard/setting',
}

export interface RouteRule {
  pattern: RegExp
  roles: Role[]
}

export const DASHBOARD_ROUTE_RULES: RouteRule[] = [
  { pattern: /^\/dashboard$/, roles: ['admin'] },
  { pattern: /^\/dashboard\/order(\/|$)/, roles: ['admin'] },
  { pattern: /^\/dashboard\/stand(\/|$)/, roles: ['admin'] },
  { pattern: /^\/dashboard\/menu(\/|$)/, roles: ['admin', 'penjual'] },
  { pattern: /^\/dashboard\/report(\/|$)/, roles: ['admin', 'penjual'] },
  { pattern: /^\/dashboard\/setting(\/|$)/, roles: ALL_ROLES },
]

export function canAccessPath(role: Role, pathname: string): boolean {
  if (!pathname.startsWith('/dashboard')) return true
  const rule = DASHBOARD_ROUTE_RULES.find((r) => r.pattern.test(pathname))
  if (!rule) return true
  return rule.roles.includes(role)
}
