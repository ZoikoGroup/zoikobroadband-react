import TestimonialLoader from "./Components/TestimonialLoader";
import HeroSection from "./home/Components/HeroSection";
import FindYourPlan from "./home/Components/FindYourPlan";
import WhyZoiko from "./home/Components/WhyZoiko";
import ExploreBundles from "./home/Components/ExploreBundles";
import CheckYourPostcode from "./home/Components/CheckYourPostcode";
import PlansWrapper from "./Components/PlansWrapper";
import  BroadbandPlans  from './Components/Broadbandplans';
export const metadata = {
  title: "Zoiko Broadband | Affordable Broadband Plans UK",
  description:
    "Get the best broadband plans from Zoiko Broadband— leveraging BT’s Tier 1 network, with a free router, no setup fees, and UK-based customer support.",
};
export default function Home() {

  return (
    <div className="-mt-20 md:-mt-24 lg:-mt-28">
      {/* Hero - section ..*/}
      <HeroSection/>

      {/* Find your plan .. */}
      <FindYourPlan/>

      {/* Choose your plan .. */}
      {/* <PlansTabs plans={allPlans} /> */}
      <PlansWrapper/>

      {/* Why choose zoiko .. */}
      <WhyZoiko/>

      {/* Explore bundles .. */}
      <ExploreBundles/>

      {/* Check your postcode */}
      {/* <BroadbandPlans/> */}

      {/* TESTIMONIAL SLIDER SECTION */}
      <TestimonialLoader />
    </div>
  );
}
