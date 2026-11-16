"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircleQuestion, Minus, Plus } from "lucide-react";
import { Container, Eyebrow } from "./ui";

const faqs = [
  {
    q: "What is the difference between full fibre and part fibre broadband?",
    a: "Full fibre (FTTP) uses a fibre connection to the property. Part fibre (often SOGEA) uses fibre for part of the route and copper for the final connection. Availability depends on your address.",
  },
  {
    q: "Can I get Zoiko Broadband at my address?",
    a: "Enter your postcode and select your address. We will show the packages, speeds and charges available at your property before you order anything.",
  },
  {
    q: "How do I switch my broadband to Zoiko?",
    a: "Check your address, choose an eligible plan and we will explain your switching route. Where One Touch Switch applies, you do not need to cancel your old broadband yourself.",
  },
  {
    q: "Can I keep my home phone number?",
    a: "In many cases you can transfer your existing number to a Zoiko digital line, where number transfer is supported. We will confirm this before you switch.",
  },
  {
    q: "Does a digital phone line work during a power cut?",
    a: "Digital phone services rely on power and an internet connection. During a power cut you may not be able to make calls, including to 999 or 112, without a backup. If you depend on your landline for emergency access or use telecare equipment, talk to us before switching.",
  },
  {
    q: "Which broadband speed do I need?",
    a: "It depends on how many people are online and what they do. Our Speed Adviser can suggest a package type, and the speed available at your address is confirmed when you check your postcode.",
  },
  {
    q: "Do you offer broadband for businesses?",
    a: "Yes. We offer connectivity for offices, retail, hospitality and multi-site organisations. Request a tailored quote and our team will recommend options for your premises.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="bg-white py-16 dark:bg-gray-950 sm:py-24">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[490px_1fr] lg:gap-14">
          <div className="relative hidden aspect-[490/595] overflow-hidden rounded-3xl lg:block">
            <Image
              src="/Images/home/faq-living-room.webp"
              alt="A bright open-plan living room and kitchen"
              fill
              sizes="490px"
              className="object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 flex items-start gap-3 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
              <MessageCircleQuestion aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-[#0B2F5B]" />
              <p>
                <span className="block font-bold text-[#0B2F5B]">Still have a question?</span>
                <Link href="/get-help" className="font-semibold text-[#1d5fa8] underline underline-offset-4">
                  Visit the Help Centre
                </Link>
              </p>
            </div>
          </div>

          <div>
            <Eyebrow>FAQs</Eyebrow>
            <h2 id="faq-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B2F5B] dark:text-white sm:text-4xl lg:text-[44px]">
              Questions about Zoiko Broadband
            </h2>

            <div className="mt-8 space-y-3">
              {faqs.map(({ q, a }, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={q}
                    className={`overflow-hidden rounded-2xl border bg-white transition-colors dark:bg-gray-900 ${
                      isOpen ? "border-[#0B2F5B] border-l-4 border-l-[#F7BE2E] dark:border-slate-400" : "border-slate-200 dark:border-gray-800"
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-bold text-[#0B2F5B] dark:text-white sm:text-lg"
                      >
                        {q}
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                            isOpen ? "bg-[#0B2F5B] text-[#F7BE2E]" : "bg-[#E6F0FB] text-[#0B2F5B] dark:bg-gray-800 dark:text-white"
                          }`}
                        >
                          {isOpen ? <Minus aria-hidden className="h-4 w-4" /> : <Plus aria-hidden className="h-4 w-4" />}
                        </span>
                      </button>
                    </h3>
                    <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen} className="px-5 pb-5 pr-14">
                      <p className="leading-relaxed text-slate-600 dark:text-slate-300">{a}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 lg:hidden">
              <Link href="/get-help" className="font-semibold text-[#1d5fa8] underline underline-offset-4">
                Still have a question? Visit the Help Centre
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
