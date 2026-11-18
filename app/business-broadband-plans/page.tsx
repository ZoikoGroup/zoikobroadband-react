import {
  BusinessBroadbandHero,
  BusinessBroadbandFeaturesGrid,
  BusinessProfileSelector,
  BusinessBroadbandPlans,
  PlanComparisonTable,
  ConnectionTypeSection,
  NetworkOptionsSection,
  InstallationSwitchingSection,
  TailoredQuoteSection,
  FaqSection,
} from "./components";

export default function BusinessBroadbandPlansPage() {
  return (
    <main>
      <BusinessBroadbandHero />
      <BusinessBroadbandFeaturesGrid />
      <BusinessProfileSelector />
      <BusinessBroadbandPlans />
      <PlanComparisonTable />
      <ConnectionTypeSection />
      <NetworkOptionsSection />
      <InstallationSwitchingSection />
      <TailoredQuoteSection />
      <FaqSection />
    </main>
  );
}
