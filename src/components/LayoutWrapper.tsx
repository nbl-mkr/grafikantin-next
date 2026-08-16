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
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={`grow flex flex-col ${isAdmin ? "" : "bg-[#fafafa]"}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}