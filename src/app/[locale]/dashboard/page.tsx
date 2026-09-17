import { redirect } from "next/navigation";
import StatCard from "@/components/dashboard/StatCard";
import ChartSection from "@/components/dashboard/ChartSection";
import BottomSection from "@/components/dashboard/BottomSection";
import { getDashboardContext } from "@/lib/data/context";
import { fetchOrders, fetchStands, fetchMenus } from "@/lib/data/queries";
import { buildStats, buildRevenueCharts } from "@/lib/data/aggregate";

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function DashboardDashboard() {
  const ctx = await getDashboardContext();
  if (!ctx) redirect("/auth/login");

  const [orders, stands, menus] = await Promise.all([
    fetchOrders(ctx, { limit: 500 }),
    fetchStands(),
    fetchMenus(ctx.role === "penjual" ? ctx.standId : null),
  ]);

  const stats = buildStats(orders, stands, menus);
  const revenueRanges = buildRevenueCharts(orders);

  const statusCount = (s: string) => orders.filter((o) => o.status === s).length;
  const statusSplit = [
    { label: "Selesai", value: statusCount("Selesai") },
    { label: "Diproses", value: statusCount("Diproses") },
    { label: "Menunggu", value: statusCount("Menunggu") },
    { label: "Dibatalkan", value: statusCount("Dibatalkan") },
  ].filter((x) => x.value > 0);

  const recentOrders = orders.map((o) => ({
    id: o.kode_transaksi,
    customer: o.user?.username ?? "Pengunjung",
    time: formatTanggal(o.created_at),
    createdAt: o.created_at,
    status: o.status,
    total: Number(o.total_harga),
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
      <ChartSection revenueRanges={revenueRanges} statusSplit={statusSplit} />
      <BottomSection recentOrders={recentOrders} />
    </div>
  );
}
