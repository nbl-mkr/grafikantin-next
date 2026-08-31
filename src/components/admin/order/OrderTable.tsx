"use client";

import { useState } from "react";

interface OrderItem {
  id: string;
  customer: string;
  date: string;
  status: "Selesai" | "Diproses" | "Batal";
  amount: number;
}

const mockOrders: OrderItem[] = [
  {
    id: "#3921",
    customer: "Ahmadinezka Evan",
    date: "12 Jun 2025",
    status: "Selesai",
    amount: 412000,
  },
  {
    id: "#3920",
    customer: "Akhmad Daqiqul",
    date: "11 Jun 2025",
    status: "Diproses",
    amount: 128500,
  },
  {
    id: "#3919",
    customer: "Devin Adinata",
    date: "10 Jun 2025",
    status: "Selesai",
    amount: 894200,
  },
  {
    id: "#3918",
    customer: "Rizky Zidane",
    date: "09 Jun 2025",
    status: "Batal",
    amount: 56000,
  },
  {
    id: "#3917",
    customer: "Permadi Saprianto",
    date: "08 Jun 2025",
    status: "Selesai",
    amount: 219750,
  },
  {
    id: "#3916",
    customer: "Rizza Cetta",
    date: "07 Jun 2025",
    status: "Diproses",
    amount: 63400,
  },
];

const statusStyles: Record<string, string> = {
  Selesai: "bg-emerald-50 text-emerald-600",
  Diproses: "bg-blue-50 text-blue-600",
  Batal: "bg-red-50 text-red-600",
};

export default function OrderTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && order.status === "Selesai") ||
      (statusFilter === "pending" && order.status === "Diproses") ||
      (statusFilter === "refunded" && order.status === "Batal");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-medium text-gray-900">Semua Pesanan</h2>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Cari pesanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full rounded-md border border-gray-200 pl-3 pr-9 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none sm:w-56"
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 grid w-8 place-content-center text-gray-400">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
          </div>

          <div className="inline-flex h-9 items-center rounded-md border border-gray-200 p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`h-full rounded-sm px-2.5 flex items-center justify-center ${
                statusFilter === "all"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("paid")}
              className={`h-full rounded-sm px-2.5 flex items-center justify-center ${
                statusFilter === "paid"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Selesai
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("pending")}
              className={`h-full rounded-sm px-2.5 flex items-center justify-center ${
                statusFilter === "pending"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Diproses
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("refunded")}
              className={`h-full rounded-sm px-2.5 flex items-center justify-center ${
                statusFilter === "refunded"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Batal
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead>
            <tr className="text-left font-medium text-gray-500">
              <th className="px-4 py-3 whitespace-nowrap">ID Pesanan</th>
              <th className="px-4 py-3 whitespace-nowrap">Pelanggan</th>
              <th className="px-4 py-3 whitespace-nowrap">Tanggal</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Total</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {order.customer}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        statusStyles[order.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-gray-600">
                    Rp {order.amount.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
                  Tidak ada pesanan yang sesuai dengan pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}