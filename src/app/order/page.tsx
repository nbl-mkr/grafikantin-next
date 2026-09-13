import HeroSection from "@/components/order/HeroSection";
import OrderInformation from "@/components/order/OrderInformation";
import StandCards from "@/components/order/StandCards";
import { fetchPublicCatalog } from "@/lib/data/public";

export default async function Order() {
  const { stands } = await fetchPublicCatalog();

  return (
    <>
      <HeroSection />
      <StandCards stands={stands} />
      <OrderInformation />
    </>
  );
}
