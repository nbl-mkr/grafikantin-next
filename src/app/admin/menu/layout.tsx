import MenuProviderWrapper from "@/components/admin/menu/MenuProviderWrapper";

export default function AdminMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MenuProviderWrapper>{children}</MenuProviderWrapper>;
}
