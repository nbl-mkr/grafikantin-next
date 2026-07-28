"use client";

import HeroSection from "@/components/home/HeroSection";
import PopularMenu, { PopularMenuItem } from "@/components/home/PopularMenu";
import PromoBanner from "@/components/home/PromoBanner";
import { mockPopularFoods } from "@/data/mockData";

export default function Home() {
  const handleSelectPopularMenu = (item: PopularMenuItem) => {
    console.log("Membuka modal untuk menu:", item.nama_menu);
  };

  return (
    <>
      <HeroSection />
      <PromoBanner />
      <PopularMenu
        items={mockPopularFoods}
        onSelect={handleSelectPopularMenu}
      />
    </>
  );
}