import {
  BusinessCallingFeaturesHero,
  BusinessFeaturesNavAndNotice,
  BusinessFeaturesByGoalSection,
  BusinessCallingFeaturesCatalogue,
  HowCallFeaturesAreChargedSection,
  DevicesAndServiceCompatibilitySection,
  VoiceAvailabilityAndEmergencyCallsBanner,
  CallerIdentityScreeningRecordingSection,
  RequestTailoredQuoteSection,
  BusinessCallingFeaturesFaqSection,
  BusinessCallingRelatedPages,
  BusinessCallingCtaBanner,
} from "./components";

export default function BusinessCallingFeaturesPage() {
  return (
    <main>
      <BusinessCallingFeaturesHero />
      <BusinessFeaturesNavAndNotice />
      <BusinessFeaturesByGoalSection />
      <BusinessCallingFeaturesCatalogue />
      <HowCallFeaturesAreChargedSection />
      <DevicesAndServiceCompatibilitySection />
      <VoiceAvailabilityAndEmergencyCallsBanner />
      <CallerIdentityScreeningRecordingSection />
      <RequestTailoredQuoteSection />
      <BusinessCallingFeaturesFaqSection />
      <BusinessCallingRelatedPages />
      <BusinessCallingCtaBanner />
    </main>
  );
}
