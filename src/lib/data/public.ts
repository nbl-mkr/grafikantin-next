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
  kategori: "Makanan" | "Snack";
  deskripsi?: string;
  stand_id: number;
  stand_nama?: string;
  tersedia: boolean;
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

export function resolveMenuImage(gambar?: string | null, kategori?: string | null): string {
  if (gambar && gambar.trim() !== "") {
    return gambar.startsWith("/") || gambar.startsWith("http") ? gambar : `/assets/${gambar}`;
  }
  return kategori?.toLowerCase() === "snack"
    ? "/assets/snack-icon.png"
    : "/assets/food-icon.png";
}

function toPublicItem(m: MenuRow): PublicMenuItem {
  return {
    id: m.id,
    nama_menu: m.nama,
    harga: Number(m.harga),
    gambar: resolveMenuImage(m.gambar, m.kategori),
    estimasi: m.estimasi ? `${m.estimasi} Mnt` : "10-15 Mnt",
    rating: m.rating ? `${Number(m.rating).toFixed(1)} / 5.0` : "-",
    kategori: m.kategori,
    deskripsi: m.deskripsi ?? undefined,
    stand_id: m.stand_id,
    stand_nama: m.stand?.nama_stand ?? undefined,
    tersedia: m.tersedia,
  };
}

export async function fetchPublicCatalog(): Promise<PublicCatalog> {
  const supabase = await createClient();

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [menusRes, standsRes, ordersRes] = await Promise.all([
    supabase
      .from("menus")
      .select("id, nama, kategori, harga, stok, tersedia, estimasi, deskripsi, rating, gambar, stand_id, stand:stands!menus_stand_id_fkey ( id, nama_stand )")
      .eq("tersedia", true)
      .order("id"),
    supabase
      .from("stands")
      .select("id, nama_stand, nomor_stand, status, menus(count)")
      .order("id"),
    supabase
      .from("orders")
      .select("id_menu, jumlah, status, created_at")
      .gte("created_at", oneWeekAgo.toISOString())
      .neq("status", "Dibatalkan"),
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

  const salesMap = new Map<number, number>();
  if (ordersRes.data) {
    for (const order of ordersRes.data as { id_menu?: number; jumlah?: number }[]) {
      if (order.id_menu) {
        const current = salesMap.get(order.id_menu) ?? 0;
        salesMap.set(order.id_menu, current + (order.jumlah || 1));
      }
    }
  }

  const popular = [...items]
    .sort((a, b) => {
      const salesA = salesMap.get(a.id) ?? 0;
      const salesB = salesMap.get(b.id) ?? 0;
      if (salesB !== salesA) return salesB - salesA;
      return a.id - b.id;
    })
    .slice(0, 3);

  return { items, stands, popular };
}
