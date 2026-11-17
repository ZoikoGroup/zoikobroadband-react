import {
  InstallationHero,
  ChooseConnectionPath,
  FourStepsOverview,
  HowInstallationWorks,
  SettingUpRouter,
  PreparingForEngineer,
  TroubleshootingSymptoms,
  InstallationFAQs,
  RelatedPages,
  CheckAddressBanner,
} from "./components";

export default function InstallationRoutersPage() {
  return (
    <main>
      <InstallationHero />
      <ChooseConnectionPath />
      <FourStepsOverview />
      <HowInstallationWorks />
      <SettingUpRouter />
      <PreparingForEngineer />
      <TroubleshootingSymptoms />
      <InstallationFAQs />
      <RelatedPages />
      <CheckAddressBanner />
    </main>
  );
}
