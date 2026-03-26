import React from 'react'
import ReportAFaultHero from './sections/ReportAFaultHero'
import FixItYourself from './sections/FixItYourself'
import ReportFault from './sections/ReportFault'

export default function page() {
  return (
    <>
    <ReportAFaultHero/>
    <ReportFault/>
    <FixItYourself/>
    </>
  )
}
