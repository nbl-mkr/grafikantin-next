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

  const makanan = filtered.filter((i) => i.kategori === "Makanan");
  const camilan = filtered.filter((i) => i.kategori !== "Makanan");

  const handleSelectItem = (item: MenuItem, category: string) => {
    console.log("Item dipilih:", item.nama_menu, "Kategori:", category);
  };

  return (
    <>
      <HeroSection stand={currentStand} />

      <main className="w-full mx-auto">
        <MenuSection
          id="food-section"
          title={t("foodTitle")}
          items={makanan}
          category="makanan"
          emptyMessage={t("foodEmpty")}
          onSelectItem={handleSelectItem}
        />

        <MenuSection
          id="snack-section"
          title={t("snackTitle")}
          items={camilan}
          category="camilan"
          emptyMessage={t("snackEmpty")}
          onSelectItem={handleSelectItem}
        />
      </main>
    </>
  );
}
