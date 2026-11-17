import {
  PartFibreHero,
  PartFibreAddress,
  PartFibrePlans,
  PartFibrePlanDetails,
  PartFibreComparisonTable,
  PartFibreSpeeds,
  PartFibreInstallation,
  PartFibrePhoneVoice,
  PartFibreFAQs,
  PartFibreRelatedPages,
  PartFibreCheckAvailabilityBanner,
} from "./components";

export default function PartFibrePage() {
  return (
    <main>
      <PartFibreHero />
      <PartFibreAddress />
      <PartFibrePlans />
      <PartFibrePlanDetails />
      <PartFibreComparisonTable />
      <PartFibreSpeeds />
      <PartFibreInstallation />
      <PartFibrePhoneVoice />
      <PartFibreFAQs />
      <PartFibreRelatedPages />
      <PartFibreCheckAvailabilityBanner />
    </main>
  );
}
