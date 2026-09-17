import { getProfile, fotoUrl } from "@/lib/supabase/session";
import DashboardShell from "@/components/dashboard/DashboardShell";
import type { Metadata, Viewport } from "next";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard.meta" });
  return { title: t("title"), description: t("description") };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <DashboardShell
      role={profile?.role ?? null}
      profile={{
        fullName: profile?.username ?? "",
        email: profile?.email ?? "",
        photoProfile: fotoUrl(profile?.foto),
      }}
    >
      {children}
    </DashboardShell>
  );
}
