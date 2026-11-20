import {
  ManagedServicesScope,
  OnboardingManagedServiceComparison,
  OnboardingPossibleServiceAreas,
  OnboardingScopeBoundaries,
  ManagedSharedResponsibility,
  ManagedHowItWouldRun,
  ManagedDueDiligenceChecklist,
  ManagedLifecycle,
  ManagedScopeReviewWizard,
  ManagedServicesQuestions,
  ManagedMoreBusinessServices,
} from "./components";

export default function ManagedServicesPage() {
  return (
    <main>
      <ManagedServicesScope />
      <OnboardingManagedServiceComparison />
      <OnboardingPossibleServiceAreas />
      <OnboardingScopeBoundaries />
      <ManagedSharedResponsibility />
      <ManagedHowItWouldRun />
      <ManagedDueDiligenceChecklist />
      <ManagedLifecycle />
      <ManagedScopeReviewWizard />
      <ManagedServicesQuestions />
      <ManagedMoreBusinessServices />
    </main>
  );
}
