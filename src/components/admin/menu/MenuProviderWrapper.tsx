"use client";

import { MenuProvider } from "@/components/admin/menu/MenuContext";

export default function MenuProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MenuProvider>{children}</MenuProvider>;
}
