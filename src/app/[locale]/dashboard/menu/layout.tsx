import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getProfile } from "@/lib/supabase/session";
import MenuProviderWrapper from "@/components/dashboard/menu/MenuProviderWrapper";
import { getMenusView } from "@/lib/data/views";

export default async function DashboardMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const profile = await getProfile();
  if (!profile) redirect(`/${locale}/auth/login`);

  const { menus, stands } = await getMenusView();

  return (
    <MenuProviderWrapper initialMenus={menus} initialStands={stands}>
      {children}
    </MenuProviderWrapper>
  );
}
