import TabNav from "@/components/admin/TabNav";
import StandTable from "@/components/admin/stand/StandTable";

export default function AdminStandPage() {
  return (
    <div className="space-y-6">
      <TabNav />

      <StandTable />
    </div>
  );
}
