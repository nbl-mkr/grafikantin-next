import AdminShell from "@/components/admin/AdminShell";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin - Grafikantin",
  description: "Panel admin Grafikantin SMK Negeri 4 Malang",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
