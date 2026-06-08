import React from 'react'
import BusinessBroadbandHero from './components/BusinessBroadbandHero'
import BusinessBroadbandPlans from './components/BusinessBroadbandPlans'
import WhyBusinessChooseUs from './components/WhyBusinessChooseUs'
import PerfectForEveryBusiness from './components/PerfectForEveryBusiness'
import GetCustomQuote from './components/GetCustomQuote'
export const metadata = {
  title: "Affordable Business Broadband Plans | Zoiko Broadband",
  description:
    "Zoiko Broadband offers tailored Business Broadband Plans with full fibre speeds, flexible contracts, and UK-based support to keep your business connected.",
};
export default function page() {
  return (
    <>
    <BusinessBroadbandHero/>
    <BusinessBroadbandPlans/>
    <WhyBusinessChooseUs/>
    <PerfectForEveryBusiness/>
    <GetCustomQuote/>
    </>
  )
}
