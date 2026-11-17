import {
  SpeedHero,
  SpeedGuide,
  SpeedFinder,
  HowItWorks,
  HomeSetup,
  BroadbandFAQs,
  RelatedPages,
  CheckAvailabilityBanner,
} from "./components";

export default function WhichSpeedDoINeedPage() {
  return (
    <main>
      <SpeedHero />
      <SpeedGuide />
      <SpeedFinder />
      <HowItWorks />
      <HomeSetup />
      <BroadbandFAQs />
      <RelatedPages />
      <CheckAvailabilityBanner />
    </main>
  );
}
