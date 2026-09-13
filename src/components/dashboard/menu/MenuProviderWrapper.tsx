"use client";

import { MenuProvider } from "@/components/dashboard/menu/MenuContext";
import type { MenuView } from "@/lib/data/views";

export default function MenuProviderWrapper({
  children,
  initialMenus,
  initialStands,
}: {
  children: React.ReactNode;
  initialMenus: MenuView[];
  initialStands: { id: number; nama: string }[];
}) {
  return (
    <MenuProvider initialMenus={initialMenus} initialStands={initialStands}>
      {children}
    </MenuProvider>
  );
}
