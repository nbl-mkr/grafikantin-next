"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/session";

export interface ProfileInput {
  username: string;
  email: string;
  fotoFile?: File | null;
}

async function uploadProfilePhoto(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  file: File
): Promise<string | null> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(ext) ? ext : "jpg";
  const path = `${userId}/profile.${safeExt}`;

  const buffer = await file.arrayBuffer();
  const { error } = await supabase.storage.from("menu-images").upload(path, buffer, {
    contentType: file.type || `image/${safeExt === "jpg" ? "jpeg" : safeExt}`,
    upsert: true,
  });
  if (error) return null;
  return supabase.storage.from("menu-images").getPublicUrl(path).data.publicUrl;
}

export async function updateProfileAction(
  input: ProfileInput
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Sesi tidak ditemukan" };

  const username = input.username.trim();
  const email = input.email.trim();
  if (!username) return { ok: false, error: "Nama wajib diisi" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Format email tidak valid" };
  }

  let foto = null;
  if (input.fotoFile) {
    const uploaded = await uploadProfilePhoto(supabase, user.id, input.fotoFile);
    if (!uploaded) return { ok: false, error: "Gagal mengunggah foto" };
    foto = uploaded;
  }

  const payload: Partial<Pick<Profile, "username" | "email" | "foto">> = { username, email };
  if (foto !== null) payload.foto = foto;

  const { error } = await supabase.from("users").update(payload).eq("id", user.id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/dashboard", "layout");
  revalidatePath("/dashboard/setting");
  revalidatePath("/", "layout");
  return { ok: true };
}
