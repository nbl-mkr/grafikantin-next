import { createClient } from "@/lib/supabase/server";
import type { DashboardContext } from "@/lib/data/types";
import type { OrderRow, StandRow, MenuRow } from "@/lib/data/types";

const ORDER_SELECT = `
  id, kode_transaksi, total_harga, metode_pembayaran, status, jumlah, created_at,
  user:users!orders_id_user_fkey ( username ),
  stand:stands!orders_id_stand_fkey ( id, nama_stand ),
  menu:menus!orders_id_menu_fkey ( id, nama, kategori, harga, gambar, stand:stands!menus_stand_id_fkey ( id, nama_stand ) )
`;

export async function fetchOrders(
  ctx: DashboardContext,
  opts: { limit?: number; since?: Date } = {}
): Promise<OrderRow[]> {
  const supabase = await createClient();
  let query = supabase.from("orders").select(ORDER_SELECT).order("created_at", { ascending: false });

  if (opts.limit) query = query.limit(opts.limit);
  if (opts.since) query = query.gte("created_at", opts.since.toISOString());
  if (ctx.role === "penjual" && ctx.standId) query = query.eq("id_stand", ctx.standId);

  const { data, error } = await query;
  if (error) throw new Error(`Gagal memuat pesanan: ${error.message}`);
  return (data ?? []) as unknown as OrderRow[];
}

export async function fetchStands(): Promise<StandRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stands")
    .select("id, nama_stand, nomor_stand, pemilik, telepon, status, id_penjual, menus(count)")
    .order("id");
  if (error) throw new Error(`Gagal memuat stand: ${error.message}`);
  return (data ?? []) as unknown as StandRow[];
}

export async function fetchMenus(standId?: number | null): Promise<MenuRow[]> {
  const supabase = await createClient();
  let query = supabase
    .from("menus")
    .select("id, nama, kategori, harga, stok, tersedia, estimasi, deskripsi, rating, gambar, stand_id, stand:stands!menus_stand_id_fkey ( id, nama_stand )")
    .order("id", { ascending: true });
  if (standId) query = query.eq("stand_id", standId);

  const { data, error } = await query;
  if (error) throw new Error(`Gagal memuat menu: ${error.message}`);
  return (data ?? []) as unknown as MenuRow[];
}
