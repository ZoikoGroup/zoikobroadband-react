import {
  ComparePlansHero,
  CompareYourAddressSection,
  ComparePlansGrid,
  CompareReadingThePriceSection,
  CompareSpeedTech,
  CompareSetupSwitch,
  CompareFAQs,
  CompareRelatedPages,
  CompareCheckAvailabilityBanner,
} from "./components";

export default function ComparePlansPage() {
  return (
    <main>
      <ComparePlansHero />
      <CompareYourAddressSection />
      <ComparePlansGrid />
      <CompareReadingThePriceSection />
      <CompareSpeedTech />
      <CompareSetupSwitch />
      <CompareFAQs />
      <CompareRelatedPages />
      <CompareCheckAvailabilityBanner />
    </main>
  );
}
