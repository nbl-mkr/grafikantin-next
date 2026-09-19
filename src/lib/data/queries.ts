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
  const pageSize = 1000;
  const orders: OrderRow[] = [];

  for (let offset = 0; offset < (opts.limit ?? Number.POSITIVE_INFINITY); offset += pageSize) {
    const pageEnd = opts.limit
      ? Math.min(offset + pageSize - 1, opts.limit - 1)
      : offset + pageSize - 1;
    let query = supabase
      .from("orders")
      .select(ORDER_SELECT)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(offset, pageEnd);

    if (opts.since) query = query.gte("created_at", opts.since.toISOString());
    if (ctx.role === "penjual" && ctx.standId) query = query.eq("id_stand", ctx.standId);

    const { data, error } = await query;
    if (error) throw new Error(`Gagal memuat pesanan: ${error.message}`);

    const page = (data ?? []) as unknown as OrderRow[];
    orders.push(...page);
    if (page.length < pageSize || (opts.limit && orders.length >= opts.limit)) break;
  }

  return orders;
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

export interface InvoiceData {
  orderId: string;
  date: string;
  paymentMethod: string;
  items: { id: number; nama_menu: string; harga: number; quantity: number }[];
  total: number;
}

export async function fetchInvoice(
  kode: string,
  userId: string,
  locale = "id"
): Promise<InvoiceData | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("kode_transaksi, total_harga, metode_pembayaran, jumlah, created_at, menu:menus!orders_id_menu_fkey ( id, nama, harga )")
    .eq("kode_transaksi", kode)
    .eq("id_user", userId)
    .order("id", { ascending: true });
  if (error || !data || data.length === 0) return null;

  const rows = data as unknown as {
    kode_transaksi: string;
    total_harga: number;
    metode_pembayaran: string | null;
    jumlah: number;
    created_at: string;
    menu: { id: number; nama: string; harga: number } | null;
  }[];

  const created = new Date(rows[0].created_at);
  const date =
    created.toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }) +
    ", " +
    created.toLocaleTimeString(locale === "en" ? "en-US" : "id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }) +
    " WIB";

  return {
    orderId: rows[0].kode_transaksi,
    date,
    paymentMethod: rows[0].metode_pembayaran ?? "QRIS / E-Wallet",
    items: rows.map((r) => ({
      id: r.menu?.id ?? 0,
      nama_menu: r.menu?.nama ?? "-",
      harga: Number(r.menu?.harga ?? 0),
      quantity: r.jumlah,
    })),
    total: rows.reduce((sum, r) => sum + Number(r.total_harga), 0),
  };
}
