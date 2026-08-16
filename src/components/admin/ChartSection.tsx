"use client";

import { useMemo } from "react";
import { SalesData } from "@/data/adminMockData";

interface ChartSectionProps {
  lineData: SalesData[];
  barData: SalesData[];
}

function formatCompact(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}jt`.replace(".0jt", "jt");
  if (value >= 1000) return `${(value / 1000).toFixed(0)}rb`;
  return `${value}`;
}

export default function ChartSection({ lineData, barData }: ChartSectionProps) {
  const lineMax = useMemo(() => Math.max(...lineData.map((d) => d.amount)), [lineData]);
  const barMax = useMemo(() => Math.max(...barData.map((d) => d.amount)), [barData]);

  const lineSteps = 4;
  const lineStepValue = Math.ceil(lineMax / lineSteps / 100000) * 100000;
  const lineCeiling = lineStepValue * lineSteps;

  const barSteps = 4;
  const barStepValue = Math.ceil(barMax / barSteps / 100000) * 100000;
  const barCeiling = barStepValue * barSteps;

  const dashedData = useMemo(
    () => lineData.map((d) => ({ ...d, amount: d.amount * 0.65 })),
    [lineData]
  );

  const svgW = 640;
  const svgH = 260;
  const padL = 56;
  const padR = 16;
  const padT = 16;
  const padB = 32;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const getX = (i: number, len: number) => padL + (i / (len - 1)) * chartW;
  const getY = (val: number, ceiling: number) => padT + chartH - (val / ceiling) * chartH;

  const linePoints = lineData.map((d, i) => `${getX(i, lineData.length)},${getY(d.amount, lineCeiling)}`).join(" ");
  const dashedPoints = dashedData.map((d, i) => `${getX(i, dashedData.length)},${getY(d.amount, lineCeiling)}`).join(" ");
  const areaPath = `${linePoints.split(" ")[0]} L ${linePoints} L ${getX(lineData.length - 1, lineData.length)},${padT + chartH} L ${padL},${padT + chartH} Z`;

  const barGap = 24;
  const barW = (chartW - barGap * (barData.length - 1)) / barData.length;

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Transaksi</p>
            <p className="mt-1 text-2xl font-extrabold text-gray-900 tracking-tight">Rp 5.450.000</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-50 transition">
            <span>7 Hari Terakhir</span>
            <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="mt-6 h-64 w-full">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="areaOrange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e76f51" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#e76f51" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0, 1, 2, 3, 4].map((i) => {
              const y = padT + chartH - (i / 4) * chartH;
              const val = i * lineStepValue;
              return (
                <g key={i}>
                  <line x1={padL} y1={y} x2={padL + chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                  <text x={padL - 10} y={y + 4} textAnchor="end" className="fill-gray-400 text-[10px] font-medium">
                    {formatCompact(val)}
                  </text>
                </g>
              );
            })}

            <path d={areaPath} fill="url(#areaOrange)" />

            <polyline
              points={dashedPoints}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <polyline
              points={linePoints}
              fill="none"
              stroke="#e76f51"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {lineData.map((d, i) => {
              const cx = getX(i, lineData.length);
              const cy = getY(d.amount, lineCeiling);
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="5" fill="white" stroke="#e76f51" strokeWidth="2.5" />
                  <text x={cx} y={padT + chartH + 20} textAnchor="middle" className="fill-gray-400 text-[10px] font-medium">
                    {d.day}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Pendapatan per Stand</p>
            <p className="mt-1 text-2xl font-extrabold text-gray-900 tracking-tight">Rp 1.500.000</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-50 transition">
            <span>Minggu Ini</span>
            <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="mt-6 h-64 w-full">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="h-full w-full overflow-visible">
            {[0, 1, 2, 3, 4].map((i) => {
              const y = padT + chartH - (i / 4) * chartH;
              const val = i * barStepValue;
              return (
                <g key={i}>
                  <line x1={padL} y1={y} x2={padL + chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                  <text x={padL - 10} y={y + 4} textAnchor="end" className="fill-gray-400 text-[10px] font-medium">
                    {formatCompact(val)}
                  </text>
                </g>
              );
            })}

            {barData.map((d, i) => {
              const x = padL + i * (barW + barGap);
              const h = (d.amount / barCeiling) * chartH;
              const y = padT + chartH - h;
              const isMax = d.amount === barMax;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={h}
                    rx="4"
                    ry="4"
                    fill={isMax ? "#e76f51" : "#f1f5f9"}
                  />
                  <text x={x + barW / 2} y={padT + chartH + 20} textAnchor="middle" className="fill-gray-400 text-[10px] font-medium">
                    {d.day}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}