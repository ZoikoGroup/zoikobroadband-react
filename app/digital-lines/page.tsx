import React from "react";
import DigitalLinesHero from "./sections/DigitalLinesHero";
import FAQ from "../Components/FAQs/FAQ";
import Wizard from "./sections/Wizard";
export const metadata = {
  title: "Zoiko Broadband Digital Lines | Reliable VoIP Services",
  description:
    "Zoiko Broadband Digital Lines offer reliable VoIP services with clear calls, scalable plans, and expert support designed to meet your business needs.",
};
const DlFaq = [
  {
    id: 1,
    question: "Can I keep my existing number?",
    answer: "Yes. Zoiko Broadband will transfer your number from your current provider so you can keep using it without disruption. We take care of the entire process, making it seamless and stress-free.",
  },
   {
    id: 2,
    question: "Do I need broadband for a digital phone line?",
    answer: "Yes. Digital Lines run over broadband, replacing the old copper network. You’ll need an active Zoiko Broadband connection—or another compatible broadband service—for your digital phone to work reliably.",
  },
   {
    id: 3,
    question: "What happens if my number port fails?",
    answer: "If your port doesn’t complete on the first attempt, we’ll handle the issue directly with your existing provider and keep you informed at every stage. You’ll always have a working Zoiko number in the meantime, so you’re never left without service.",
  },
   {
    id: 4,
    question: "How do admin charges work?",
    answer: "At Zoiko Broadband, we’re transparent and fair. Charges only apply in limited cases—for example, if incorrect details delay a port or if an appointment is missed. All fees are clearly listed in your agreement, and we’ll always confirm them with you in advance.",
  },
   {
    id: 5,
    question: "Will my alarm or lift line work with digital phone?",
    answer: "Some older analogue devices—such as monitored alarms, telecare systems, or lift lines—may not be compatible with digital phone services. Please check with your equipment supplier to confirm whether an upgrade is required. If not, we can advise on alternative solutions to keep your services running reliably.",
  },
   {
    id: 6,
    question: "How are emergency calls handled during power cuts?",
    answer: "Digital services rely on mains power and broadband. During a power cut, your phone may not work. For vulnerable customers and those with critical needs, we provide battery backup solutions so emergency calls remain available. We also recommend keeping a mobile phone as an additional safeguard.",
  },
];

export default function page() {
  return (
    <>
      <DigitalLinesHero />
      <Wizard/>
      <FAQ faqs={DlFaq} />
    </>
  );
}
