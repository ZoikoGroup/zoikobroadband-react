import {
  SwitchBroadbandHero,
  SwitchCheckAddressSection,
  SwitchHowItWorksSection,
  SwitchBeforeYouSwitchChecklist,
  SwitchPlansAvailableSection,
  SwitchPhoneAndDevicesSection,
  SwitchSetupAndDatesSection,
  SwitchOtherSituationsSection,
  SwitchBroadbandFAQs,
  SwitchRelatedPages,
  SwitchCheckAvailabilityBanner,
} from "./components";

export default function SwitchToZoikoPage() {
  return (
    <main>
      <SwitchBroadbandHero />
      <SwitchCheckAddressSection />
      <SwitchHowItWorksSection />
      <SwitchBeforeYouSwitchChecklist />
      <SwitchPlansAvailableSection />
      <SwitchPhoneAndDevicesSection />
      <SwitchSetupAndDatesSection />
      <SwitchOtherSituationsSection />
      <SwitchBroadbandFAQs />
      <SwitchRelatedPages />
      <SwitchCheckAvailabilityBanner />
    </main>
  );
}
