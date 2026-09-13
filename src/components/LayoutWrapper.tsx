"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className={`grow flex flex-col ${isDashboard ? "" : "bg-[#fafafa]"}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}