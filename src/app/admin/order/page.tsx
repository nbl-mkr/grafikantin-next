import Header from "@/components/admin/Header";
import TabNav from "@/components/admin/TabNav";
import OrderTargetChart from "@/components/admin/order/OrderTargetChart";
import OrderTable from "@/components/admin/order/OrderTable";

export default function AdminOrdersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <div className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0 space-y-6">
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
    </div>
  );
}