"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { CartItem, useCart } from "@/context/CartContext";
import { createPaymentAction } from "@/lib/data/checkout";
import { formatCurrency } from "@/lib/format";

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

const SNAP_SCRIPT_ID = "midtrans-snap-script";

export default function CheckoutCard() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const router = useRouter();
  const { clearCart } = useCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [snapReady, setSnapReady] = useState(false);

  useEffect(() => {
    const savedCheckout = localStorage.getItem("checkout_items");
    if (savedCheckout) {
      try {
        // Baca data checkout dari localStorage saat mount (tidak bisa dilakukan saat render).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(savedCheckout));
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Muat Snap.js dari Midtrans. URL berbeda untuk sandbox & production.
  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    if (!clientKey) return;

    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";
    const src = isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";

    if (document.getElementById(SNAP_SCRIPT_ID)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSnapReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = SNAP_SCRIPT_ID;
    script.src = src;
    script.setAttribute("data-client-key", clientKey);
    script.onload = () => setSnapReady(true);
    script.onerror = () => setError(t("errorSnapLoad"));
    document.body.appendChild(script);
  }, [t]);

  const subtotal = items.reduce((sum, item) => sum + item.harga * item.quantity, 0);

  const handlePay = async () => {
    if (submitting || items.length === 0) return;
    if (!snapReady || !window.snap) {
      setError(t("errorSnapLoad"));
      return;
    }

    setSubmitting(true);
    setError("");

    const res = await createPaymentAction(
      items.map((item) => ({
        menuId: Number(item.id),
        quantity: item.quantity,
      }))
    );

    if (!res.ok || !res.token) {
      setError(res.error ?? t("errorDefault"));
      setSubmitting(false);
      return;
    }

    const token = res.token;
    const kode = res.kode ?? "";

    window.snap.pay(token, {
      onSuccess: () => {
        localStorage.removeItem("checkout_items");
        clearCart();
        setSubmitting(false);
        router.push(`/invoice?kode=${encodeURIComponent(kode)}`);
      },
      onPending: () => {
        // Pembayaran belum selesai (mis. QRIS belum dipindai).
        // Order belum dibuat; arahkan ke invoice untuk memeriksa status.
        setSubmitting(false);
        router.push(`/invoice?kode=${encodeURIComponent(kode)}`);
      },
      onError: () => {
        setError(t("errorPaymentFailed"));
        setSubmitting(false);
      },
      onClose: () => {
        // Pengguna menutup popup tanpa menyelesaikan pembayaran.
        setError(t("errorPaymentClosed"));
        setSubmitting(false);
      },
    });
  };

  if (!isLoaded) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {t("title")}
        </h1>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 sm:p-12 text-center shadow-sm">
          <p className="text-gray-600 mb-4">
            {t("emptyTitle")}
          </p>
          <Link
            href="/shopping"
            className="rounded-xl bg-[#e76f51] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#d55f43]"
          >
            {t("backToCart")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              {t("orderDetails")}
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
                    <p className="text-xs text-gray-600 mt-0.5">
                      {item.quantity}x {formatCurrency(item.harga, locale)}
                    </p>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">
                    {formatCurrency(item.harga * item.quantity, locale)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-1">
              {t("paymentMethod")}
            </h2>
            <p className="text-xs text-gray-600 mb-6">
              {t("paymentInstructions")}
            </p>

            <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-slate-50 p-6 w-full text-center">
              <span className="text-xs font-bold text-slate-700 tracking-wider mb-3">
                {t("paymentViaMidtrans")}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {["QRIS", "GoPay", "ShopeePay"].map((method) => (
                  <span
                    key={method}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700"
                  >
                    {method}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[11px] font-medium text-gray-500">
                {t("paymentSecureNote")}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              {t("summaryTitle")}
            </h2>
            <div className="flex justify-between text-sm text-gray-600 mb-3">
              <span>{t("subtotal")}</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(subtotal, locale)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>{t("serviceFee")}</span>
              <span className="font-semibold text-emerald-600">{t("free")}</span>
            </div>
            <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between items-center">
              <span className="font-bold text-gray-900 text-sm">
                {t("totalPayment")}
              </span>
              <span className="text-lg font-extrabold text-[#e76f51]">
                {formatCurrency(subtotal, locale)}
              </span>
            </div>
            {error && (
              <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={handlePay}
              disabled={submitting || !snapReady}
              className={`w-full rounded-xl py-3 text-center text-sm font-bold text-white transition ${
                submitting || !snapReady
                  ? "cursor-not-allowed bg-[#d55f43] opacity-60"
                  : "cursor-pointer bg-[#e76f51] hover:bg-[#d55f43]"
              }`}
            >
              {submitting ? t("btnProcessing") : t("btnPayNow")}
            </button>
            <p className="mt-2 text-center text-[11px] font-medium text-gray-500">
              {t("paymentRedirectNote")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
