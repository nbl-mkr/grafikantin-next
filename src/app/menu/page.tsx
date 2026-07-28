"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import HeroSection from "@/components/menu/HeroSection";
import MenuSection from "@/components/menu/MenuSection";
import { MenuItem } from "@/components/menu/MenuCard";
import { mockMakanan, mockCamilan, mockStands } from "@/data/mockData";

function MenuContent() {
  const searchParams = useSearchParams();
  const standId = searchParams.get("stand_id");

  const currentStand = useMemo(() => {
    if (!standId) return undefined;
    return mockStands.find(
      (stand) => String(stand.id).trim() === String(standId).trim()
    );
  }, [standId]);

  const handleSelectItem = (item: MenuItem, category: string) => {
    console.log("Item dipilih:", item.nama_menu, "Kategori:", category);
  };

  return (
    <>
      <HeroSection stand={currentStand} />

      <main className="max-w-[85vw] mx-auto">
        <MenuSection
          id="food-section"
          title="Makanan"
          items={mockMakanan}
          category="makanan"
          emptyMessage="Tidak ada menu makanan tersedia."
          onSelectItem={handleSelectItem}
        />

        <MenuSection
          id="snack-section"
          title="Camilan"
          items={mockCamilan}
          category="camilan"
          emptyMessage="Tidak ada menu camilan tersedia."
          onSelectItem={handleSelectItem}
        />
      </main>
    </>
  );
}

export default function MenuPage() {
  return (
    <div className="w-full bg-white min-h-screen pb-16">
      <Suspense fallback={<div className="py-12 text-center">Memuat menu...</div>}>
        <MenuContent />
      </Suspense>
    </div>
  );
}