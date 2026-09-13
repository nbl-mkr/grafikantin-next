import "server-only";
import { getDashboardContext } from "@/lib/data/context";
import { fetchOrders, fetchStands, fetchMenus } from "@/lib/data/queries";
import { buildStandRevenue } from "@/lib/data/aggregate";

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
  kategori: "Makanan" | "Minuman" | "Snack";
  harga: number;
  stok: number;
  terjual: number;
  tersedia: boolean;
  gambar: string | null;
}

export async function getStandsView(): Promise<StandView[]> {
  const [stands, orders] = await Promise.all([fetchStands(), fetchOrdersSafe()]);
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

  const [menus, orders, stands] = await Promise.all([
    fetchMenus(ctx.role === "penjual" ? ctx.standId : null),
    fetchOrdersSafe(),
    fetchStands(),
  ]);

  const soldByMenu = new Map<number, number>();
  for (const o of orders) {
    if (o.status === "Dibatalkan" || !o.menu) continue;
    soldByMenu.set(o.menu.id, (soldByMenu.get(o.menu.id) ?? 0) + o.jumlah);
  }

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

async function fetchOrdersSafe() {
  const ctx = await getDashboardContext();
  if (!ctx) return [];
  try {
    return await fetchOrders(ctx);
  } catch {
    return [];
  }
}
