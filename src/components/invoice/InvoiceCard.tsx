"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { InvoiceData } from "@/lib/data/queries";

export default function InvoiceCard({ order }: { order: InvoiceData | null }) {
  const t = useTranslations("invoice");
  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  const handleFinish = () => {
    router.push("/shopping");
  };

  if (!order) {
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
          <div className="mt-4 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 border border-emerald-200">
            <span className="text-xs font-bold text-emerald-600 tracking-wide uppercase">
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
                Rp {(item.harga * item.quantity).toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">{t("totalPayment")}</span>
            <span className="text-base font-extrabold text-[#e76f51]">
              Rp {order.total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 text-center text-sm font-bold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
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