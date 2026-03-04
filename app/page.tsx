import TestimonialLoader from "./Components/TestimonialLoader";
import HeroSection from "./(home)/Components/HeroSection";
import FindYourPlan from "./(home)/Components/FindYourPlan";
import WhyZoiko from "./(home)/Components/WhyZoiko";
import ExploreBundles from "./(home)/Components/ExploreBundles";
import CheckYourPostcode from "./(home)/Components/CheckYourPostcode";
import PlansWrapper from "./Components/PlansWrapper";

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
      <CheckYourPostcode/>

      {/* TESTIMONIAL SLIDER SECTION */}
      <TestimonialLoader />
    </div>
  );
}
