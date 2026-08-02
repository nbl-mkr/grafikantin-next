import HeroSection from "@/components/order/HeroSection";
import OrderInformation from "@/components/order/OrderInformation";
import StandCards from "@/components/order/StandCards";
import { mockStands } from "@/data/mockData";

export default function Order() {
  return (
    <>
      <HeroSection />
      <StandCards stands={mockStands} />
      <OrderInformation />
    </>
  );
}