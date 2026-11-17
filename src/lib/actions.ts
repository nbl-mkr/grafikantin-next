'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { routing } from '@/i18n/routing'

async function currentLocale() {
  const store = await cookies()
  const value = store.get('NEXT_LOCALE')?.value
  return (routing.locales as readonly string[]).includes(value ?? '')
    ? (value as (typeof routing.locales)[number])
    : routing.defaultLocale
}

export async function login(formData: FormData): Promise<{ ok: boolean; error?: string; redirectTo?: string }> {
  const locale = await currentLocale()
  const supabase = await createClient()

  const email = (formData.get('email') as string)?.trim()
  const password = (formData.get('password') as string)?.trim()

  if (!email || !password) {
    return { ok: false, error: 'Email dan password wajib diisi' }
  }

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !authData.user) {
    return { ok: false, error: 'Email atau password salah' }
  }

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', authData.user.id)
    .single()

  if (userData?.role && authData.user.user_metadata?.role !== userData.role) {
    await supabase.auth.updateUser({
      data: { role: userData.role },
    })
  }

  revalidatePath('/', 'layout')

  const target =
    userData?.role === 'penjual' || userData?.role === 'admin'
      ? `/${locale}/dashboard`
      : `/${locale}`

  return { ok: true, redirectTo: target }
}

export async function logout() {
  const locale = await currentLocale()
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect(`/${locale}/auth/login`)
}