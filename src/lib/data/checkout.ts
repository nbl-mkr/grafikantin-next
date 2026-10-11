"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createSnapTransaction, getTransactionStatus } from "@/lib/midtrans";

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

/** Satu baris item yang disimpan di kolom payments.items (jsonb). */
interface PaymentItem {
  menuId: number;
  nama: string;
  harga: number;
  quantity: number;
  stand_id: number;
}

/**
 * Langkah 1 dari alur pembayaran: validasi keranjang, simpan sesi pembayaran
 * ke tabel `payments`, lalu minta token Snap ke Midtrans.
 *
 * Order ASLI belum dibuat di sini — baru dibuat oleh webhook setelah pembayaran
 * terkonfirmasi (lihat finalizePaidOrder). Dengan begitu tidak ada order
 * "hantu" dari pengguna yang menutup popup tanpa membayar.
 */
export async function createPaymentAction(
  items: CheckoutItemInput[]
): Promise<{ ok: boolean; error?: string; token?: string; kode?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Silakan login terlebih dahulu untuk menyelesaikan pembayaran." };
  }

  // Normalisasi & gabungkan item yang sama.
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

  const paymentItems: PaymentItem[] = [];
  let grossAmount = 0;

  for (const [menuId, quantity] of quantityByMenu) {
    const menu = menuMap.get(menuId);
    if (!menu) return { ok: false, error: "Salah satu menu tidak ditemukan." };
    if (!menu.tersedia) return { ok: false, error: `"${menu.nama}" sedang tidak tersedia.` };
    if (menu.stok < quantity) {
      return {
        ok: false,
        error:
          menu.stok > 0
            ? `Stok "${menu.nama}" tinggal ${menu.stok}, kurangi jumlah pesananmu.`
            : `Stok "${menu.nama}" sedang habis.`,
      };
    }

    const harga = Math.round(Number(menu.harga));
    grossAmount += harga * quantity;
    paymentItems.push({
      menuId: menu.id,
      nama: menu.nama,
      harga,
      quantity,
      stand_id: menu.stand_id,
    });
  }

  if (grossAmount <= 0) {
    return { ok: false, error: "Total pembayaran tidak valid." };
  }

  // Kode yang dilihat pengguna, dan order_id untuk Midtrans (tanpa "#").
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const kode = `#KG-${dateStr}${randomSuffix}`;
  const orderId = `KG-${dateStr}${randomSuffix}`;

  // Minta token Snap. Dilakukan SEBELUM insert agar tidak menyimpan sesi
  // pembayaran yang tidak punya token.
  let token: string;
  try {
    const snap = await createSnapTransaction({
      orderId,
      grossAmount,
      items: paymentItems.map((item) => ({
        id: String(item.menuId),
        name: item.nama,
        price: item.harga,
        quantity: item.quantity,
      })),
      customerName: user.email?.split("@")[0] ?? null,
      customerEmail: user.email ?? null,
    });
    token = snap.token;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gagal menghubungi Midtrans.";
    return { ok: false, error: `Gagal membuat transaksi pembayaran: ${message}` };
  }

  const { error: insertErr } = await supabase.from("payments").insert({
    order_id: orderId,
    kode_transaksi: kode,
    id_user: user.id,
    gross_amount: grossAmount,
    status: "pending",
    snap_token: token,
    items: paymentItems,
  });

  if (insertErr) return { ok: false, error: insertErr.message };

  return { ok: true, token, kode };
}

/**
 * Jaring pengaman: cek status pembayaran LANGSUNG ke Midtrans, lalu buat order
 * kalau ternyata sudah lunas.
 *
 * Kenapa perlu: notifikasi webhook bisa telat, gagal terkirim, atau terlewat
 * (mis. Notification URL belum di-set saat pembayaran terjadi). Tanpa fungsi
 * ini, pembeli yang sudah membayar tetap tidak mendapat pesanannya dan harus
 * bayar ulang. Dipanggil oleh tombol "Cek Status Pembayaran" di halaman invoice.
 *
 * Aman dipanggil berkali-kali: finalizePaidOrder() sudah idempoten.
 */
