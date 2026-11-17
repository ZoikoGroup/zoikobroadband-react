import {
  CompareBroadbandHero,
  CompareBroadbandAddress,
  CompareBroadbandPlans,
  CompareBroadbandReadingThePrice,
  CompareBroadbandSpeedTechnology,
  CompareBroadbandSetupSwitching,
  CompareBroadbandClearHonest,
  CompareBroadbandFAQs,
  CompareBroadbandRelatedPages,
  CompareBroadbandCheckAvailabilityBanner,
} from "./components";

export default function AllBroadbandDealsPage() {
  return (
    <main>
      <CompareBroadbandHero />
      <CompareBroadbandAddress />
      <CompareBroadbandPlans />
      <CompareBroadbandReadingThePrice />
      <CompareBroadbandSpeedTechnology />
      <CompareBroadbandSetupSwitching />
      <CompareBroadbandClearHonest />
      <CompareBroadbandFAQs />
      <CompareBroadbandRelatedPages />
      <CompareBroadbandCheckAvailabilityBanner />
    </main>
  );
}
