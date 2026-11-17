import {
  MovingHomeHero,
  MovingHomeWhereYouAre,
  NewAddressPostcodeCheck,
  MovingExistingZoikoPlan,
  MovingTimelineSection,
  PhoneAndEssentialDevices,
  InstallationAndEquipmentNewHome,
  YourMovingChecklist,
  MovingHomeFAQs,
  MovingRelatedPages,
  CheckNewAddressBanner,
} from "./components";

export default function MovingHomeStepPage() {
  return (
    <main>
      <MovingHomeHero />
      <MovingHomeWhereYouAre />
      <NewAddressPostcodeCheck />
      <MovingExistingZoikoPlan />
      <MovingTimelineSection />
      <PhoneAndEssentialDevices />
      <InstallationAndEquipmentNewHome />
      <YourMovingChecklist />
      <MovingHomeFAQs />
      <MovingRelatedPages />
      <CheckNewAddressBanner />
    </main>
  );
}
