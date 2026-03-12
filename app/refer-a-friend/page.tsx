import React from "react";
import ModalProvider from "./components/modal-system/ModalProvider";
import ReferHero from "./components/ReferHero";
import HowItWorks from "./components/HowItWorks";
import TrustAndTransparency from "./components/TrustAndTransparency";
import StartEarningToday from "./components/StartEarningToday";
import MyPortalPreview from "./components/MyPortalPreview";
import ReferralLeaderboard from "./components/ReferralLeaderboard";


export default function page() {
  return (
    <>
      <ModalProvider>
        <ReferHero />
        <HowItWorks />
        <MyPortalPreview />
        <ReferralLeaderboard />
        <TrustAndTransparency />
        <StartEarningToday />
      </ModalProvider>
    </>
  );
}
