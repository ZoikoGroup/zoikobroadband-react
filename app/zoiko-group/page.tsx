import React from 'react'
import ZoikoGroupHero from './Components/ZoikoGroupHero'
import CorporateBacking from './Components/CorporateBacking'
import WhyThisMatters from './Components/WhyThisMatters'
export const metadata = {
  title: "Supporting Zoiko Broadband Growth | Zoiko Group",
  description:
    "Zoiko Group empowers Zoiko Broadband with financial strength, global support, and a commitment to innovation, compliance, and service quality.",
};
export default function page() {
  return (
    <>
    <ZoikoGroupHero/>
    <CorporateBacking/>
    <WhyThisMatters/>
    </>
  )
}
