import Header from "@/components/admin/Header";
import TabNav from "@/components/admin/TabNav";
import StatCard from "@/components/admin/StatCard";
import ChartSection from "@/components/admin/ChartSection";
import BottomSection from "@/components/admin/BottomSection";
import { adminStats } from "@/data/adminMockData";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <div className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0">
        <TabNav />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {adminStats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
        <ChartSection />
        <BottomSection />
      </div>
    </div>
  );
}