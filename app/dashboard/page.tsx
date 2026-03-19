import React from 'react'
import DashboardHero from './sections/DashboardHero'
import DashboardOptions from './sections/DashboardOptions'
import QuickActions from './sections/QuickActions'


export default function page() {
  return (
    <>
    <DashboardHero/>
    <DashboardOptions/>
    <QuickActions/>
    </>
  )
}
