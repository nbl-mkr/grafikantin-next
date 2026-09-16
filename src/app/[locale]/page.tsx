import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import PopularMenu from "@/components/home/PopularMenu";
import PromoBanner from "@/components/home/PromoBanner";
import { fetchPublicCatalog } from "@/lib/data/public";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

export default async function Home() {
  const { popular } = await fetchPublicCatalog();

  return (
    <>
      <HeroSection />
      <PromoBanner />
      <PopularMenu items={popular} />
    </>
  );
}
