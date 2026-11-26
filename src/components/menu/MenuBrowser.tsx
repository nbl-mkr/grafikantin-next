"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import HeroSection from "@/components/menu/HeroSection";
import MenuSection from "@/components/menu/MenuSection";
import type { MenuItem } from "@/components/menu/MenuCard";
import type { PublicMenuItem, PublicStand } from "@/lib/data/public";

interface MenuBrowserProps {
  items: PublicMenuItem[];
  stands: PublicStand[];
}

export default function MenuBrowser({ items, stands }: MenuBrowserProps) {
  const t = useTranslations("menu");
  const searchParams = useSearchParams();
  const standId = searchParams.get("stand_id");

  const currentStand = useMemo(() => {
    if (!standId) return undefined;
    return stands.find((s) => String(s.id) === String(standId));
  }, [standId, stands]);

  const filtered = useMemo(() => {
    if (!currentStand) return items;
    return items.filter((i) => String(i.stand_id) === String(currentStand.id));
  }, [items, currentStand]);

  const categoryGroups = useMemo(() => {
    const groups = new Map<
      string,
      { id: string; label: string; items: PublicMenuItem[]; sortId: number }
    >();

    for (const item of filtered) {
      const key = `id:${item.kategori_id}`;
      const id = `menu-category-${item.kategori_id}`;
      const group = groups.get(key);
      if (group) {
        group.items.push(item);
      } else {
        groups.set(key, {
          id,
          label: item.kategori,
          items: [item],
          sortId: item.kategori_id,
        });
      }
    }

    return [...groups.values()].sort((a, b) => a.sortId - b.sortId);
  }, [filtered]);

  const handleSelectItem = (item: MenuItem, category: string) => {
    console.log("Item dipilih:", item.nama_menu, "Kategori:", category);
  };

  return (
    <>
      <HeroSection
        stand={currentStand}
        categories={categoryGroups.map(({ id, label }) => ({ id, label }))}
      />

      <main className="w-full mx-auto">
        {categoryGroups.map((group) => (
          <MenuSection
            key={group.id}
            id={group.id}
            title={group.label}
            items={group.items}
            category={group.label}
            emptyMessage={t("categoryEmpty")}
            onSelectItem={handleSelectItem}
          />
        ))}
      </main>
    </>
  );
}
