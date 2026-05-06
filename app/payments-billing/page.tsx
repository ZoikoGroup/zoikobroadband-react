import React from 'react'
import PaymentBillingHero from './sections/PaymentBillingHero'
import ManageYourBilling from './sections/ManageYourBilling'
import FrequentlyAskedQues from './sections/FrequentlyAskedQues'
import ProtectedRoute from '../Components/ProtectedRoute'

export default function page() {
  return (
    <>
    <ProtectedRoute>
    <PaymentBillingHero/>
    <ManageYourBilling/>
    <FrequentlyAskedQues/>
    </ProtectedRoute>
    </>
  )
}
