import { createClient } from '@/lib/supabase/server'
import type { Role } from '@/lib/roles'

export type { Role }

export interface Profile {
  id: string
  username: string
  email: string
  role: Role
  foto: string | null
  bio: string | null
}

export const DEFAULT_FOTO = '/assets/photo_profile.jpg'

export function fotoUrl(foto: string | null | undefined): string {
  return foto && foto.length > 0 ? foto : DEFAULT_FOTO
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('users')
    .select('id, username, email, role, foto, bio')
    .eq('id', user.id)
    .single()

  if (error || !data) return null

  return data as Profile
}
