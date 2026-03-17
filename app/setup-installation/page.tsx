import React from "react";
import SetupInstallationHero from "./sections/SetupInstallationHero";
import DeviceSetup from "./sections/DeviceSetup";
import VisualSetupGuides from "./sections/VisualSetupGuides";
import FAQ from "../Components/FAQs/FAQ";

const setupfaqs = [
  {
    id: 1,
    question: "What do the lights on my router mean?",
    answer: `The lights on your router are designed to give you instant reassurance that your service is working as it should:

Power: Confirms the router is on and operating.
Broadband/DSL: Shows that your line is active and communicating with our network.
Internet: Confirms you are successfully connected to the internet.
Wi-Fi/WLAN: Indicates that your wireless signal is available for devices to join.
LAN/Ethernet: Lights up when a device is connected with a cable.
If a light is red, flashing unexpectedly, or off when it should be steady, check our quick-start guide or contact Zoiko Broadband Support for immediate assistance.`,
  },

  {
    id: 2,
    question: "How long should setup take?",
    answer: `Most customers are online within 15–30 minutes once their broadband line is active. Simply connect your router as instructed and allow it a short period to synchronise with our network.

In some cases, it may take up to 24 hours for your connection to fully stabilise — but rest assured, your service will already be available during this period.`,
  },

  {
    id: 3,
    question: "Do I need a landline for broadband?",
    answer: `No. Zoiko Broadband provides fibre and digital broadband services that operate independently of a traditional landline. There are no hidden line rental charges, and your service is fully prepared for the UK’s PSTN switch-off, keeping you ahead of the change.`,
  },

  {
    id: 4,
    question: "Can I set up without an engineer?",
    answer: `Yes — in most cases you can set up your service yourself. Your router will arrive pre-configured with a clear, step-by-step guide. Simply connect it to your master socket and you should be online within minutes.

Where an engineer visit is necessary (for example, installing fibre directly to your property), we will arrange this at a time that suits you.`,
  },

  {
    id: 5,
    question: "How do I test if setup worked?",
    answer: `You’ll know your setup has been successful if:

1. The router lights show steady green or blue for Power, Broadband/DSL, and Internet.

2. You can connect a device via Wi-Fi or Ethernet and access a webpage.

3. A speed test confirms performance in line with your plan.

 

If you experience issues, restart the router and recheck the connections. Should the problem persist, our dedicated UK-based Support Team is available every day to help you get back online quickly.`,
  },
];

export default function page() {
  return (
    <>
      <SetupInstallationHero />
      <DeviceSetup />
      <VisualSetupGuides />
      <FAQ faqs={setupfaqs} />
    </>
  );
}
