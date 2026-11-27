import {
  RequestTailoredQuoteHero,
  RequestQuoteSubNav,
  RequestQuoteHowItWorksSection,
  GuidedQuoteRequestWizard,
  HowWeUseWhatYouShareSection,
  TailoredQuotesFaqSection,
  RequestQuoteRelatedPages,
  RequestTailoredQuoteCtaBanner,
} from "./components";

export default function RequestAqutoePage() {
  return (
    <main>
      <RequestTailoredQuoteHero />
      <RequestQuoteSubNav />
      <RequestQuoteHowItWorksSection />
      <GuidedQuoteRequestWizard />
      <HowWeUseWhatYouShareSection />
      <TailoredQuotesFaqSection />
      <RequestQuoteRelatedPages />
      <RequestTailoredQuoteCtaBanner />
    </main>
  );
}
