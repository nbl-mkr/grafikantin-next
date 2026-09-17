"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getDashboardContext } from "@/lib/data/context";

export interface StandInput {
  id?: number;
  nama: string;
  pemilik: string;
  telepon: string;
  status: "Buka" | "Tutup";
}

export interface ActionResult {
  ok: boolean;
  error?: string;
  errorKey?: string;
}

export async function upsertStandAction(input: StandInput): Promise<ActionResult> {
  const ctx = await getDashboardContext();
  if (!ctx || ctx.role !== "admin") return { ok: false, errorKey: "notAllowed" };
  if (!input.nama.trim() || !input.pemilik.trim()) return { ok: false, errorKey: "nameOwnerRequired" };

  const supabase = await createClient();
  const payload = {
    nama_stand: input.nama.trim(),
    pemilik: input.pemilik.trim(),
    telepon: input.telepon.trim() || null,
    status: input.status,
  };

  const { error } = input.id
    ? await supabase.from("stands").update(payload).eq("id", input.id)
    : await supabase.from("stands").insert(payload);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/[locale]/dashboard/stand", "page");
  revalidatePath("/[locale]/dashboard", "page");
  revalidatePath("/[locale]/dashboard/menu", "page");
  return { ok: true };
}

export async function deleteStandAction(id: number): Promise<ActionResult> {
  const ctx = await getDashboardContext();
  if (!ctx || ctx.role !== "admin") return { ok: false, errorKey: "notAllowed" };

  const supabase = await createClient();
  const { error } = await supabase.from("stands").delete().eq("id", id);
  if (error) {
    if (error.code === "23503") return { ok: false, errorKey: "standHasOrders" };
    return { ok: false, error: error.message };
  }

  revalidatePath("/[locale]/dashboard/stand", "page");
  revalidatePath("/[locale]/dashboard", "page");
  return { ok: true };
}

export interface MenuInput {
  id?: number;
  nama: string;
  standId: number;
  kategori: "Makanan" | "Minuman" | "Snack";
  harga: number;
  stok: number;
  tersedia: boolean;
  gambar?: File | null;
}

async function uploadMenuImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File
): Promise<string | null> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(ext) ? ext : "jpg";
  const path = `menus/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  const buffer = await file.arrayBuffer();
  const { error } = await supabase.storage.from("menu-images").upload(path, buffer, {
    contentType: file.type || `image/${safeExt === "jpg" ? "jpeg" : safeExt}`,
    upsert: true,
  });
  if (error) return null;
  return supabase.storage.from("menu-images").getPublicUrl(path).data.publicUrl;
}

export async function upsertMenuAction(input: MenuInput): Promise<ActionResult> {
  const ctx = await getDashboardContext();
  if (!ctx || (ctx.role !== "admin" && ctx.role !== "penjual")) return { ok: false, errorKey: "notAllowed" };
  if (ctx.role === "penjual" && (!ctx.standId || ctx.standId !== input.standId)) return { ok: false, errorKey: "notYourStand" };
  if (!input.nama.trim()) return { ok: false, errorKey: "menuNameRequired" };
  if (!input.standId) return { ok: false, errorKey: "chooseStand" };

  const supabase = await createClient();
  const payload: Record<string, unknown> = {
    nama: input.nama.trim(),
    stand_id: input.standId,
    kategori: input.kategori,
    harga: Math.max(0, Math.round(Number(input.harga) || 0)),
    stok: Math.max(0, Math.round(Number(input.stok) || 0)),
    tersedia: input.tersedia,
  };

  if (input.gambar) {
    const url = await uploadMenuImage(supabase, input.gambar);
    if (url) payload.gambar = url;
  }

  const { error } = input.id
    ? await supabase.from("menus").update(payload).eq("id", input.id)
    : await supabase.from("menus").insert(payload);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/[locale]/dashboard/menu", "page");
  revalidatePath("/[locale]/dashboard", "page");
  return { ok: true };
}

export async function deleteMenuAction(id: number): Promise<ActionResult> {
  const ctx = await getDashboardContext();
  if (!ctx || (ctx.role !== "admin" && ctx.role !== "penjual")) return { ok: false, errorKey: "notAllowed" };

  const supabase = await createClient();
  const { error } = await supabase.from("menus").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/[locale]/dashboard/menu", "page");
  revalidatePath("/[locale]/dashboard", "page");
  return { ok: true };
}

export async function toggleMenuTersediaAction(id: number): Promise<ActionResult> {
  const ctx = await getDashboardContext();
  if (!ctx || (ctx.role !== "admin" && ctx.role !== "penjual")) return { ok: false, errorKey: "notAllowed" };

  const supabase = await createClient();
  const { data, error } = await supabase.from("menus").select("tersedia").eq("id", id).single();
  if (error) return { ok: false, error: error.message };

  const { error: err2 } = await supabase.from("menus").update({ tersedia: !(data as { tersedia: boolean }).tersedia }).eq("id", id);
  if (err2) return { ok: false, error: err2.message };

  revalidatePath("/[locale]/dashboard/menu", "page");
  return { ok: true };
}
