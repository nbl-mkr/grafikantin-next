import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import SettingsForm from "@/components/dashboard/setting/SettingsForm";
import { fotoUrl, getProfile } from "@/lib/supabase/session";

export default async function DashboardSettingPage() {
  const locale = await getLocale();
  const profile = await getProfile();
  if (!profile) redirect(`/${locale}/auth/login`);

  return (
    <SettingsForm
      initialFullName={profile.username}
      initialEmail={profile.email}
      initialPhotoProfile={fotoUrl(profile.foto)}
    />
  );
}