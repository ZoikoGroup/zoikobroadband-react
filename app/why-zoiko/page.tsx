import React from 'react'
import WhyZoikoHero from './Components/WhyZoikoHero'
import WhyChooseZoiko from './Components/WhyChooseZoiko'
import CTASection from './Components/CTASection'
import TestimonialLoader from '../Components/TestimonialLoader'

export default function page() {
  return (
    <>
    <WhyZoikoHero/>
    <WhyChooseZoiko/>
    <CTASection/>
    <TestimonialLoader/>
    </>
  )
}
