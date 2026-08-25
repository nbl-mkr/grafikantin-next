import TabNav from "@/components/admin/TabNav";
import OrderTargetChart from "@/components/admin/order/OrderTargetChart";
import OrderTable from "@/components/admin/order/OrderTable";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <TabNav />
        <button
          type="button"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Ekspor Pesanan
        </button>
      </div>

      <OrderTargetChart />
      <OrderTable />
    </div>
  );
}