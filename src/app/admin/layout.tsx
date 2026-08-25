import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
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
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <Header />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}