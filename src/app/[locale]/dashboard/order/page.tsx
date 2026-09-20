import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import OrderTargetChart from "@/components/dashboard/order/OrderTargetChart";
import OrderExportButton from "@/components/dashboard/order/OrderExportButton";
import OrderTable, { type OrderView } from "@/components/dashboard/order/OrderTable";
import { getDashboardContext } from "@/lib/data/context";
import { fetchChartOrders, fetchOrders } from "@/lib/data/queries";
import { buildOrderCharts } from "@/lib/data/aggregate";

function formatTanggal(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function DashboardOrdersPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "dashboard.orders" });
  const ctx = await getDashboardContext();
  if (!ctx) redirect(`/${locale}/auth/login`);

  const since30Days = new Date();
  since30Days.setDate(since30Days.getDate() - 30);
  const [orders, tableOrders] = await Promise.all([
    fetchChartOrders(ctx),
    fetchOrders(ctx, { since: since30Days, limit: 50 }),
  ]);
  const visitorLabel = locale === "en" ? "Visitor" : "Pengunjung";
  const rows: OrderView[] = tableOrders.map((o) => ({
    id: o.kode_transaksi,
    customer: o.user?.username ?? visitorLabel,
    phone: "-",
    date: formatTanggal(o.created_at, locale),
    createdAt: o.created_at,
    status: o.status,
    stand: o.stand?.nama_stand ?? "-",
    menu: o.menu?.nama ?? "-",
    jumlah: o.jumlah,
    metode: o.metode_pembayaran ?? "-",
    total: Number(o.total_harga),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">{t("title")}</h1>
        <OrderExportButton orders={rows} />
      </div>
      <OrderTargetChart data={buildOrderCharts(orders, locale)} />
      <OrderTable orders={rows} />
    </div>
  );
}