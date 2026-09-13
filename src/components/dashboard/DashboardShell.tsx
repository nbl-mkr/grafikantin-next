"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import type { Role } from "@/lib/roles";

export interface DashboardProfile {
  fullName: string;
  email: string;
  photoProfile: string;
}

export default function DashboardShell({
  role,
  profile,
  children,
}: {
  role: Role | null;
  profile: DashboardProfile;
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar
        role={role}
        profile={profile}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
