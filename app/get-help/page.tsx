import React from "react";
import GetHelpHero from "./sections/GetHelpHero";
import HowWeHelp from "./sections/HowWeHelp";
import SelectCustomerType from "./sections/SelectCustomerType";
import FAQ from "../Components/FAQs/FAQ";
import NeedMoreSupport from "./sections/NeedMoreSupport";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zoiko Broadband Get Help | Account, Setup & Support Hub",
  description:"Need help with Zoiko Broadband? Get support for setup, billing, outages, slow speeds, and account issues quickly through our easy-to-use Help Center."

};
const gethelpfaqs = [
  {
    id: 1,
    question: "How do I reset my router?",
    answer: `If your broadband connection feels slower than usual or drops unexpectedly, a router reset can often restore performance.

We recommend the following steps:

Soft reset (first option):
1. Locate the power button on your router and switch it off.
2. Wait at least 30 seconds before turning it back on.
3. Allow up to 5 minutes for the connection to fully re-establish.

Factory reset (only when instructed by Zoiko Support):
1. Locate the reset pinhole on the back of your router.
2. Using a paperclip or similar object, press and hold for 10 seconds until the lights flash.
3. This will restore the router to factory settings.
4. You’ll need to re-enter your Wi-Fi network name (SSID) and password – printed on the back of your router.

Zoiko Tip: A soft reset resolves most issues. A factory reset should only be used if advised by our technical team as it will erase customised settings.`,
  },

  {
    id: 2,
    question: "How can I test my broadband speed?",
    answer: `Checking your speed ensures you are receiving the service level you expect, in line with our Ofcom Speed Commitment.

For the most accurate test:
• Visit the Zoiko Broadband Speed Test page via the “Support” section of our website.
• Use an Ethernet cable to connect your device directly to the router.
• Close all unnecessary apps, tabs, or downloads before starting the test.

Your results will show:
• Download speed – How fast you can stream, browse and download content.
• Upload speed – How quickly you can send files, share content or make video calls.
• Latency (ping) – How responsive your connection is for gaming, streaming and real-time applications.

Note: If your results are consistently below your guaranteed minimum, please contact Zoiko Support – we will run diagnostics and work with you to resolve the issue promptly.`,
  },

  {
    id: 3,
    question: "Where can I view or download my bill?",
    answer: `Your bills are securely stored online and available 24/7 through My Zoiko Account.

To view or download your bill:
1. Log in at www.zoikobroadband.com/myaccount.
2. Select Billing & Payments from the main menu.
3. Choose the statement period you wish to view.
4. Click Download PDF to save or print a copy.

Your bill will show:
• A detailed breakdown of charges.
• Any discounts or credits applied.
• VAT details for your records.

Zoiko Tip: Activate Bill Alerts in your account to receive an email each time a new statement is ready.`,
  },

  {
    id: 4,
    question: "What should I do if I've lost service?",
    answer: `We understand that downtime can be disruptive, so we aim to restore your service quickly.

Before contacting us:
1. Check the Service Status page on our website to see if there’s a reported outage in your area.
2. Ensure all cables are securely connected to your router and wall socket.
3. Restart your router using the soft reset method above.
4. Test your connection on a different device, if possible.

If your service is still offline:
• Contact Zoiko Support via live chat, phone, or email – available 24/7.

Priority repair: If you are a Zoiko Business Broadband customer or have registered accessibility needs, you may qualify for priority fault repair under our Service Level Agreement (SLA).`,
  },

  {
    id: 5,
    question: "How do I update my payment details?",
    answer: `Keeping your payment method current ensures uninterrupted broadband service.

To update securely:
1. Log in to My Zoiko Account.
2. Go to Billing & Payments.
3. Select Update Payment Method.
4. Enter your new card or bank account details and confirm the change.

Security note: All payment details are protected by industry-leading encryption and PCI DSS-compliant systems for maximum security.`,
  },
];

export default function page() {
  return (
    <>
      <GetHelpHero />
      <HowWeHelp />
      <SelectCustomerType />
      <FAQ faqs={gethelpfaqs} />
      <NeedMoreSupport/>
    </>
  );
}
