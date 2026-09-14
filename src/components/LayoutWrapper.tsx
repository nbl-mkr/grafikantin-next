"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
  initialUser: { id: string; email?: string | null } | null;
  initialPhoto: string | null;
}

export default function LayoutWrapper({
  children,
  initialUser,
  initialPhoto,
}: LayoutWrapperProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && (
        <Navbar initialUser={initialUser} initialPhoto={initialPhoto} />
      )}
      <main className={`grow flex flex-col ${isDashboard ? "" : "bg-[#fafafa]"}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}
