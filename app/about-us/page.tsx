import React from "react";
import TestimonialLoader from "../Components/TestimonialLoader";
import BuildOnInnovation from "./Components/BuildOnInnovation";
import PartOfSomething from "./Components/PartOfSomething";
import FromOurLeadership from "./Components/FromOurLeadership";
import DigitalInclusionSec1 from "./Components/DigitalInclusionSec1";
import DigitalInclusionSec2 from "./Components/DigitalInclusionSec2";
import AboutusHero from "./Components/AboutusHero";

export default function page() {
  return (
    <>
      {/* Hero section */}
      <AboutusHero/>

      {/* Digital Inclusion & Sustainability section1 */}
      <DigitalInclusionSec1 />

      {/* Digital Inclusion & Sustainability section2 */}
      <DigitalInclusionSec2 />

      {/* From Our Leadership */}
      <FromOurLeadership />

      {/* Part of Something bigger */}
      <PartOfSomething />

      {/* Built on Innovation */}
      <BuildOnInnovation />

      <TestimonialLoader />

    </>
  );
}
