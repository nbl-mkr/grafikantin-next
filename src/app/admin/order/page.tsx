import TabNav from "@/components/admin/TabNav";
import OrderTargetChart from "@/components/admin/order/OrderTargetChart";
import OrderTable from "@/components/admin/order/OrderTable";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <TabNav />

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
      <OrderTable />
    </div>
  );
}