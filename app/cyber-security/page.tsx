import {
  CyberSecurityHero,
  CyberExposureAreas,
  CyberProtectionOptions,
  SharedResponsibility,
  CyberPracticalGuidance,
  CyberStartingPoint,
  CyberSuspectedIncident,
  CyberEngagementPath,
  CyberDataPractices,
  CyberSecurityConsultationForm,
  CyberCommonQuestions,
} from "./components";

export default function CyberSecurityPage() {
  return (
    <main>
      <CyberSecurityHero />
      <CyberExposureAreas />
      <CyberProtectionOptions />
      <SharedResponsibility />
      <CyberPracticalGuidance />
      <CyberStartingPoint />
      <CyberSuspectedIncident />
      <CyberEngagementPath />
      <CyberDataPractices />
      <CyberSecurityConsultationForm />
      <CyberCommonQuestions />
    </main>
  );
}
