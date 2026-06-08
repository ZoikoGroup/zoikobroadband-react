import React from 'react'
import PartnershipHero from './Components/PartnershipHero'
import BuiltOnTrusted from './Components/BuiltOnTrusted'
import WorldClassInnovation from './Components/WorldClassInnovation'
import Accountable from './Components/Accountable'
import Supporting from './Components/Supporting'
import JoinOurNetwork from './Components/JoinOurNetwork'
export const metadata = {
  title: "Partnership with Zoiko Broadband | Let’s Grow Together",
  description:
    "Join Zoiko Broadband’s Partnership Program to expand your business. Get reseller support, marketing tools, and trusted broadband connectivity services.",
};
export default function page() {
  return (
    <>
    <PartnershipHero/>
    <BuiltOnTrusted/>
    <WorldClassInnovation/>
    <Accountable/>
    <Supporting/>
    <JoinOurNetwork/>
    </>
  )
}
