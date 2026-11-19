import {
  CloudPhoneHero,
  CloudStepNav,
  WhatIsCloudPhone,
  CloudCapabilities,
  CallFlowScenario,
  CloudDevices,
  CloudTeamRoles,
  CloudSafetyCheck,
  CloudQuoteBreakdown,
  CloudConsultationForm,
  CloudGettingStarted,
  CloudFaqSection,
  CloudSpecialistCta,
} from "./components";

export default function CloudPhoneSolutionsPage() {
  return (
    <main>
      <CloudPhoneHero />
      <CloudStepNav />
      <WhatIsCloudPhone />
      <CloudCapabilities />
      <CallFlowScenario />
      <CloudDevices />
      <CloudTeamRoles />
      <CloudSafetyCheck />
      <CloudQuoteBreakdown />
      <CloudConsultationForm />
      <CloudGettingStarted />
      <CloudFaqSection />
      <CloudSpecialistCta />
    </main>
  );
}
