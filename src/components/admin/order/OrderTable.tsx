"use client";

import { useState, useMemo } from "react";
import { Order } from "@/data/adminMockData";

interface OrderTableProps {
  orders: Order[];
}

const statusStyles: Record<string, string> = {
  Selesai: "bg-emerald-50 text-emerald-600",
  Diproses: "bg-blue-50 text-blue-600",
  Menunggu: "bg-amber-50 text-amber-600",
};

const statusOptions = [
  { label: "Semua Status", value: "Semua" },
  { label: "Menunggu", value: "Menunggu" },
  { label: "Diproses", value: "Diproses" },
  { label: "Selesai", value: "Selesai" },
];

export default function OrderTable({ orders }: OrderTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const itemsPerPage = 5;

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.menu.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "Semua" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const emptyRowsCount = itemsPerPage - paginated.length;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-gray-900">Daftar Pesanan</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari pesanan..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full sm:w-64 rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#e76f51] focus:outline-none focus:ring-1 focus:ring-[#e76f51]"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="flex w-full min-w-35 items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 focus:border-[#e76f51] focus:outline-none focus:ring-1 focus:ring-[#e76f51] sm:w-auto"
              >
                <span>{statusOptions.find((opt) => opt.value === statusFilter)?.label}</span>
                <svg className={`h-4 w-4 text-gray-400 transition-transform ${isStatusOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isStatusOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsStatusOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-2 w-40 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setStatusFilter(opt.value);
                          setCurrentPage(1);
                          setIsStatusOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                          statusFilter === opt.value
                            ? "text-[#e76f51] font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">ID Pesanan</th>
                <th className="px-6 py-3 font-medium">Pelanggan</th>
                <th className="px-6 py-3 font-medium">Menu</th>
                <th className="px-6 py-3 font-medium">Stand</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Waktu</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length > 0 ? (
                <>
                  {paginated.map((order) => (
                    <tr key={order.id} className="h-16 hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4 text-gray-600">{order.menu}</td>
                      <td className="px-6 py-4 text-gray-600">{order.stand}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">Rp {order.total.toLocaleString("id-ID")}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{order.time}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#e76f51] hover:text-[#d55f43] text-xs font-semibold transition">
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                  {Array.from({ length: emptyRowsCount }).map((_, index) => (
                    <tr key={`empty-${index}`} className="h-16">
                      <td colSpan={8}></td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="h-80">
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    Tidak ada pesanan yang sesuai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex h-14 items-center justify-between border-t border-gray-100 px-6 text-xs text-gray-500">
        {filtered.length > 0 ? (
          <>
            <span>
              Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filtered.length)} dari {filtered.length} pesanan
            </span>
            <div className="flex gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="rounded-lg border px-2.5 py-1 disabled:opacity-30 hover:bg-gray-50 transition"
              >
                ←
              </button>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="rounded-lg border px-2.5 py-1 disabled:opacity-30 hover:bg-gray-50 transition"
              >
                →
              </button>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}