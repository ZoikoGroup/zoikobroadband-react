import {
  HomeDigitalPhoneHero,
  HomeDigitalPhoneSafetyAndNav,
  HomeDigitalPhoneAvailabilityCheck,
  HomeDigitalPhonePlansSection,
  WhatYouGetSection,
  KeepingWhatYouHaveSection,
  StayingSafeAndReachableSection,
  GettingSetUpSection,
  AskAboutHomeDigitalPhoneForm,
  NoDialTonePowerBanner,
  HomeDigitalPhoneFaqSection,
  HomeDigitalPhoneRelatedGuides,
  CheckHomeDigitalPhoneCtaBanner,
} from "./components";

export default function HomeDigitalPhonePage() {
  return (
    <main>
      <HomeDigitalPhoneHero />
      <HomeDigitalPhoneSafetyAndNav />
      <HomeDigitalPhoneAvailabilityCheck />
      <HomeDigitalPhonePlansSection />
      <WhatYouGetSection />
      <KeepingWhatYouHaveSection />
      <StayingSafeAndReachableSection />
      <GettingSetUpSection />
      <AskAboutHomeDigitalPhoneForm />
      <NoDialTonePowerBanner />
      <HomeDigitalPhoneFaqSection />
      <HomeDigitalPhoneRelatedGuides />
      <CheckHomeDigitalPhoneCtaBanner />
    </main>
  );
}
