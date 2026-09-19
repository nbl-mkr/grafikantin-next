import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import StatCard from "@/components/dashboard/StatCard";
import ChartSection from "@/components/dashboard/ChartSection";
import BottomSection from "@/components/dashboard/BottomSection";
import { getDashboardContext } from "@/lib/data/context";
import { fetchOrders, fetchStands, fetchMenus } from "@/lib/data/queries";
import { buildStats, buildRevenueCharts } from "@/lib/data/aggregate";

function formatTanggal(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function DashboardDashboard() {
  const locale = await getLocale();
  const tOverview = await getTranslations({ locale, namespace: "dashboard.overview" });
  const tEnum = await getTranslations({ locale, namespace: "dashboard.enums.orderStatus" });
  const ctx = await getDashboardContext();
  if (!ctx) redirect(`/${locale}/auth/login`);

  const since = new Date();
  since.setDate(1);
  since.setMonth(since.getMonth() - 11);
  const recentSince = new Date();
  recentSince.setDate(recentSince.getDate() - 30);

  const [orders, recentOrdersData, stands, menus] = await Promise.all([
    fetchOrders(ctx, { since }),
    fetchOrders(ctx, { since: recentSince }),
    fetchStands(),
    fetchMenus(ctx.role === "penjual" ? ctx.standId : null),
  ]);

  const stats = buildStats(orders, stands, menus, locale);
  const revenueRanges = buildRevenueCharts(orders, locale);

  const statusCount = (s: string) => orders.filter((o) => o.status === s).length;
  const statusSplit = [
    { label: tEnum("Selesai"), value: statusCount("Selesai") },
    { label: tEnum("Diproses"), value: statusCount("Diproses") },
    { label: tEnum("Menunggu"), value: statusCount("Menunggu") },
    { label: tEnum("Dibatalkan"), value: statusCount("Dibatalkan") },
  ];

  const visitorLabel = locale === "en" ? "Visitor" : "Pengunjung";
  const recentOrders = recentOrdersData.map((o) => ({
    id: o.kode_transaksi,
    customer: o.user?.username ?? visitorLabel,
    time: formatTanggal(o.created_at, locale),
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