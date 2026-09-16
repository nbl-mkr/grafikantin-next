import { Suspense } from "react";
import MenuBrowser from "@/components/menu/MenuBrowser";
import { fetchPublicCatalog } from "@/lib/data/public";

export default async function MenuPage() {
  const { items, stands } = await fetchPublicCatalog();

  return (
    <div className="w-full bg-white min-h-screen pb-16">
      <Suspense fallback={<div className="py-12 text-center">Memuat menu...</div>}>
        <MenuBrowser items={items} stands={stands} />
      </Suspense>
    </div>
  );
}
