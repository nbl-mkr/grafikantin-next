import { redirect } from "next/navigation";
import OrderTargetChart from "@/components/dashboard/order/OrderTargetChart";
import OrderTable from "@/components/dashboard/order/OrderTable";
import { getDashboardContext } from "@/lib/data/context";
import { fetchOrders } from "@/lib/data/queries";

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

  const rows = orders.map((o) => ({
    id: o.kode_transaksi,
    customer: o.user?.username ?? "Pengunjung",
    date: formatTanggal(o.created_at),
    status: o.status,
    amount: Number(o.total_harga),
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

      <OrderTargetChart />
      <OrderTable orders={rows} />
    </div>
  );
}
