import { getProfile, fotoUrl } from "@/lib/supabase/session";
import SettingsForm from "@/components/dashboard/setting/SettingsForm";

export default async function SettingsPage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <SettingsForm
        initialFullName={profile?.username ?? ""}
        initialEmail={profile?.email ?? ""}
        initialPhotoProfile={fotoUrl(profile?.foto)}
      />
    </div>
  );
}
