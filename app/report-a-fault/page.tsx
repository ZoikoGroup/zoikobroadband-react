import React from 'react'
import ReportAFaultHero from './sections/ReportAFaultHero'
import FixItYourself from './sections/FixItYourself'
import ReportFault from './sections/ReportFault'
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Report a Fault | Zoiko Broadband Support Center",
  description:
    "Having broadband issues? Report a fault with Zoiko Broadband, and our team will help resolve your connection, speed, or service problem fast."

};
export default function page() {
  return (
    <>
    <ReportAFaultHero/>
    <ReportFault/>
    <FixItYourself/>
    </>
  )
}
