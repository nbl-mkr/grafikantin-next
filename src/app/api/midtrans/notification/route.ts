import { NextResponse, type NextRequest } from "next/server";
import { verifySignature } from "@/lib/midtrans";
import { createAdminClient } from "@/lib/supabase/admin";
import { finalizePaidOrder } from "@/lib/data/checkout";

/**
 * Webhook notifikasi pembayaran Midtrans.
 *
 * Alur: Midtrans memanggil endpoint ini setiap kali status transaksi berubah.
 * Order asli baru dibuat di sini — dan hanya setelah pembayaran terkonfirmasi
 * (transaction_status = settlement / capture).
 *
 * Endpoint ini TIDAK memakai sesi user (dipanggil oleh server Midtrans),
 * sehingga memakai service role client yang melewati RLS.
 *
 * PENTING: selalu balas HTTP 200 agar Midtrans tidak mengulang notifikasi
 * terus-menerus. Kegagalan diproses dicatat di log, bukan lewat status HTTP.
 */
export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  const orderId = typeof payload.order_id === "string" ? payload.order_id : "";
  const statusCode = typeof payload.status_code === "string" ? payload.status_code : "";
  const grossAmount = typeof payload.gross_amount === "string" ? payload.gross_amount : "";
  const signatureKey = typeof payload.signature_key === "string" ? payload.signature_key : "";
  const transactionStatus =
    typeof payload.transaction_status === "string" ? payload.transaction_status : "";
  const fraudStatus = typeof payload.fraud_status === "string" ? payload.fraud_status : "";
  const paymentType = typeof payload.payment_type === "string" ? payload.payment_type : "";
  const transactionId =
    typeof payload.transaction_id === "string" ? payload.transaction_id : "";

  // 1. Verifikasi bahwa notifikasi ini benar-benar dari Midtrans.
  const valid = verifySignature({
    order_id: orderId,
    status_code: statusCode,
    gross_amount: grossAmount,
    signature_key: signatureKey,
  });

  if (!valid) {
    console.error("[midtrans] signature tidak valid untuk order_id:", orderId);
    // Balas 200 supaya Midtrans tidak mengulang; permintaan ini memang kita tolak.
    return NextResponse.json({ ok: false, reason: "invalid_signature" }, { status: 200 });
  }

  if (!orderId) {
    return NextResponse.json({ ok: false, reason: "missing_order_id" }, { status: 200 });
  }

  const supabase = createAdminClient();

  // 2. Ambil sesi pembayaran.
  const { data: payment, error: paymentErr } = await supabase
    .from("payments")
    .select("id, order_id, kode_transaksi, id_user, gross_amount, status, midtrans_transaction_id")
    .eq("order_id", orderId)
    .maybeSingle();

  if (paymentErr) {
    console.error("[midtrans] gagal memuat payment:", paymentErr.message);
    return NextResponse.json({ ok: false, reason: "db_error" }, { status: 200 });
  }

  if (!payment) {
    console.error("[midtrans] payment tidak ditemukan untuk order_id:", orderId);
    return NextResponse.json({ ok: false, reason: "payment_not_found" }, { status: 200 });
  }

  // 3. IDEMPOTENCY — kunci anti-dobel-potong-stok.
  //    Midtrans dapat mengirim notifikasi yang sama berkali-kali.
  //    Pengecekan sebenarnya ada di finalizePaidOrder (melihat tabel orders),
  //    sehingga notifikasi ulang tidak akan membuat order / memotong stok 2x.
  //    Catatan: sengaja TIDAK keluar lebih awal di sini, supaya kalau
  //    sebelumnya order gagal dibuat, notifikasi ulang masih bisa memperbaikinya.

  // 4. Tentukan status pembayaran.
  const isPaid =
    transactionStatus === "settlement" ||
    (transactionStatus === "capture" && fraudStatus === "accept");

  const isFailed = ["deny", "cancel", "expire", "failure"].includes(transactionStatus);

  if (isPaid) {
    // 5. Buat order asli + potong stok (idempoten).
    //    Dilakukan SEBELUM menandai lunas: kalau pembuatan order gagal,
    //    status tetap 'pending' sehingga notifikasi ulang dari Midtrans
    //    akan mencoba lagi — bukan terkunci sebagai "sudah diproses".
    const result = await finalizePaidOrder({
      kodeTransaksi: payment.kode_transaksi,
      idUser: payment.id_user,
      metodePembayaran: paymentType ? paymentType.toUpperCase() : "QRIS / E-Wallet",
    });

    if (!result.ok) {
      console.error("[midtrans] gagal membuat order:", result.error);
      return NextResponse.json({ ok: false, reason: "order_failed" }, { status: 200 });
    }

    // 6. Baru tandai pembayaran lunas (order sudah dipastikan ada).
    const { error: updateErr } = await supabase
      .from("payments")
      .update({
        status: "settlement",
        payment_type: paymentType || null,
        midtrans_transaction_id: transactionId || null,
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", payment.id);

    if (updateErr) {
      console.error("[midtrans] gagal update payment:", updateErr.message);
    }

    return NextResponse.json({ ok: true, reason: "settled", kode: payment.kode_transaksi });
  }

  if (isFailed) {
    const { error: failErr } = await supabase
      .from("payments")
      .update({
        status: transactionStatus === "expire" ? "expire" : transactionStatus,
        payment_type: paymentType || null,
        midtrans_transaction_id: transactionId || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payment.id);

    if (failErr) {
      console.error("[midtrans] gagal update status gagal:", failErr.message);
    }

    return NextResponse.json({ ok: true, reason: transactionStatus });
  }

  // Status lain (mis. pending) — tidak ada yang perlu dilakukan.
  return NextResponse.json({ ok: true, reason: transactionStatus || "ignored" });
}
