import {
  KeepYourPhoneNumberHero,
  NumberTransferNavAndNotice,
  HowPortingWorksSection,
  EligibilitySection,
  EmergencyCallsNotice,
  CheckTransferPathWizard,
  TimingAndCostsSection,
  KeepingYourNumberAnsweredSection,
  RelatedPagesSection,
  PlanHowToKeepYourNumberBanner,
} from "./components";

export default function KeepYourNumberPage() {
  return (
    <main>
      <KeepYourPhoneNumberHero />
      <NumberTransferNavAndNotice />
      <HowPortingWorksSection />
      <EligibilitySection />
      <EmergencyCallsNotice />
      <CheckTransferPathWizard />
      <TimingAndCostsSection />
      <KeepingYourNumberAnsweredSection />
      <RelatedPagesSection />
      <PlanHowToKeepYourNumberBanner />
    </main>
  );
}
