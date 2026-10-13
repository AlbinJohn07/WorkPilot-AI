import Hero from '../../components/landing/Hero.jsx';
import { ValueSection, FeaturesSection, AISection, HowItWorksSection, ShowcaseSection, SolutionsSection, SecuritySection, PricingSection, FAQSection, FinalCTA } from '../../components/landing/Sections.jsx';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ValueSection />
      <FeaturesSection />
      <AISection />
      <HowItWorksSection />
      <ShowcaseSection />
      <SolutionsSection />
      <SecuritySection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
