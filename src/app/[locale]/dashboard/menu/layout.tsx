import { redirect } from "next/navigation";
import { getProfile } from "@/lib/supabase/session";
import MenuProviderWrapper from "@/components/dashboard/menu/MenuProviderWrapper";
import { getMenusView } from "@/lib/data/views";

export default async function DashboardMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  if (!profile) redirect("/auth/login");

  const { menus, stands } = await getMenusView();

  return (
    <MenuProviderWrapper initialMenus={menus} initialStands={stands}>
      {children}
    </MenuProviderWrapper>
  );
}
