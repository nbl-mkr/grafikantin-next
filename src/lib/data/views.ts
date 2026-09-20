import "server-only";
import { getDashboardContext } from "@/lib/data/context";
import { fetchStands, fetchMenus } from "@/lib/data/queries";
import { buildStandRevenue } from "@/lib/data/aggregate";
import { createClient } from "@/lib/supabase/server";

export interface StandView {
  id: number;
  nama: string;
  pemilik: string;
  telepon: string;
  status: "Buka" | "Tutup";
  totalMenu: number;
  pendapatan: number;
}

export interface MenuView {
  id: number;
  nama: string;
  stand: string;
  standId: number;
  kategori: "Makanan" | "Snack";
  harga: number;
  stok: number;
  terjual: number;
  tersedia: boolean;
  gambar: string | null;
}

export async function getStandsView(): Promise<StandView[]> {
  const [stands, orders] = await Promise.all([
    fetchStands(),
    fetchOrdersForRevenue(),
  ]);
  const revenue = buildStandRevenue(orders);
  return stands.map((s) => ({
    id: s.id,
    nama: s.nama_stand,
    pemilik: s.pemilik ?? "-",
    telepon: s.telepon ?? "-",
    status: s.status,
    totalMenu: s.menus?.[0]?.count ?? 0,
    pendapatan: revenue.get(s.id) ?? 0,
  }));
}

export async function getMenusView(): Promise<{ menus: MenuView[]; stands: { id: number; nama: string }[] }> {
  const ctx = await getDashboardContext();
  if (!ctx) return { menus: [], stands: [] };

  const [menus, soldByMenu, stands] = await Promise.all([
    fetchMenus(ctx.role === "penjual" ? ctx.standId : null),
    fetchSoldMenuCounts(),
    fetchStands(),
  ]);

  return {
    menus: menus.map((m) => ({
      id: m.id,
      nama: m.nama,
      stand: m.stand?.nama_stand ?? "-",
      standId: m.stand_id,
      kategori: m.kategori,
      harga: Number(m.harga),
      stok: m.stok,
      terjual: soldByMenu.get(m.id) ?? 0,
      tersedia: m.tersedia,
      gambar: m.gambar,
    })),
    stands: stands.map((s) => ({ id: s.id, nama: s.nama_stand })),
  };
}

async function fetchOrdersForRevenue(): Promise<{ id_stand: number; total_harga: number }[]> {
  const supabase = await createClient();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const { data, error } = await supabase
    .from("orders")
    .select("id_stand, total_harga")
    .eq("status", "!=\"Dibatalkan\"")
    .gte("created_at", twelveMonthsAgo.toISOString());

  if (error) {
    console.error("Gagal memuat data pendapatan:", error.message);
    return [];
  }

  return (data ?? []) as unknown as { id_stand: number; total_harga: number }[];
}

async function fetchSoldMenuCounts(): Promise<Map<number, number>> {
  const supabase = await createClient();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const { data, error } = await supabase
    .from("orders")
    .select("id_menu, jumlah")
    .eq("status", "!=\"Dibatalkan\"")
    .gte("created_at", twelveMonthsAgo.toISOString());

  if (error) {
    console.error("Gagal memuat data terjual:", error.message);
    return new Map();
  }

  const map = new Map<number, number>();
  for (const row of data ?? []) {
    if (!row.id_menu) continue;
    const menuId = Number(row.id_menu);
    map.set(menuId, (map.get(menuId) ?? 0) + Number(row.jumlah));
  }

  return map;
}