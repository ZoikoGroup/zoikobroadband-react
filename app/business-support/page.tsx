import {
  BusinessSupportSLAs,
  SupportServiceStatus,
  SupportSafeSelfChecks,
  SupportReportFaultWizard,
  SupportYourCases,
  SupportServiceLevelsExplained,
  SupportWaysToReachUs,
  SupportEscalationComplaintsAdr,
  SupportResolutionAndCredits,
  SupportQuestionsAnswered,
  SupportMoreBusinessServices,
} from "./components";

export default function BusinessSupportPage() {
  return (
    <main>
      <BusinessSupportSLAs />
      <SupportServiceStatus />
      <SupportSafeSelfChecks />
      <SupportReportFaultWizard />
      <SupportYourCases />
      <SupportServiceLevelsExplained />
      <SupportWaysToReachUs />
      <SupportEscalationComplaintsAdr />
      <SupportResolutionAndCredits />
      <SupportQuestionsAnswered />
      <SupportMoreBusinessServices />
    </main>
  );
}
