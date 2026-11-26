import MenuTable from "@/components/dashboard/menu/MenuTable";
import MenuCategoryManager from "@/components/dashboard/menu/MenuCategoryManager";

export default function DashboardMenuPage() {
  return (
    <div className="space-y-6">
      <MenuTable />
      <MenuCategoryManager />
    </div>
  );
}
