import React from "react";
import ModalProvider from "./components/modal-system/ModalProvider";
import ReferHero from "./components/ReferHero";
import HowItWorks from "./components/HowItWorks";
import TrustAndTransparency from "./components/TrustAndTransparency";
import StartEarningToday from "./components/StartEarningToday";
import MyPortalPreview from "./components/MyPortalPreview";
import ReferralLeaderboard from "./components/ReferralLeaderboard";
export const metadata = {
  title: "Zoiko Refer a Friend | Earn £50 for You & Friend",
  description:
    "Refer a friend to Zoiko Broadband and you both get £50! Start sharing your referral link today and enjoy fast, reliable internet with great rewards.",
};

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
