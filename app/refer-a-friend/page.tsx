import React from 'react'
import ReferHero from './components/ReferHero'
import HowItWorks from './components/HowItWorks'
import TrustAndTransparency from './components/TrustAndTransparency'
import StartEarningToday from './components/StartEarningToday'
import MyPortalPreview from './components/MyPortalPreview'
import ReferralLeaderboard from './components/ReferralLeaderboard'
import ReferralController from './components/ReferralController'

export default function page() {
  return (
    <>
    <ReferralController/>
    <HowItWorks/>
    <ReferralLeaderboard/>
    <MyPortalPreview/>
    <TrustAndTransparency/>
    <StartEarningToday/>
    </>
  )
}
