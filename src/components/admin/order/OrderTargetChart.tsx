"use client";

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
import { Chart } from "react-chartjs-2";
import { orderTargetData } from "@/data/adminMockData";

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

export default function OrderTargetChart() {
  const chartData = {
    labels: orderTargetData.map((d) => d.month),
    datasets: [
      {
        type: "line" as const,
        label: "Target",
        data: orderTargetData.map((d) => d.target),
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
        label: "Pesanan",
        data: orderTargetData.map((d) => d.orders),
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
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: "#4b5563" },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#4b5563" },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#e5e7eb" },
        ticks: { color: "#4b5563" },
      },
    },
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-medium text-gray-900">Pesanan vs Target Bulanan</h2>
      <div className="mt-4 h-64">
        <Chart type="bar" data={chartData} options={options} />
      </div>
    </div>
  );
}