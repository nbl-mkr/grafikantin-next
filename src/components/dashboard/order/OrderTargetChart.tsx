"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ChartPeriodFilter from "@/components/dashboard/ChartPeriodFilter";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { TooltipItem } from "chart.js";
import { Chart } from "react-chartjs-2";
import type { ChartMonthRange, ChartTimeframe, OrderChartData } from "@/lib/data/aggregate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend
);

export default function OrderTargetChart({ data }: { data: OrderChartData }) {
  const t = useTranslations("dashboard.orders");
  const [timeframe, setTimeframe] = useState<ChartTimeframe>("monthly");
  const [monthRange, setMonthRange] = useState<ChartMonthRange>("6m");
  const period =
    timeframe === "monthly" ? data.monthly[monthRange] : data[timeframe];
  const target =
    timeframe === "daily" ? data.target / (365.25 / 12) :
    timeframe === "weekly" ? (data.target * 7) / (365.25 / 12) :
    data.target;
  const highestValue = Math.max(target, ...period.pesanan, 0);
  const roughStep = highestValue > 0 ? highestValue / 5 : 1;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalizedStep = roughStep / magnitude;
  const yAxisStep =
    (normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10) *
    magnitude;
  const yAxisMax = Math.max(yAxisStep * 5, Math.ceil(highestValue / yAxisStep) * yAxisStep);

  const chartData = {
    labels: period.labels,
    datasets: [
      {
        type: "line" as const,
        label: t("target"),
        data: period.labels.map(() => target),
        borderColor: "#f43f5e",
        backgroundColor: "#f43f5e",
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#f43f5e",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
        tension: 0,
        fill: false,
        order: 1,
      },
      {
        type: "bar" as const,
        label: t("ordersLabel"),
        data: period.pesanan,
        backgroundColor: "#e76f51",
        hoverBackgroundColor: "#d95f43",
        borderRadius: 4,
        maxBarThickness: 32,
        order: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: { position: "bottom" as const, labels: { color: "#4b5563" } },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"bar" | "line">) =>
            `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#4b5563" } },
      y: {
        beginAtZero: true,
        max: yAxisMax,
        grid: { color: "#e5e7eb" },
        ticks: { color: "#4b5563", stepSize: yAxisStep },
      },
    },
  };

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
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
        <Chart type="bar" data={chartData} options={options} />
      </div>
    </div>
  );
}