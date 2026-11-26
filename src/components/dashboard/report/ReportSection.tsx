"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ChartPeriodFilter from "@/components/dashboard/ChartPeriodFilter";
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
import StatCard from "@/components/dashboard/StatCard";
import type {
  ChartMonthRange,
  ChartRanges,
  ChartTimeframe,
  DashboardStat,
  ReportChartPeriod,
} from "@/lib/data/aggregate";
import { formatCurrency } from "@/lib/format";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ReportSectionProps {
  summary: DashboardStat[];
  rows: {
    stand: string;
    pesanan: number;
    pendapatan: number;
    menuTerlaris: string;
    persentase: number;
  }[];
  charts: ChartRanges<ReportChartPeriod>;
}

export default function ReportSection({ summary, rows, charts }: ReportSectionProps) {
  const t = useTranslations("dashboard.report");
  const locale = useLocale();
  const [timeframe, setTimeframe] = useState<ChartTimeframe>("monthly");
  const [monthRange, setMonthRange] = useState<ChartMonthRange>("6m");
  const current =
    timeframe === "monthly" ? charts.monthly[monthRange] : charts[timeframe];

  const chartData = {
    labels: current.labels,
    datasets: [
      {
        label: t("revenueLabel"),
        data: current.pendapatan,
        backgroundColor: "#e76f51",
        hoverBackgroundColor: "#d55f43",
        borderRadius: 4,
        maxBarThickness: 32,
        yAxisID: "y",
      },
      {
        label: t("ordersLabel"),
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
            item.dataset.label === t("revenueLabel")
              ? t("revenueTooltip", { value: formatCurrency(Number(item.raw), locale) })
              : t("ordersTooltip", { value: item.formattedValue }),
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
          callback: (val: number | string) => formatCurrency(Number(val), locale),
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
        {summary.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-medium text-gray-900">{t("chartTitle")}</h2>
          <ChartPeriodFilter
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
            monthRange={monthRange}
            onMonthRangeChange={setMonthRange}
          />
        </div>
        <div className="mt-4 h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-gray-900">{t("perStandTitle")}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead>
              <tr className="text-left font-medium text-gray-600">
                <th className="px-4 py-3 whitespace-nowrap">{t("colStand")}</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">{t("colOrders")}</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">{t("colRevenue")}</th>
                <th className="px-4 py-3 whitespace-nowrap">{t("colBestMenu")}</th>
                <th className="px-4 py-3 whitespace-nowrap">{t("colContribution")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{row.stand}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-gray-600">{row.pesanan}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right font-semibold text-gray-900">
                    {formatCurrency(row.pendapatan, locale)}
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
                      <span className="text-xs text-gray-600 w-10 text-right">{row.persentase}%</span>
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