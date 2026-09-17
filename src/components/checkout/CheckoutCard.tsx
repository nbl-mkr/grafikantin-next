"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { CartItem, useCart } from "@/context/CartContext";
import { createOrderAction } from "@/lib/data/checkout";
import { formatCurrency } from "@/lib/format";

export default function CheckoutCard() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const router = useRouter();
  const { clearCart } = useCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  const handleConfirmAndPay = async () => {
    if (!paymentConfirmed || submitting || items.length === 0) return;
    setSubmitting(true);
    setError("");

    const res = await createOrderAction(
      items.map((item) => ({
        menuId: Number(item.id),
        quantity: item.quantity,
      }))
    );

    if (!res.ok) {
      setError(res.error ?? t("errorDefault"));
      setSubmitting(false);
      return;
    }

    localStorage.removeItem("checkout_items");
    clearCart();
    setSubmitting(false);
    router.push(`/invoice?kode=${encodeURIComponent(res.kode ?? "")}`);
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
              {t("qrisInstructions")}
            </p>

            <div className="flex justify-center">
              <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-slate-50 p-6 w-full max-w-sm text-center">
                <span className="text-xs font-bold text-slate-700 tracking-wider mb-4">
                  {t("qrisTitle")}
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
                <span className="text-xs font-medium text-gray-600 mt-4">
                  {t("qrisMerchant")}
                </span>
              </div>
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
            <label className="mb-4 flex cursor-pointer select-none items-start gap-2.5 rounded-xl border border-gray-100 bg-slate-50 p-3">
              <input
                type="checkbox"
                checked={paymentConfirmed}
                onChange={(e) => setPaymentConfirmed(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-[#e76f51]"
              />
              <span className="text-xs font-medium text-gray-700">
                {t("confirmCheckbox")}
              </span>
            </label>
            {error && (
              <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={handleConfirmAndPay}
              disabled={!paymentConfirmed || submitting}
              className={`w-full rounded-xl py-3 text-center text-sm font-bold text-white transition ${
                paymentConfirmed
                  ? "cursor-pointer bg-[#e76f51] hover:bg-[#d55f43]"
                  : "cursor-not-allowed bg-[#d55f43] opacity-60"
              }`}
            >
              {submitting ? t("btnProcessing") : t("btnConfirm")}
            </button>
            {!paymentConfirmed && (
              <p className="mt-2 text-center text-[11px] font-medium text-gray-500">
                {t("confirmNotice")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}