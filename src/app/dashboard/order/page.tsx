import { redirect } from "next/navigation";
import OrderTargetChart from "@/components/dashboard/order/OrderTargetChart";
import OrderTable, { type OrderView } from "@/components/dashboard/order/OrderTable";
import { getDashboardContext } from "@/lib/data/context";
import { fetchOrders } from "@/lib/data/queries";
import { buildOrderCharts } from "@/lib/data/aggregate";

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function DashboardOrdersPage() {
  const ctx = await getDashboardContext();
  if (!ctx) redirect("/auth/login");

  const orders = await fetchOrders(ctx);

  const rows: OrderView[] = orders.map((o) => ({
    id: o.kode_transaksi,
    customer: o.user?.username ?? "Pengunjung",
    phone: "-",
    date: formatTanggal(o.created_at),
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
        <h1 className="text-xl font-bold text-gray-900">Pesanan</h1>
        <button
          type="button"
          className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43]"
        >
          Ekspor Pesanan
        </button>
      </div>

      <OrderTargetChart data={buildOrderCharts(orders)} />
      <OrderTable orders={rows} />
    </div>
  );
}
