import {
  BroadbandQuoteHero,
  BusinessServicesStepNav,
  ThreeSimpleStages,
  UsefulToHaveReady,
  QuoteRequestWizard,
  WhatShapesYourQuote,
  QuoteFaqSection,
  KeepExploringSection,
} from "./components";

export default function RequestPage() {
  return (
    <main>
      <BroadbandQuoteHero />
      <BusinessServicesStepNav />
      <ThreeSimpleStages />
      <UsefulToHaveReady />
      <QuoteRequestWizard />
      <WhatShapesYourQuote />
      <QuoteFaqSection />
      <KeepExploringSection />
    </main>
  );
}
