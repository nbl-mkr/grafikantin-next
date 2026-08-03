import HeroSection from "@/components/about/HeroSection";
import FrequentlyAskedQuestions from "@/components/about/FrequentlyAskedQuestions";
import ValueCards from "@/components/about/ValueCards";

export default function About() {
    return (
        <>
          <HeroSection />
          <ValueCards />
          <FrequentlyAskedQuestions />
        </>
    );
}