export async function syncPaymentStatusAction(
  kodeTransaksi: string
): Promise<{ ok: boolean; status?: string; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Silakan login terlebih dahulu." };

  // Ambil sesi pembayaran milik user ini (jangan biarkan melihat milik orang lain).
  const { data: payment, error: payErr } = await supabase
    .from("payments")
    .select("order_id, kode_transaksi, id_user, status")
    .eq("kode_transaksi", kodeTransaksi)
    .eq("id_user", user.id)
    .maybeSingle();

  if (payErr) return { ok: false, error: payErr.message };
  if (!payment) return { ok: false, error: "Sesi pembayaran tidak ditemukan." };

  // Sudah lunas? Tidak perlu tanya Midtrans lagi.
  if (payment.status === "settlement") return { ok: true, status: "settlement" };

  // Tanya langsung ke Midtrans.
  let tx: Awaited<ReturnType<typeof getTransactionStatus>>;
  try {
    tx = await getTransactionStatus(payment.order_id);
  } catch {
    // Transaksi tidak ditemukan di Midtrans (mis. order_id tidak dikenal).
    return { ok: false, status: payment.status, error: "Transaksi tidak ditemukan di Midtrans." };
  }

  const txStatus = String(tx.transaction_status ?? "");
  const fraud = String(tx.fraud_status ?? "");
  const isPaid = txStatus === "settlement" || (txStatus === "capture" && fraud === "accept");

  if (!isPaid) {
    // Simpan status terbaru (pending/expire/cancel/deny) supaya halaman invoice
    // bisa menampilkan kondisi yang benar tanpa menunggu webhook.
    if (["expire", "cancel", "deny", "failure"].includes(txStatus)) {
      await supabase
        .from("payments")
        .update({ status: txStatus, updated_at: new Date().toISOString() })
        .eq("order_id", payment.order_id);
    }
    return { ok: true, status: txStatus || payment.status };
  }

  // Midtrans bilang LUNAS -> buat order (idempoten).
  const result = await finalizePaidOrder({
    kodeTransaksi: payment.kode_transaksi,
    idUser: user.id,
    metodePembayaran: tx.payment_type ? tx.payment_type.toUpperCase() : "QRIS / E-Wallet",
  });

  if (!result.ok) return { ok: false, error: result.error };

  await supabase
    .from("payments")
    .update({
      status: "settlement",
      payment_type: tx.payment_type ?? null,
      midtrans_transaction_id: tx.transaction_id ?? null,
      paid_at: tx.settlement_time ? new Date(tx.settlement_time).toISOString() : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("order_id", payment.order_id);

  revalidatePath("/[locale]/dashboard", "layout");
  return { ok: true, status: "settlement" };
}

/**
 * Langkah 2: dipanggil oleh webhook Midtrans setelah pembayaran terkonfirmasi.
 *
 * Membuat baris di tabel `orders` dan memotong stok.
 *
 * IDEMPOTEN: kalau order dengan kode_transaksi ini sudah ada, fungsi langsung
 * keluar tanpa memotong stok lagi. Ini penting karena Midtrans dapat mengirim
 * notifikasi yang sama berkali-kali.
 */
export async function finalizePaidOrder(input: {
  kodeTransaksi: string;
  idUser: string;
  metodePembayaran: string;
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = createAdminClient();

  // Guard idempotency: sudah pernah diproses?
  const { data: existing, error: existErr } = await supabase
    .from("orders")
    .select("id")
    .eq("kode_transaksi", input.kodeTransaksi)
    .limit(1);

  if (existErr) return { ok: false, error: existErr.message };
  if (existing && existing.length > 0) {
    return { ok: true };
  }

  // Ambil snapshot keranjang dari sesi pembayaran.
  const { data: payment, error: payErr } = await supabase
    .from("payments")
    .select("items")
    .eq("kode_transaksi", input.kodeTransaksi)
    .maybeSingle();

  if (payErr) return { ok: false, error: payErr.message };
  if (!payment) return { ok: false, error: "Sesi pembayaran tidak ditemukan." };

  const items = (payment.items ?? []) as PaymentItem[];
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: "Data keranjang kosong." };
  }

  // Validasi ulang stok — stok bisa berubah antara saat checkout dan saat bayar.
  const menuIds = items.map((i) => i.menuId);
  const { data: menus, error: menuErr } = await supabase
    .from("menus")
    .select("id, nama, stok")
    .in("id", menuIds);

  if (menuErr) return { ok: false, error: menuErr.message };

  const stokMap = new Map<number, number>(
    (menus ?? []).map((m) => [Number(m.id), Number(m.stok)])
  );

  for (const item of items) {
    const stok = stokMap.get(item.menuId);
    if (stok === undefined) {
      return { ok: false, error: `Menu "${item.nama}" sudah tidak ada.` };
    }
    if (stok < item.quantity) {
      // Pembayaran sudah masuk tetapi stok habis — order tetap dibuat
      // (uang sudah dibayar) dan dicatat di log untuk ditindaklanjuti manual.
      console.error(
        `[checkout] stok tidak cukup setelah pembayaran: menu ${item.menuId} "${item.nama}", stok=${stok}, diminta=${item.quantity}`
      );
    }
  }

  const rows = items.map((item) => ({
    kode_transaksi: input.kodeTransaksi,
    id_user: input.idUser,
    id_stand: item.stand_id,
    id_menu: item.menuId,
    jumlah: item.quantity,
    total_harga: item.harga * item.quantity,
    metode_pembayaran: input.metodePembayaran,
    status: "Menunggu",
  }));

  const { error: insertErr } = await supabase.from("orders").insert(rows);

  if (insertErr) {
    // 23505 = duplikat kode_transaksi. Bisa terjadi kalau webhook dobel datang
    // hampir bersamaan. Verifikasi dulu: kalau order-nya memang sudah ada,
    // berarti ini benar-benar duplikat dan aman dianggap selesai. Kalau TIDAK
    // ada, berarti kegagalan nyata — jangan ditelan, supaya pembayaran tidak
    // ditandai lunas padahal ordernya tidak pernah dibuat.
    if (insertErr.code === "23505") {
      const { data: check } = await supabase
        .from("orders")
        .select("id")
        .eq("kode_transaksi", input.kodeTransaksi)
        .limit(1);

      if (check && check.length > 0) return { ok: true };
      return { ok: false, error: `Gagal membuat order (duplikat): ${insertErr.message}` };
    }
    return { ok: false, error: insertErr.message };
  }

  // Potong stok.
  for (const item of items) {
    const stok = stokMap.get(item.menuId);
    if (stok === undefined) continue;
    const sisa = Math.max(0, stok - item.quantity);
    const { error: stockErr } = await supabase
      .from("menus")
      .update({ stok: sisa, tersedia: sisa > 0 })
      .eq("id", item.menuId);
    if (stockErr) {
      console.error(`[checkout] gagal update stok menu ${item.menuId}:`, stockErr.message);
    }
  }

  revalidatePath("/[locale]/dashboard", "layout");
  revalidatePath("/shopping");

  return { ok: true };
}
