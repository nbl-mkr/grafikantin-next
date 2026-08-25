import TabNav from "@/components/admin/TabNav";
import StatCard from "@/components/admin/StatCard";
import ChartSection from "@/components/admin/ChartSection";
import BottomSection from "@/components/admin/BottomSection";
import { adminStats } from "@/data/adminMockData";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <TabNav />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {adminStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
      <ChartSection />
      <BottomSection />
    </div>
  );
}