import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { MenuRow } from "@/lib/data/types";

export interface PublicMenuItem {
  id: number;
  nama_menu: string;
  harga: number;
  gambar: string;
  estimasi: string;
  rating: string;
  kategori: "Makanan" | "Minuman" | "Snack";
  deskripsi?: string;
  stand_id: number;
}

export interface PublicStand {
  id: number;
  nama_stand: string;
  deskripsi: string;
  status: string;
  jumlah_menu: number;
  gambar?: string;
}

export interface PublicCatalog {
  items: PublicMenuItem[];
  stands: PublicStand[];
  popular: PublicMenuItem[];
}

const DEFAULT_GAMBAR = "/assets/food.jpg";

function toPublicItem(m: MenuRow): PublicMenuItem {
  return {
    id: m.id,
    nama_menu: m.nama,
    harga: Number(m.harga),
    gambar: m.gambar || DEFAULT_GAMBAR,
    estimasi: m.estimasi ? `${m.estimasi} Mnt` : "10-15 Mnt",
    rating: m.rating ? `${Number(m.rating).toFixed(1)} / 5.0` : "-",
    kategori: m.kategori,
    deskripsi: m.deskripsi ?? undefined,
    stand_id: m.stand_id,
  };
}

export async function fetchPublicCatalog(): Promise<PublicCatalog> {
  const supabase = await createClient();

  const [menusRes, standsRes] = await Promise.all([
    supabase
      .from("menus")
      .select("id, nama, kategori, harga, stok, tersedia, estimasi, deskripsi, rating, gambar, stand_id, stand:stands!menus_stand_id_fkey ( id, nama_stand )")
      .eq("tersedia", true)
      .order("id"),
    supabase
      .from("stands")
      .select("id, nama_stand, nomor_stand, status, menus(count)")
      .order("id"),
  ]);

  if (menusRes.error) throw new Error(`Gagal memuat menu: ${menusRes.error.message}`);

  const items = ((menusRes.data ?? []) as unknown as MenuRow[]).map(toPublicItem);

  const stands = ((standsRes.data ?? []) as unknown as {
    id: number;
    nama_stand: string;
    nomor_stand: string | null;
    status: string;
    menus?: { count: number }[];
  }[]).map((s) => ({
    id: s.id,
    nama_stand: s.nama_stand,
    deskripsi: "Menyediakan berbagai menu pilihan bagi siswa.",
    status: s.status,
    jumlah_menu: s.menus?.[0]?.count ?? 0,
  }));

  const popular = [...items]
    .sort(
      (a, b) =>
        (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0) ||
        a.harga - b.harga
    )
    .slice(0, 3);

  return { items, stands, popular };
}
