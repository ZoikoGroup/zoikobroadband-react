import {
  DigitalVoiceHero,
  DigitalVoiceNavAndSummary,
  DigitalVoicePathway,
  AnalogueVsDigitalComparison,
  DigitalVoiceEquipment,
  DigitalVoiceSetupSteps,
  DigitalVoiceCommonQuestions,
  DigitalVoicePowerAndEmergency,
  DigitalVoiceReadinessChecklist,
  DigitalVoiceTroubleshootingBanner,
  DigitalVoiceFaqSection,
  DigitalVoiceRelatedPages,
  DigitalVoiceGettingReadyCta,
} from "./components";

export default function HowDigitalVoiceWorks() {
  return (
    <main>
      <DigitalVoiceHero />
      <DigitalVoiceNavAndSummary />
      <DigitalVoicePathway />
      <AnalogueVsDigitalComparison />
      <DigitalVoiceEquipment />
      <DigitalVoiceSetupSteps />
      <DigitalVoiceCommonQuestions />
      <DigitalVoicePowerAndEmergency />
      <DigitalVoiceReadinessChecklist />
      <DigitalVoiceTroubleshootingBanner />
      <DigitalVoiceFaqSection />
      <DigitalVoiceRelatedPages />
      <DigitalVoiceGettingReadyCta />
    </main>
  );
}
