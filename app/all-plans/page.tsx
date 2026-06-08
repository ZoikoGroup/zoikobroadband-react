import React from 'react'
import AllPlansHero from './sections/AllPlansHero'
import AllPlans from './sections/AllPlans'
export const metadata = {
  title: "Zoiko Broadband Plans | Full Fibre & SOGEA Packages UK",
  description:
    "Discover Full Fibre and SOGEA broadband packages built for streaming, gaming, and working from home with consistent speeds and UK-based support.",
};
export default function page() {
  return (
    <>
    <AllPlansHero/>
    <AllPlans/>
    </>
  )
}
