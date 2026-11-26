"use client";

import { MenuProvider } from "@/components/dashboard/menu/MenuContext";
import type { MenuView } from "@/lib/data/views";
import type { MenuCategoryRow } from "@/lib/data/types";

export default function MenuProviderWrapper({
  children,
  initialMenus,
  initialStands,
  initialCategories,
  canManageCategories,
}: {
  children: React.ReactNode;
  initialMenus: MenuView[];
  initialStands: { id: number; nama: string }[];
  initialCategories: MenuCategoryRow[];
  canManageCategories: boolean;
}) {
  return (
    <MenuProvider
      initialMenus={initialMenus}
      initialStands={initialStands}
      initialCategories={initialCategories}
      canManageCategories={canManageCategories}
    >
      {children}
    </MenuProvider>
  );
}
