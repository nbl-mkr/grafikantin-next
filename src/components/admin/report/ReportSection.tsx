"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { reportSummary, reportRows } from "@/data/adminMockData";
import StatCard from "@/components/admin/StatCard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type RangeKey = "6m" | "12m";

const rangeData: Record<RangeKey, { labels: string[]; pendapatan: number[]; pesanan: number[] }> = {
  "6m": {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    pendapatan: [2800000, 3100000, 2750000, 4200000, 3900000, 4800000],
    pesanan: [210, 245, 228, 310, 289, 370],
  },
  "12m": {
    labels: ["Jul", "Agu", "Sep", "Okt", "Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    pendapatan: [1500000, 1800000, 2100000, 2600000, 2400000, 3000000, 2800000, 3100000, 2750000, 4200000, 3900000, 4800000],
    pesanan: [110, 130, 155, 190, 180, 220, 210, 245, 228, 310, 289, 370],
  },
};

export default function ReportSection() {
  const [range, setRange] = useState<RangeKey>("6m");

  const current = rangeData[range];

  const chartData = {
    labels: current.labels,
    datasets: [
      {
        label: "Pendapatan (Rp)",
        data: current.pendapatan,
        backgroundColor: "#e76f51",
        hoverBackgroundColor: "#d55f43",
        borderRadius: 4,
        maxBarThickness: 32,
        yAxisID: "y",
      },
      {
        label: "Jumlah Pesanan",
        data: current.pesanan,
        backgroundColor: "#94a3b8",
        hoverBackgroundColor: "#64748b",
        borderRadius: 4,
        maxBarThickness: 32,
        yAxisID: "y1",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: { position: "bottom" as const, labels: { color: "#4b5563" } },
      tooltip: {
        callbacks: {
          label: (item: TooltipItem<"bar">) =>
            item.dataset.label === "Pendapatan (Rp)"
              ? `Pendapatan: Rp ${Number(item.formattedValue.replace(/,/g, "")).toLocaleString("id-ID")}`
              : `Pesanan: ${item.formattedValue}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#4b5563" } },
      y: {
        type: "linear" as const,
        position: "left" as const,
        grid: { color: "#e5e7eb" },
        ticks: {
          color: "#4b5563",
          callback: (val: number | string) => `Rp ${Number(val).toLocaleString("id-ID")}`,
        },
      },
      y1: {
        type: "linear" as const,
        position: "right" as const,
        grid: { drawOnChartArea: false },
        ticks: { color: "#4b5563" },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportSummary.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Pendapatan & Pesanan</h2>
          <div className="inline-flex rounded-md border border-gray-200 p-0.5 text-xs font-medium">
            {(["6m", "12m"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={`rounded-sm px-2 py-1 transition-colors ${
                  range === r ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-600"
                }`}
              >
                {r === "6m" ? "6B" : "12B"}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-gray-900">Performa per Stand</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead>
              <tr className="text-left font-medium text-gray-500">
                <th className="px-4 py-3 whitespace-nowrap">Stand</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Pesanan</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Pendapatan</th>
                <th className="px-4 py-3 whitespace-nowrap">Menu Terlaris</th>
                <th className="px-4 py-3 whitespace-nowrap">Kontribusi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reportRows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{row.stand}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-gray-600">{row.pesanan}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right font-semibold text-gray-900">
                    Rp {row.pendapatan.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{row.menuTerlaris}</td>
                  <td className="px-4 py-3 whitespace-nowrap min-w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 rounded-full bg-gray-100 h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#e76f51]"
                          style={{ width: `${row.persentase}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-10 text-right">{row.persentase}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
