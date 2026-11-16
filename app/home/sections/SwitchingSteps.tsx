import { ArrowLeftRight, Columns3, Info, MapPin } from "lucide-react";
import { Container, SectionHeader, UnderlineLink } from "./ui";

const steps = [
  {
    icon: MapPin,
    title: "Check address",
    text: "Enter your postcode and select your address to see what we can offer.",
    cta: "Check Availability",
    href: "#check-postcode",
  },
  {
    icon: Columns3,
    title: "Choose your plan",
    text: "Compare eligible packages, contract terms, expected speeds and charges.",
    cta: "Compare Plans",
    href: "/fibre-packages",
  },
  {
    icon: ArrowLeftRight,
    title: "We help you switch",
    text: "We’ll explain your switching route, any engineer visit and your expected activation date.",
    cta: "How Switching Works",
    href: "/setup-installation",
  },
];

export default function SwitchingSteps() {
  return (
    <section aria-labelledby="switching-heading" className="bg-[#F3F7FC] py-16 dark:bg-gray-900 sm:py-24">
      <Container>
        <SectionHeader
          id="switching-heading"
          eyebrow="Switching"
          title="Switching to Zoiko in three steps"
          intro="What happens next depends on your network and property. We explain each step before you commit."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text, cta, href }, i) => (
            <li
              key={title}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_18px_40px_-26px_rgba(11,47,91,0.4)] dark:border-gray-800 dark:bg-gray-950"
            >
              <span aria-hidden className="absolute right-6 top-4 text-6xl font-extrabold text-[#EAF0F7] dark:text-gray-800">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-[#0B2F5B] text-[#F7BE2E]">
                <Icon aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="relative mt-6 text-2xl font-bold text-[#0B2F5B] dark:text-white">
                <span className="sr-only">Step {i + 1}: </span>
                {title}
              </h3>
              <p className="relative mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
              <UnderlineLink href={href} className="relative mt-5">
                {cta}
              </UnderlineLink>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 flex max-w-3xl items-start justify-center gap-3 text-center text-slate-700 dark:text-slate-300">
          <Info aria-hidden className="mt-1 h-4 w-4 shrink-0" />
          <span>
            Where One Touch Switch applies, you do not need to cancel your old broadband yourself. If your situation is different, we will
            explain what you need to do.
          </span>
        </p>
      </Container>
    </section>
  );
}
