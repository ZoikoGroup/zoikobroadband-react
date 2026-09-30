import React from 'react'
import CheckMyPostHero from './components/CheckMyPostHero'
import BroadbandSolutions from './components/BroadbandSolutions'
import CheckYourPost from './components/CheckYourPost'
import BenefitsOfZB from './components/BenefitsOfZB'
import SpecialOffer from './components/SpecialOffer'
import BroadbandPlans from '../Components/Broadbandplans'
import TestimonialLoader from '../Components/TestimonialLoader'
import AeoGeoBlocks from '../Components/AeoGeo/AeoGeoBlocks'
import { postcodeBlocks, postcodeSchema } from '../Components/AeoGeo/content'
export const metadata = {
  title: "Coverage Checker by Postcode | Zoiko Broadband",
  description:
    "Enter your postcode to check Zoiko Broadband coverage in your area. Check if our fast and reliable fibre broadband is available at your location today.",
};
export default function page() {
  return (
    <div className="dark:bg-gray-950 ">
    <CheckMyPostHero/>
    <BroadbandPlans/>
    <BroadbandSolutions/>
    {/* <CheckYourPost/> */}
    <BenefitsOfZB/>
    <SpecialOffer/>
    <TestimonialLoader/>
    <AeoGeoBlocks blocks={postcodeBlocks} schema={postcodeSchema} />
    </div>
  )
}
