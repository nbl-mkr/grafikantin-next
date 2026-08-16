import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Dashboard Admin - Grafikantin",
  description: "Panel admin Grafikantin SMK Negeri 4 Malang",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        {children}
      </div>
    </div>
  );
}