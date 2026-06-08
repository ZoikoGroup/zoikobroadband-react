import React from 'react'
import PaymentBillingHero from './sections/PaymentBillingHero'
import ManageYourBilling from './sections/ManageYourBilling'
import FrequentlyAskedQues from './sections/FrequentlyAskedQues'
import ProtectedRoute from '../Components/ProtectedRoute'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: "Zoiko Broadband Payments & Billing | Manage Your Account",
  description:
    "Manage your Zoiko Broadband payments and billing online. Pay securely, view statements, and get quick support for any account or billing questions."

};

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
