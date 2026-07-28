import HeroSection from "@/components/about/HeroSection";
import OperationalInformation from "@/components/about/OperationalInformation";
import ValueCards from "@/components/about/ValueCards";

export default function About() {
    return (
        <>
          <HeroSection />
          <ValueCards />
          <OperationalInformation />
        </>
    );
}