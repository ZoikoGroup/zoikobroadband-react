import {
  EmergencyCallingGuidanceHero,
  Emergency999Banner,
  AccessibleEmergencyRoutes,
  PowerCutsAndOutagesSection,
  HowToStayReachableBackups,
  TelecareAlarmsWarningBanner,
  EmergencyLocationSection,
  HomeReadinessChecklist,
  BusinessReadinessChecklist,
  AssistedSupportAndFaults,
  EmergencyCallingFaqSection,
  EmergencyCallingRelatedGuides,
  EmergencyCallingPrepareNowCta,
} from "./components";

export default function EmergencyCallingGuidancePage() {
  return (
    <main>
      <EmergencyCallingGuidanceHero />
      <Emergency999Banner />
      <AccessibleEmergencyRoutes />
      <PowerCutsAndOutagesSection />
      <HowToStayReachableBackups />
      <TelecareAlarmsWarningBanner />
      <EmergencyLocationSection />
      <HomeReadinessChecklist />
      <BusinessReadinessChecklist />
      <AssistedSupportAndFaults />
      <EmergencyCallingFaqSection />
      <EmergencyCallingRelatedGuides />
      <EmergencyCallingPrepareNowCta />
    </main>
  );
}
