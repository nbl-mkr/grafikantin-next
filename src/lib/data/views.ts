import "server-only";
import { getDashboardContext } from "@/lib/data/context";
import { fetchStands, fetchMenus, fetchMenuCategories } from "@/lib/data/queries";
import { buildStandRevenue } from "@/lib/data/aggregate";
import { createClient } from "@/lib/supabase/server";
import type { MenuCategoryRow } from "@/lib/data/types";

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
  kategori: string;
  kategoriEn: string;
  kategoriId: number;
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

export async function getMenusView(): Promise<{
  menus: MenuView[];
  stands: { id: number; nama: string }[];
  categories: MenuCategoryRow[];
  canManageCategories: boolean;
}> {
  const ctx = await getDashboardContext();
  if (!ctx) return { menus: [], stands: [], categories: [], canManageCategories: false };

  // Scoping akses data — sama seperti fetchOrders/fetchChartOrders.
  // Admin melihat semua; penjual hanya standnya sendiri. Penjual yang belum
  // terhubung ke stand tidak boleh melihat menu/stand mana pun, karena
  // fetchMenus(null) berarti "tanpa filter" (yaitu semua stand).
  const isAdmin = ctx.role === "admin";
  const scopedStandId = isAdmin ? null : ctx.standId;
  if (!isAdmin && scopedStandId === null) {
    return { menus: [], stands: [], categories: [], canManageCategories: false };
  }

  const [menus, soldByMenu, stands, categories] = await Promise.all([
    fetchMenus(scopedStandId),
    fetchSoldMenuCounts(),
    fetchStands(),
    fetchMenuCategories(),
  ]);

  const visibleStands =
    scopedStandId === null ? stands : stands.filter((s) => s.id === scopedStandId);

  return {
    menus: menus.map((m) => {
      const category = m.kategori_detail;
      if (!category || category.id !== m.kategori_id) {
        throw new Error(`Menu ${m.id} tidak memiliki relasi kategori yang valid`);
      }

      return {
        id: m.id,
        nama: m.nama,
        stand: m.stand?.nama_stand ?? "-",
        standId: m.stand_id,
        kategori: category.nama_id,
        kategoriEn: category.nama_en,
        kategoriId: category.id,
        harga: Number(m.harga),
        stok: m.stok,
        terjual: soldByMenu.get(m.id) ?? 0,
        tersedia: m.tersedia,
        gambar: m.gambar,
      };
    }),
    stands: visibleStands.map((s) => ({ id: s.id, nama: s.nama_stand })),
    categories,
    canManageCategories: ctx.role === "admin",
  };
}

async function fetchOrdersForRevenue(): Promise<{ id_stand: number; total_harga: number }[]> {
  const supabase = await createClient();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const { data, error } = await supabase
    .from("orders")
    .select("id_stand, total_harga")
    .neq("status", "Dibatalkan")
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
    .neq("status", "Dibatalkan")
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