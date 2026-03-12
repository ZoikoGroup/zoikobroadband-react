import React from 'react'
import FibrePackagesHero from './components/FibrePackagesHero'
import FibreBroadband from './components/FibreBroadband'
import WhyChooseZoiko from '../why-zoiko/Components/WhyChooseZoiko'
import FAQ from '../Components/FAQs/FAQ'

export default function page() {
  return (
    <>
    <FibrePackagesHero/>
    <FibreBroadband/>
    <WhyChooseZoiko/>
    <FAQ/>
    </>
  )
}
