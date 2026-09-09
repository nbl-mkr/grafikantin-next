import StandProviderWrapper from "@/components/admin/stand/StandProviderWrapper";

export default function AdminStandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StandProviderWrapper>{children}</StandProviderWrapper>;
}
