"use client";

import { useTranslations } from "next-intl";
import type { ChartMonthRange, ChartTimeframe } from "@/lib/data/aggregate";

interface ChartPeriodFilterProps {
  timeframe: ChartTimeframe;
  onTimeframeChange: (timeframe: ChartTimeframe) => void;
  monthRange: ChartMonthRange;
  onMonthRangeChange: (range: ChartMonthRange) => void;
}

export default function ChartPeriodFilter({
  timeframe,
  onTimeframeChange,
  monthRange,
  onMonthRangeChange,
}: ChartPeriodFilterProps) {
  const t = useTranslations("dashboard.chartFilter");
  const isMonthly = timeframe === "monthly";

  return (
    <div className="inline-flex max-w-full items-center gap-1">
      <div
        role="group"
        aria-label={t("timeframe")}
        className="inline-flex rounded-md border border-gray-200 p-0.5 text-xs font-medium"
      >
        {(["daily", "weekly", "monthly"] as const).map((range) => (
          <button
            key={range}
            type="button"
            aria-pressed={timeframe === range}
            onClick={() => onTimeframeChange(range)}
            className={`rounded-sm px-2 py-1 transition-colors ${
              timeframe === range
                ? "bg-gray-100 text-gray-900 font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t(range)}
          </button>
        ))}
      </div>
      <div
        aria-hidden={!isMonthly}
        className={`grid overflow-hidden transition-[grid-template-columns,opacity,transform,margin] duration-200 ease-out motion-reduce:transition-none ${
          isMonthly
            ? "ml-1 grid-cols-[1fr] translate-x-0 opacity-100"
            : "pointer-events-none grid-cols-[0fr] -translate-x-1 opacity-0"
        }`}
      >
        <div className="min-w-0">
          <div
            role="group"
            aria-label={t("monthRange")}
            className="inline-flex whitespace-nowrap rounded-md border border-gray-200 p-0.5 text-xs font-medium"
          >
            {(["6m", "12m"] as const).map((range) => (
              <button
                key={range}
                type="button"
                disabled={!isMonthly}
                aria-pressed={monthRange === range}
                onClick={() => onMonthRangeChange(range)}
                className={`rounded-sm px-2 py-1 transition-colors ${
                  monthRange === range
                    ? "bg-gray-100 text-gray-900 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {t(range === "6m" ? "range6m" : "range12m")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
