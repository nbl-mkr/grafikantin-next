import HeroSection from "@/components/home/HeroSection";
import PopularMenu from "@/components/home/PopularMenu";
import PromoBanner from "@/components/home/PromoBanner";
import { fetchPublicCatalog } from "@/lib/data/public";

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
