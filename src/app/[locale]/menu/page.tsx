import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import MenuBrowser from "@/components/menu/MenuBrowser";
import { fetchPublicCatalog } from "@/lib/data/public";

export default async function MenuPage() {
  const locale = await getLocale();
  const [t, { items, stands }] = await Promise.all([
    getTranslations("menu"),
    fetchPublicCatalog(locale),
  ]);

  return (
    <div className="w-full bg-white min-h-screen pb-16">
      <Suspense fallback={<div className="py-12 text-center">{t("loading")}</div>}>
        <MenuBrowser items={items} stands={stands} />
      </Suspense>
    </div>
  );
}
