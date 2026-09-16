"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface CheckoutItemInput {
  menuId: number;
  quantity: number;
}

interface MenuRecord {
  id: number;
  nama: string;
  harga: number;
  stok: number;
  tersedia: boolean;
  stand_id: number;
}

export async function createOrderAction(
  items: CheckoutItemInput[]
): Promise<{ ok: boolean; error?: string; kode?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Silakan login terlebih dahulu untuk menyelesaikan pembayaran." };
  }

  const quantityByMenu = new Map<number, number>();
  for (const item of items) {
    const menuId = Math.round(Number(item.menuId));
    const quantity = Math.round(Number(item.quantity));
    if (!Number.isInteger(menuId) || menuId <= 0) continue;
    if (!Number.isInteger(quantity) || quantity <= 0) continue;
    quantityByMenu.set(menuId, (quantityByMenu.get(menuId) ?? 0) + quantity);
  }
  if (quantityByMenu.size === 0) {
    return { ok: false, error: "Tidak ada item yang valid untuk dipesan." };
  }

  const { data: menus, error: menuErr } = await supabase
    .from("menus")
    .select("id, nama, harga, stok, tersedia, stand_id")
    .in("id", [...quantityByMenu.keys()]);
  if (menuErr) return { ok: false, error: menuErr.message };

  const menuMap = new Map<number, MenuRecord>((menus ?? []).map((m) => [m.id, m as MenuRecord]));

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const kode = `#KG-${dateStr}${randomSuffix}`;

  const rows: {
    kode_transaksi: string;
    id_user: string;
    id_stand: number;
    id_menu: number;
    jumlah: number;
    total_harga: number;
    metode_pembayaran: string;
    status: string;
  }[] = [];

  for (const [menuId, quantity] of quantityByMenu) {
    const menu = menuMap.get(menuId);
    if (!menu) return { ok: false, error: "Salah satu menu tidak ditemukan." };
    if (!menu.tersedia) return { ok: false, error: `"${menu.nama}" sedang tidak tersedia.` };
    if (menu.stok < quantity) {
      return {
        ok: false,
        error: menu.stok > 0
          ? `Stok "${menu.nama}" tinggal ${menu.stok}, kurangi jumlah pesananmu.`
          : `Stok "${menu.nama}" sedang habis.`,
      };
    }

    rows.push({
      kode_transaksi: kode,
      id_user: user.id,
      id_stand: menu.stand_id,
      id_menu: menu.id,
      jumlah: quantity,
      total_harga: Math.round(Number(menu.harga)) * quantity,
      metode_pembayaran: "QRIS / E-Wallet",
      status: "Menunggu",
    });
  }

  const { error: insertErr } = await supabase.from("orders").insert(rows);
  if (insertErr) return { ok: false, error: insertErr.message };

  for (const [menuId, quantity] of quantityByMenu) {
    const menu = menuMap.get(menuId);
    if (!menu) continue;
    const sisa = Math.max(0, menu.stok - quantity);
    const { error: stockErr } = await supabase
      .from("menus")
      .update({ stok: sisa, tersedia: sisa > 0 })
      .eq("id", menuId);
    if (stockErr) console.error(`Gagal update stok menu ${menuId}:`, stockErr.message);
  }

  revalidatePath("/", "layout");
  revalidatePath("/shopping");
  revalidatePath("/dashboard", "layout");

  return { ok: true, kode };
}
