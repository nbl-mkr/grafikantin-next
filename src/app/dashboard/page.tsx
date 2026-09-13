import { redirect } from "next/navigation";
import StatCard from "@/components/dashboard/StatCard";
import ChartSection from "@/components/dashboard/ChartSection";
import BottomSection from "@/components/dashboard/BottomSection";
import { getDashboardContext } from "@/lib/data/context";
import { fetchOrders, fetchStands, fetchMenus } from "@/lib/data/queries";
import { buildStats, buildRevenueCharts, buildStandStatuses, buildTopMenus } from "@/lib/data/aggregate";

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
  const topMenus = buildTopMenus(orders, menus);
  const standStatuses = buildStandStatuses(stands, orders);

  const statusCount = (s: string) => orders.filter((o) => o.status === s).length;
  const statusSplit = [
    { label: "Selesai", value: statusCount("Selesai") },
    { label: "Diproses", value: statusCount("Diproses") },
    { label: "Menunggu", value: statusCount("Menunggu") },
    { label: "Dibatalkan", value: statusCount("Dibatalkan") },
  ].filter((x) => x.value > 0);

  const recentOrders = orders.slice(0, 8).map((o) => ({
    id: o.kode_transaksi,
    customer: o.user?.username ?? "Pengunjung",
    time: formatTanggal(o.created_at),
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-medium text-gray-900">Menu Terlaris</h2>
          <ul className="mt-4 space-y-3">
            {topMenus.map((m, i) => (
              <li key={m.id} className="flex items-center gap-3">
                <span className="w-5 text-sm font-semibold text-gray-400">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{m.nama_menu}</p>
                  <p className="truncate text-xs text-gray-500">{m.stand}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">{m.terjual} terjual</span>
              </li>
            ))}
            {topMenus.length === 0 && (
              <li className="text-sm text-gray-500">Belum ada penjualan.</li>
            )}
          </ul>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-medium text-gray-900">Status Stand</h2>
          <ul className="mt-4 space-y-3">
            {standStatuses.map((s) => (
              <li key={s.id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900">{s.nama_stand}</span>
                <span className="flex items-center gap-3">
                  <span className="text-gray-500">{s.terjual} terjual</span>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      s.status === "Buka" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </span>
              </li>
            ))}
            {standStatuses.length === 0 && (
              <li className="text-sm text-gray-500">Belum ada stand.</li>
            )}
          </ul>
        </div>
      </div>
      <BottomSection recentOrders={recentOrders} />
    </div>
  );
}
