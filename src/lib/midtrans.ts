import midtransClient from "midtrans-client";
import crypto from "node:crypto";

/**
 * Pembungkus API Midtrans (Snap) untuk sisi server.
 *
 * Environment ditentukan oleh MIDTRANS_IS_PRODUCTION, BUKAN dari format kunci.
 * Alasannya: format kunci Sandbox Midtrans tidak selalu berawalan "SB-"
 * (akun yang baru dibuat memakai format "Mid-server-..."), sehingga menebak
 * environment dari awalan kunci tidak dapat diandalkan.
 *
 * Catatan: paket `midtrans-client` TIDAK mendukung header kustom, sehingga
 * URL notifikasi tidak bisa diatur per-transaksi lewat X-Override-Notification.
 * URL notifikasi diatur sekali di dashboard Midtrans
 * (Settings > Configuration > Payment Notification URL).
 */
const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

function snap() {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

  if (!serverKey || !clientKey) {
    throw new Error(
      "MIDTRANS_SERVER_KEY / NEXT_PUBLIC_MIDTRANS_CLIENT_KEY belum diisi di .env.local"
    );
  }

  return new midtransClient.Snap({
    isProduction,
    serverKey,
    clientKey,
  });
}

export interface SnapItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateSnapParams {
  orderId: string;
  grossAmount: number;
  items: SnapItem[];
  customerName?: string | null;
  customerEmail?: string | null;
}

/**
 * Membuat transaksi Snap dan mengembalikan token untuk membuka popup pembayaran.
 * Token ini yang dipakai Snap.js di sisi browser.
 */
export async function createSnapTransaction(
  params: CreateSnapParams
): Promise<{ token: string; redirectUrl: string }> {
  const payload: Record<string, unknown> = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: params.grossAmount,
    },
    item_details: params.items.map((item) => ({
      id: item.id,
      name: item.name.slice(0, 50),
      price: item.price,
      quantity: item.quantity,
    })),
    // Sesuai alur kantin: pembayaran digital (QRIS + e-wallet).
    enabled_payments: ["qris", "gopay", "shopeepay"],
  };

  if (params.customerName || params.customerEmail) {
    payload.customer_details = {
      first_name: (params.customerName ?? "Pembeli").slice(0, 20),
      ...(params.customerEmail ? { email: params.customerEmail } : {}),
    };
  }

  const response = await snap().createTransaction(payload as never);

  return {
    token: response.token,
    redirectUrl: response.redirect_url,
  };
}

/**
 * Memverifikasi bahwa notifikasi webhook benar-benar datang dari Midtrans.
 *
 * Midtrans mengirim `signature_key` = SHA-512 dari:
 *   order_id + status_code + gross_amount + server_key
 *
 * Tanpa verifikasi ini, siapa pun yang tahu URL webhook kita bisa mengirim
 * POST palsu dan membuat order gratis.
 */
export function verifySignature(payload: {
  order_id?: string;
  status_code?: string;
  gross_amount?: string;
  signature_key?: string;
}): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return false;

  const { order_id, status_code, gross_amount, signature_key } = payload;
  if (!order_id || !status_code || !gross_amount || !signature_key) return false;

  const expected = crypto
    .createHash("sha512")
    .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
    .digest("hex");

  // Perbandingan waktu-tetap untuk mencegah serangan timing.
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature_key, "utf8");
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

export { isProduction };
