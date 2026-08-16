"use client";

import { useMemo } from "react";
import { SalesData } from "@/data/adminMockData";

interface ChartSectionProps {
  lineData: SalesData[];
  barData: SalesData[];
}

export default function ChartSection({ lineData, barData }: ChartSectionProps) {
  const lineMax = useMemo(() => Math.max(...lineData.map((d) => d.amount)), [lineData]);
  const barMax = useMemo(() => Math.max(...barData.map((d) => d.amount)), [barData]);

  const linePoints = lineData.map((d, i) => {
    const x = (i / (lineData.length - 1)) * 100;
    const y = 100 - (d.amount / lineMax) * 80;
    return `${x},${y}`;
  }).join(" ");

  const linePointsDashed = lineData.map((d, i) => {
    const x = (i / (lineData.length - 1)) * 100;
    const y = 100 - (d.amount / lineMax) * 60;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Penjualan</p>
            <p className="mt-1 text-xl font-extrabold text-gray-900">Rp 5.350.000</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600">
            <span>7 Hari</span>
            <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="relative h-56 w-full">
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            {[0, 20, 40, 60, 80].map((y) => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f1f5f9" strokeWidth="0.5" />
            ))}
            <polyline
              points={linePointsDashed}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="0.8"
              strokeDasharray="2,2"
            />
            <polyline
              points={linePoints}
              fill="none"
              stroke="#e76f51"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {lineData.map((d, i) => {
              const x = (i / (lineData.length - 1)) * 100;
              const y = 100 - (d.amount / lineMax) * 80;
              return (
                <circle key={i} cx={x} cy={y} r="1.5" fill="#e76f51" />
              );
            })}
          </svg>
        </div>
        <div className="mt-2 flex justify-between text-xs font-medium text-gray-400">
          {lineData.map((d, i) => (
            <span key={i}>{d.day}</span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Penjualan per Stand</p>
            <p className="mt-1 text-xl font-extrabold text-gray-900">Rp 1.510.000</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600">
            <span>Minggu Ini</span>
            <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="flex items-end justify-between gap-3 h-56">
          {barData.map((item, i) => {
            const height = (item.amount / barMax) * 100;
            const isHighest = item.amount === barMax;
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative w-full flex justify-center items-end h-full">
                  <div
                    className={`w-full max-w-8 rounded-t-lg transition-all ${
                      isHighest ? "bg-[#e76f51]" : "bg-[#e76f51]/15 hover:bg-[#e76f51]/25"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-gray-400">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}