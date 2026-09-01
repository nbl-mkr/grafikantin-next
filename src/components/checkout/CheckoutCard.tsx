"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartItem, useCart } from "@/context/CartContext";

export default function CheckoutCard() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCheckout = localStorage.getItem("checkout_items");
    if (savedCheckout) {
      try {
        setItems(JSON.parse(savedCheckout));
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.harga * item.quantity,
    0
  );

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QRIS_GRAFIKANTIN_SMKN4_MALANG_${subtotal}`;

  const handleConfirmAndPay = () => {
    if (items.length === 0) return;

    const now = new Date();
    const formattedDate = now.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) + `, ${now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const generatedOrderId = `#KG-${dateStr}${randomSuffix}`;

    const orderPayload = {
      orderId: generatedOrderId,
      date: formattedDate,
      paymentMethod: "QRIS / E-Wallet",
      items: items,
      total: subtotal,
    };

    localStorage.setItem("last_order", JSON.stringify(orderPayload));
    localStorage.removeItem("checkout_items");
    clearCart();
    router.push("/invoice");
  };

  if (!isLoaded) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Pembayaran Pesanan
        </h1>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 sm:p-12 text-center shadow-sm">
          <p className="text-gray-500 mb-4">
            Tidak ada item yang dipilih untuk dibayar.
          </p>
          <Link
            href="/shopping"
            className="rounded-xl bg-[#e76f51] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#d55f43]"
          >
            Kembali ke Keranjang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Pembayaran Pesanan
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              Rincian Pesanan
            </h2>
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {item.nama_menu}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.quantity}x Rp {item.harga.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">
                    Rp {(item.harga * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-1">
              Metode Pembayaran (Cashless)
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Silakan scan QRIS di bawah ini menggunakan DANA, GoPay, OVO, ShopeePay, atau Mobile Banking lainnya.
            </p>

            <div className="flex justify-center">
              <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-slate-50 p-6 w-full max-w-sm text-center">
                <span className="text-xs font-bold text-slate-700 tracking-wider mb-4">
                  QRIS GRAFIKANTIN
                </span>
                <div className="relative h-48 w-48 bg-white p-2 rounded-xl border border-gray-200 shadow-inner flex items-center justify-center">
                  <Image
                    src={qrUrl}
                    alt="QRIS Grafikantin"
                    width={180}
                    height={180}
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] font-medium text-gray-400 mt-4">
                  NMAS: Kantin SMKN 4 Malang
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              Total Ringkasan
            </h2>
            <div className="flex justify-between text-sm text-gray-600 mb-3">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Biaya Layanan</span>
              <span className="font-semibold text-emerald-600">Gratis</span>
            </div>
            <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between items-center">
              <span className="font-bold text-gray-900 text-sm">
                Total Bayar
              </span>
              <span className="text-lg font-extrabold text-[#e76f51]">
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
            <button
              type="button"
              onClick={handleConfirmAndPay}
              className="w-full rounded-xl bg-[#e76f51] py-3 text-center text-sm font-bold text-white transition hover:bg-[#d55f43] cursor-pointer"
            >
              Konfirmasi & Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}