"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { InvoiceStatus } from "@/lib/data/queries";
import { syncPaymentStatusAction } from "@/lib/data/checkout";

function formatRupiah(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function InvoiceCard({ status }: { status: InvoiceStatus }) {
  const t = useTranslations("invoice");
  const locale = useLocale();
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [checkMessage, setCheckMessage] = useState("");

  const handlePrint = () => {
    window.print();
  };

  const handleFinish = () => {
    router.push("/shopping");
  };

  /**
   * Tanya status pembayaran langsung ke Midtrans (bukan sekadar memuat ulang
   * database). Ini jaring pengaman kalau notifikasi webhook telat/gagal:
   * begitu Midtrans bilang lunas, order langsung dibuat di sini.
   */
  const handleCheckStatus = async (kode: string) => {
    if (checking) return;
    setChecking(true);
    setCheckMessage("");

    const res = await syncPaymentStatusAction(kode);

    if (res.ok && res.status === "settlement") {
      router.refresh();
      setChecking(false);
      return;
    }

    if (!res.ok) {
      setCheckMessage(res.error ?? t("checkFailed"));
    } else if (res.status === "pending") {
      setCheckMessage(t("checkStillPending"));
    } else if (res.status) {
      setCheckMessage(t("checkNotPaid"));
    }
    setChecking(false);
  };

  // --- Pembayaran belum terkonfirmasi (webhook Midtrans belum masuk) ---
  if (status?.state === "pending") {
    return (
      <div className="mx-auto max-w-md px-4 py-12 text-center sm:px-0">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-slate-50">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <h1 className="text-base font-bold text-gray-900">{t("pendingTitle")}</h1>
          <p className="mt-2 text-sm text-gray-600">{t("pendingBody")}</p>

          <div className="mt-6 space-y-2 border-t border-gray-100 pt-5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>{t("orderCode")}</span>
              <span className="font-semibold text-gray-900">{status.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("totalPayment")}</span>
              <span className="font-semibold text-gray-900">
                {formatRupiah(status.total, locale)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleCheckStatus(status.orderId)}
              disabled={checking}
              className={`w-full rounded-xl py-3 text-sm font-bold text-white transition ${
                checking
                  ? "cursor-not-allowed bg-[#d55f43] opacity-60"
                  : "bg-[#e76f51] hover:bg-[#d55f43]"
              }`}
            >
              {checking ? t("checking") : t("checkAgain")}
            </button>
            <button
              type="button"
              onClick={handleFinish}
              className="w-full rounded-xl border border-gray-100 bg-slate-50 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-slate-100"
            >
              {t("finish")}
            </button>
          </div>
          {checkMessage && (
            <p className="mt-3 rounded-lg border border-gray-100 bg-slate-50 px-3 py-2 text-xs font-medium text-gray-600">
              {checkMessage}
            </p>
          )}
          <p className="mt-3 text-[11px] font-medium text-gray-500">{t("pendingHint")}</p>
        </div>
      </div>
    );
  }

  // --- Kode tidak ditemukan / pembayaran gagal ---
  if (!status || status.state !== "paid") {
    return (
      <div className="mx-auto max-w-md px-4 py-12 text-center">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-gray-600 mb-6">
            {t("notFound")}
          </p>
          <button
            type="button"
            onClick={() => router.push("/shopping")}
            className="w-full rounded-xl bg-[#e76f51] py-3 text-sm font-bold text-white transition hover:bg-[#d55f43]"
          >
            {t("backToHome")}
          </button>
        </div>
      </div>
    );
  }

  // --- Pembayaran lunas: tampilkan struk ---
  const order = status.order;

  return (
    <div className="mx-auto max-w-md px-4 sm:px-0">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm print:border-none print:shadow-none print:p-0">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black tracking-wider text-gray-900">
            GRAFIKANTIN
          </h1>
          <p className="text-xs font-medium text-gray-600 mt-1">
            SMK Negeri 4 Malang
          </p>
          <div className="mt-4 flex items-center justify-center">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {t("paidBadge")}
            </span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-gray-600 border-t border-b border-gray-100 py-4 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">{t("orderCode")}</span>
            <span className="font-semibold text-gray-900">{order.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("time")}</span>
            <span className="font-semibold text-gray-900">{order.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("method")}</span>
            <span className="font-semibold text-gray-900">{order.paymentMethod}</span>
          </div>
        </div>

        <div className="divide-y divide-gray-100 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2.5 text-xs">
              <span className="text-gray-800 font-medium">
                {item.quantity}x {item.nama_menu}
              </span>
              <span className="font-semibold text-gray-900">
                {formatRupiah(item.harga * item.quantity, locale)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">{t("totalPayment")}</span>
            <span className="text-base font-extrabold text-[#e76f51]">
              {formatRupiah(order.total, locale)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full rounded-xl border border-gray-100 bg-slate-50 py-3 text-center text-sm font-bold text-gray-700 transition-colors duration-300 hover:bg-slate-100 cursor-pointer"
          >
            {t("print")}
          </button>
          <button
            type="button"
            onClick={handleFinish}
            className="w-full rounded-xl bg-[#e76f51] py-3 text-center text-sm font-bold text-white transition hover:bg-[#d55f43] cursor-pointer"
          >
            {t("finish")}
          </button>
        </div>
      </div>
    </div>
  );
}
