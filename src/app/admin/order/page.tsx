import Header from "@/components/admin/Header";
import TabNav from "@/components/admin/TabNav";
import OrderStat from "@/components/admin/order/OrderStat";
import OrderTable from "@/components/admin/order/OrderTable";
import { recentOrders } from "@/data/adminMockData";

export default function OrderPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <div className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0">
        <TabNav />
        <div className="mt-6 space-y-6">
          <OrderStat />
          <OrderTable orders={recentOrders} />
        </div>
      </div>
    </div>
  );
}