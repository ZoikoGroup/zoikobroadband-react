import {
  FullFibreHero,
  FullFibreAddress,
  FullFibrePlans,
  FullFibrePlanDetails,
  FullFibreComparePlans,
  FullFibreSpeeds,
  FullFibreInstallation,
  FullFibreComparisonTable,
  FullFibreSwitchingMoving,
  FullFibreFAQs,
  FullFibreRelatedPages,
  FullFibreCheckAvailabilityBanner,
} from "./components";

export default function FullFibrePage() {
  return (
    <main>
      <FullFibreHero />
      <FullFibreAddress />
      <FullFibrePlans />
      <FullFibrePlanDetails />
      <FullFibreComparePlans />
      <FullFibreSpeeds />
      <FullFibreInstallation />
      <FullFibreComparisonTable />
      <FullFibreSwitchingMoving />
      <FullFibreFAQs />
      <FullFibreRelatedPages />
      <FullFibreCheckAvailabilityBanner />
    </main>
  );
}
