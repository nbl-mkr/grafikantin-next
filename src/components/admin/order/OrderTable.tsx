"use client";

import { useState } from "react";

interface OrderItem {
  id: string;
  customer: string;
  date: string;
  status: "Selesai" | "Diproses" | "Batal";
  amount: string;
}

const mockOrders: OrderItem[] = [
  {
    id: "#3921",
    customer: "Ahmadinezka Evan",
    date: "12 Jun 2025",
    status: "Selesai",
    amount: "Rp 412.000",
  },
  {
    id: "#3920",
    customer: "Akhmad Daqiqul",
    date: "11 Jun 2025",
    status: "Diproses",
    amount: "Rp 128.500",
  },
  {
    id: "#3919",
    customer: "Devin Adinata",
    date: "10 Jun 2025",
    status: "Selesai",
    amount: "Rp 894.200",
  },
  {
    id: "#3918",
    customer: "Rizky Zidane",
    date: "09 Jun 2025",
    status: "Batal",
    amount: "Rp 56.000",
  },
  {
    id: "#3917",
    customer: "Permadi Saprianto",
    date: "08 Jun 2025",
    status: "Selesai",
    amount: "Rp 219.750",
  },
  {
    id: "#3916",
    customer: "Rizza Cetta",
    date: "07 Jun 2025",
    status: "Diproses",
    amount: "Rp 63.400",
  },
];

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
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-medium text-gray-900">Semua Pesanan</h2>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari pesanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-200 py-1.5 pl-3 pr-9 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none sm:w-56"
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

          <div className="inline-flex rounded-md border border-gray-200 p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`rounded-sm px-2 py-1 ${
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
              className={`rounded-sm px-2 py-1 ${
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
              className={`rounded-sm px-2 py-1 ${
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
              className={`rounded-sm px-2 py-1 ${
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
        <table className="min-w-full divide-y-2 divide-gray-200 text-left text-sm">
          <thead>
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">ID Pesanan</th>
              <th className="px-3 py-2 whitespace-nowrap">Pelanggan</th>
              <th className="px-3 py-2 whitespace-nowrap">Tanggal</th>
              <th className="px-3 py-2 whitespace-nowrap">Status</th>
              <th className="px-3 py-2 whitespace-nowrap">Total</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">{order.id}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{order.customer}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{order.date}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {order.status === "Selesai" && (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs text-emerald-700">
                        Selesai
                      </span>
                    )}
                    {order.status === "Diproses" && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs text-amber-700">
                        Diproses
                      </span>
                    )}
                    {order.status === "Batal" && (
                      <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs text-red-700">
                        Batal
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{order.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-3 py-6 text-center text-gray-500" colSpan={5}>
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