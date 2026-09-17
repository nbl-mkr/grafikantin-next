"use client";

import { useTranslations } from "next-intl";
import type { OrderView } from "./OrderTable";

export default function OrderExportButton({ orders }: { orders: OrderView[] }) {
  const t = useTranslations("dashboard.orders");

  const exportCSV = () => {
    const header = "ID;Tanggal;Nama;Kontak;Stand;Item;Jumlah;Metode;Total;Status";
    const escapeCell = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
    const rows = orders.map((order) =>
      [
        order.id,
        order.date,
        order.customer,
        order.phone,
        order.stand,
        order.menu,
        order.jumlah,
        order.metode,
        order.total,
        order.status,
      ].map(escapeCell).join(";")
    );
    const blob = new Blob(["\uFEFF" + [header, ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pesanan-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={exportCSV}
      disabled={orders.length === 0}
      className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {t("export")}
    </button>
  );
}
