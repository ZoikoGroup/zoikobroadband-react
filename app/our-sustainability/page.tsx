import React from "react";
import OurSustainabilityHero from "./Components/OurSustainabilityHero";
import OurMeasurable from "./Components/OurMeasurable";
import Initiatives from "./Components/Initiatives";
import CustomerAction from "./Components/CustomerAction";
import JoinOurCommitment from "./Components/JoinOurCommitment";
import LiveImpact from "./Components/liveImpact";

export const metadata = {
  title: "Zoiko Broadband Sustainability Promise | Our Eco Promise",
  description:
    "Zoiko Broadband is committed to sustainability, pledging carbon neutrality by 2030 through renewable energy, waste reduction, and eco-friendly practices.",
};
export default function page() {
  return (
    <div className="bg-[#ecf6f2]">

      {/* Hero Section . */}
      <OurSustainabilityHero/>

      {/* Our Measurable Goals */}
      <OurMeasurable/>

      {/* Initiatives in Action */}
      <Initiatives/>

      {/* Customer Action Zone */}
      <CustomerAction/>

      {/* Live Impact Tracker */}
      <LiveImpact/>

      {/* Join Our Green Commitment */}
      <JoinOurCommitment/>

    </div>
  );
}
