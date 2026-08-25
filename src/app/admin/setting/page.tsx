import TabNav from "@/components/admin/TabNav";
import SettingsForm from "@/components/admin/setting/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <TabNav />
      <SettingsForm />
    </div>
  );
}