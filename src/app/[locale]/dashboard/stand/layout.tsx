import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getProfile } from "@/lib/supabase/session";
import StandProviderWrapper from "@/components/dashboard/stand/StandProviderWrapper";
import { getStandsView } from "@/lib/data/views";

export default async function DashboardStandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const profile = await getProfile();
  if (!profile) redirect(`/${locale}/auth/login`);

  const stands = await getStandsView();

  return <StandProviderWrapper initialStands={stands}>{children}</StandProviderWrapper>;
}
