import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client dengan hak akses tinggi (service role / secret key).
 *
 * HANYA untuk dipakai di server — terutama webhook Midtrans, yang berjalan
 * tanpa sesi user sehingga tidak bisa memakai RLS.
 *
 * PENTING:
 * - Variabel env WAJIB bernama SUPABASE_SERVICE_ROLE_KEY (tanpa prefix
 *   NEXT_PUBLIC_), supaya Next.js tidak pernah mengirimnya ke browser.
 * - Jangan pernah mengimpor file ini dari komponen "use client".
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secret) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_URL belum diisi di .env.local"
    );
  }

  return createSupabaseClient(url, secret, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
