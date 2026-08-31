import TabNav from "@/components/admin/TabNav";
import MenuTable from "@/components/admin/menu/MenuTable";

export default function AdminMenuPage() {
  return (
    <div className="space-y-6">
      <TabNav />

      <MenuTable />
    </div>
  );
}
