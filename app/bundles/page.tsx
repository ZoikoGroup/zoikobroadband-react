import React from 'react'
import BundlesHero from './components/BundlesHero'
import BundleBuilders from './components/BundleBuilders'
import WhyBundle from './components/WhyBundle'
import LiveCustomer from './components/LiveCustomer'
import BundleAndSave from './components/BundleAndSave'


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
