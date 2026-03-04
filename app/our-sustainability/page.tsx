import React from "react";
import OurSustainabilityHero from "./Components/OurSustainabilityHero";
import OurMeasurable from "./Components/OurMeasurable";
import Initiatives from "./Components/Initiatives";
import CustomerAction from "./Components/CustomerAction";
import JoinOurCommitment from "./Components/JoinOurCommitment";
import LiveImpact from "./Components/liveImpact";


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
