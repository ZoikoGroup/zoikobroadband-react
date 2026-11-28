import {
  InstallationAndSetupHero,
  InstallationSetupNavAndAlert,
  WhatKindOfSetup,
  PrepareSafetyCheckSection,
  HowYourSetupHappens,
  VerifyItsWorkingSection,
  TroubleshootingAndRecovery,
  SetupAssistedSupport,
  InstallationSetupFaqSection,
  SetupRelatedGuides,
  SetupDigitalVoiceSafelyCta,
} from "./components";

export default function InstallationSetupPage() {
  return (
    <main>
      <InstallationAndSetupHero />
      <InstallationSetupNavAndAlert />
      <WhatKindOfSetup />
      <PrepareSafetyCheckSection />
      <HowYourSetupHappens />
      <VerifyItsWorkingSection />
      <TroubleshootingAndRecovery />
      <SetupAssistedSupport />
      <InstallationSetupFaqSection />
      <SetupRelatedGuides />
      <SetupDigitalVoiceSafelyCta />
    </main>
  );
}
