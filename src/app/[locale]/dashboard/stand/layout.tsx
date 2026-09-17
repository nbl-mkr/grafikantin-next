import { redirect } from "next/navigation";
import { getProfile } from "@/lib/supabase/session";
import StandProviderWrapper from "@/components/dashboard/stand/StandProviderWrapper";
import { getStandsView } from "@/lib/data/views";

export default async function DashboardStandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  if (!profile) redirect("/auth/login");

  const stands = await getStandsView();

  return <StandProviderWrapper initialStands={stands}>{children}</StandProviderWrapper>;
}
