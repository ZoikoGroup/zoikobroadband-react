import React from 'react'
import BundlesHero from './components/BundlesHero'
import BundleBuilders from './components/BundleBuilders'
import WhyBundle from './components/WhyBundle'
import LiveCustomer from './components/LiveCustomer'
import BundleAndSave from './components/BundleAndSave'
export const metadata = {
  title: "Zoiko Broadband Smart Bundles Deals | Save Up to 30%",
  description:
    "Save up to 30% with Zoiko Broadband Smart Bundles Deals. Combine broadband and digital services for great value, faster speeds & flexible plans made for you.",
};

export default function page() {
  return (
    <>
    <BundlesHero/>
    <BundleBuilders/>
    <WhyBundle/>
    <LiveCustomer/>
    <BundleAndSave/>
    </>
  )
}
