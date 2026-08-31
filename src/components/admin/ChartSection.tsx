"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { revenueRangesByPeriod } from "@/data/adminMockData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartSectionProps {
  lineData?: { month: string; value: number }[];
  barData?: { label: string; value: number }[];
}

export default function ChartSection({}: ChartSectionProps) {
  const [range, setRange] = useState<"6m" | "12m">("6m");

  const currentData = revenueRangesByPeriod[range];

  const lineChartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Pendapatan",
        data: currentData.values,
        borderColor: "#e76f51",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 256);
          gradient.addColorStop(0, "rgba(231, 111, 81, 0.25)");
          gradient.addColorStop(1, "rgba(231, 111, 81, 0)");
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#e76f51",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `Pendapatan: Rp ${Number(tooltipItem.raw).toLocaleString("id-ID")}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#4b5563" },
      },
      y: {
        min: 0,
        max: 2500000,
        ticks: {
          stepSize: 500000,
          color: "#4b5563",
          callback: (tickValue: any) =>
            `Rp ${Number(tickValue).toLocaleString("id-ID")}`,
        },
        grid: { color: "#e5e7eb" },
      },
    },
  };

  const doughnutChartData = {
    labels: ["Selesai", "Diproses", "Refund"],
    datasets: [
      {
        data: [68, 22, 10],
        backgroundColor: ["#10b981", "#e76f51", "#f43f5e"],
        hoverBackgroundColor: ["#059669", "#d95f43", "#e11d48"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#4b5563" },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.label}: ${tooltipItem.formattedValue}%`,
        },
      },
    },
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Tren Pendapatan</h2>

          <div className="inline-flex rounded-md border border-gray-200 p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setRange("6m")}
              className={`rounded-sm px-2 py-1 transition-colors ${
                range === "6m"
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-600"
              }`}
            >
              6B
            </button>

            <button
              type="button"
              onClick={() => setRange("12m")}
              className={`rounded-sm px-2 py-1 transition-colors ${
                range === "12m"
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-600"
              }`}
            >
              12B
            </button>
          </div>
        </div>

        <div className="mt-4 h-64">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      <div className="rounded-lg border border-gray-100 shadow-sm bg-white p-6">
        <h2 className="text-sm font-medium text-gray-900">Status Pesanan</h2>

        <div className="mt-4 h-64">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
      </div>
    </div>
  );
}