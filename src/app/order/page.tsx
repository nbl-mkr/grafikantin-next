import HeroSection from "@/components/order/HeroSection";
import OrderFlow from "@/components/order/OrderFlow";
import StandCards from "@/components/order/StandCards";
import { mockStands } from "@/data/mockData";

export default function Order() {
  return (
    <>
      <HeroSection />
      <StandCards stands={mockStands} />
      <OrderFlow />
    </>
  );
}