import {
  DigitalVoiceSwitchingHero,
  DigitalVoiceSwitchingNavAndAlert,
  TraditionalVsDigitalCalling,
  WhichKindOfMove,
  TimingNoticesAndScams,
  DigitalVoiceReadinessCheckWizard,
  DigitalVoiceWhatToExpect,
  DigitalVoiceAssistedSupport,
  DigitalVoiceSwitchingFaqSection,
  DigitalVoiceRelatedGuides,
  DigitalVoicePrepareSafelyCta,
} from "./components";

export default function HowDigitalVoiceWorksPage() {
  return (
    <main>
      <DigitalVoiceSwitchingHero />
      <DigitalVoiceSwitchingNavAndAlert />
      <TraditionalVsDigitalCalling />
      <WhichKindOfMove />
      <TimingNoticesAndScams />
      <DigitalVoiceReadinessCheckWizard />
      <DigitalVoiceWhatToExpect />
      <DigitalVoiceAssistedSupport />
      <DigitalVoiceSwitchingFaqSection />
      <DigitalVoiceRelatedGuides />
      <DigitalVoicePrepareSafelyCta />
    </main>
  );
}
