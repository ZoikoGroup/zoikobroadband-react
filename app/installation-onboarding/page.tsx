import {
  OnboardingHero,
  OnboardingSituationGuide,
  OnboardingInstallationSteps,
  OnboardingSiteReadiness,
  OnboardingBeforeVisit,
  OnboardingEquipmentSplit,
  OnboardingBusinessContinuity,
  OnboardingTrackInstallation,
  OnboardingActivationHandover,
  OnboardingIfSomethingChanges,
  OnboardingSitePrepQuestionnaire,
  OnboardingCharges,
  OnboardingInstallationQuestions,
  OnboardingRelatedServices,
} from "./components";

export default function InsBorPage() {
  return (
    <main>
      <OnboardingHero />
      <OnboardingSituationGuide />
      <OnboardingInstallationSteps />
      <OnboardingSiteReadiness />
      <OnboardingBeforeVisit />
      <OnboardingEquipmentSplit />
      <OnboardingBusinessContinuity />
      <OnboardingTrackInstallation />
      <OnboardingActivationHandover />
      <OnboardingIfSomethingChanges />
      <OnboardingSitePrepQuestionnaire />
      <OnboardingCharges />
      <OnboardingInstallationQuestions />
      <OnboardingRelatedServices />
    </main>
  );
}
