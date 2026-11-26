"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ChartPeriodFilter from "@/components/dashboard/ChartPeriodFilter";
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
  type ChartOptions,
  type TooltipItem,
  type ScriptableContext,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import type { ChartMonthRange, ChartRanges, ChartPeriod, ChartTimeframe } from "@/lib/data/aggregate";
import { formatCurrency } from "@/lib/format";

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
  revenueRanges: ChartRanges<ChartPeriod>;
  statusSplit: { label: string; value: number }[];
}

export default function ChartSection({ revenueRanges, statusSplit }: ChartSectionProps) {
  const t = useTranslations("dashboard.overview");
  const locale = useLocale();
  const [timeframe, setTimeframe] = useState<ChartTimeframe>("monthly");
  const [monthRange, setMonthRange] = useState<ChartMonthRange>("6m");
  const currentData =
    timeframe === "monthly" ? revenueRanges.monthly[monthRange] : revenueRanges[timeframe];
  const maxRevenue = Math.max(...currentData.values, 0);
  const roughStep = maxRevenue > 0 ? maxRevenue / 5 : 500000;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalizedStep = roughStep / magnitude;
  const yAxisStep =
    (normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10) *
    magnitude;
  const yAxisMax = Math.max(yAxisStep * 5, Math.ceil(maxRevenue / yAxisStep) * yAxisStep);

  const lineChartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: t("revenue"),
        data: currentData.values,
        borderColor: "#e76f51",
        backgroundColor: (context: ScriptableContext<"line">) => {
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

  const lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"line">) =>
            t("revenueTooltip", {
              value: formatCurrency(Number(tooltipItem.raw), locale),
            }),
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#4b5563" } },
      y: {
        min: 0,
        max: yAxisMax,
        ticks: {
          stepSize: yAxisStep,
          color: "#4b5563",
          callback: (tickValue: string | number) =>
            formatCurrency(Number(tickValue), locale),
        },
        grid: { color: "#e5e7eb" },
      },
    },
  };

  const totalStatus = statusSplit.reduce((s, x) => s + x.value, 0) || 1;
  const doughnutChartData = {
    labels: statusSplit.map((x) => x.label),
    datasets: [
      {
        data: statusSplit.map((x) => Math.round((x.value / totalStatus) * 100)),
        backgroundColor: ["#059669", "#2563eb", "#d97706", "#dc2626"],
        hoverBackgroundColor: ["#047857", "#1d4ed8", "#b45309", "#b91c1c"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: { position: "bottom", labels: { color: "#4b5563" } },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"doughnut">) =>
            `${tooltipItem.label}: ${tooltipItem.formattedValue}%`,
        },
      },
    },
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
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
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
      <div className="rounded-lg border border-gray-100 shadow-sm bg-white p-6">
        <h2 className="text-sm font-medium text-gray-900">{t("statusTitle")}</h2>
        <div className="mt-4 h-64">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
      </div>
    </div>
  );
}