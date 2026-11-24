import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Headset,
  Phone,
  Tag,
  TriangleAlert,
} from "lucide-react";

const content = {
  badge: "SWITCHING & SUPPORT",
  headingLine1: "Keep your phone",
  headingLine2: "number when you",
  headingHighlight: "switch",
  description:
    "Find out how to request a number transfer for your home or business, what to check first, and how to get help if your line has already been disconnected.",
  primary: {
    label: "Check my transfer path",
    href: "#check-my-transfer-path",
  },
  secondary: { label: "Speak to our team", href: "/contact-us" },
  alert: {
    title:
      "Do not cancel your existing service until your transfer plan is confirmed.",
    text: "Cancelling first can mean losing your number.",
    cta: {
      label: "Already cancelled? Get help",
      href: "/get-help",
    },
  },
} as const;

const checks = [
  "Clear checks",
  "Customer authorisation",
  "Connected services",
  "Cutover planning",
] as const;

const passport = {
  title: "NUMBER PASSPORT",
  tag: "Illustrative",
  numberLabel: "YOUR NUMBER",
  number: "0•••• ••• •••",
  detailTitle: "Understand",
  detailText: "Learn what moving a number involves and who does what.",
  footnote: "An example journey, not a live status tracker",
} as const;

const stamps = [
  { step: "#1", label: "UNDERSTAND", active: true },
  { step: "#2", label: "CHECK", active: false },
  { step: "#3", label: "PREPARE", active: false },
  { step: "#4", label: "CONFIRM", active: false },
] as const;

const tabs = [
  {
    number: "01",
    title: "Keep Your Phone Number",
    status: "You're here",
    href: "/keep-your-phone-number",
    active: true,
  },
  {
    number: "02",
    title: "Moving to Digital Voice",
    status: "Coming soon",
    href: "/digital-lines",
    active: false,
  },
  {
    number: "03",
    title: "Installation & Setup",
    status: "Coming soon",
    href: "/installation-routers",
    active: false,
  },
  {
    number: "04",
    title: "Help & Troubleshooting",
    status: "Coming soon",
    href: "/get-help",
    active: false,
  },
  {
    number: "05",
    title: "Emergency Calling Guidance",
    status: "Coming soon",
    href: "/digital-lines",
    active: false,
  },
] as const;

export default function KeepYourNumberHero() {
  return (
    <section className="w-full overflow-hidden bg-gradient-to-br from-[#fdf8e8] via-[#f9fafc] to-[#f1f5f9]">
      {/* Hero main area */}
      <div className="relative mx-auto max-w-[1440px]">
        {/* Decorative background circle on right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 hidden h-[540px] w-[540px] rounded-full border-[44px] border-[#e6ecf4]/70 lg:block"
        />

        <div className="relative z-10 flex flex-col gap-12 px-6 pb-12 pt-10 sm:px-10 lg:flex-row lg:items-center lg:gap-8 lg:px-[6%] lg:pb-16 lg:pt-14">
          {/* Left content */}
          <div className="w-full lg:w-[53%]">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-[#0b192c] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-white">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ffcc00] text-[#0b192c]">
                <Tag className="h-3 w-3" aria-hidden="true" />
              </span>
              {content.badge}
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.04] tracking-tight text-[#0b192c] sm:text-6xl lg:text-[64px]">
              {content.headingLine1}
              <br />
              {content.headingLine2}
              <br />
              <span className="relative mt-1 inline-block pr-16 sm:pr-28 lg:pr-44">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 top-2 bg-[#ffcc00]"
                />
                <span className="relative">{content.headingHighlight}</span>
              </span>
            </h1>

            <p className="mt-6 max-w-[560px] text-base leading-7 text-[#475569] sm:text-[17px]">
              {content.description}
            </p>

            <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Link
                href={content.primary.href}
                className="inline-flex h-13 items-center justify-center gap-2.5 rounded-xl bg-[#ffcc00] px-7 py-3.5 text-sm font-bold text-[#0b192c] shadow-sm transition hover:bg-[#f5c400]"
              >
                {content.primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={content.secondary.href}
                className="inline-flex h-13 items-center justify-center gap-2.5 rounded-xl border border-[#0b192c]/25 bg-white px-7 py-3.5 text-sm font-bold text-[#0b192c] transition hover:bg-[#f8fafc]"
              >
                <Headset
                  className="h-4 w-4 text-[#0b192c]"
                  aria-hidden="true"
                />
                {content.secondary.label}
              </Link>
            </div>

            <ul className="mt-7 flex max-w-[540px] flex-wrap items-center gap-2.5">
              {checks.map((label) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#334155] shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:text-sm"
                >
                  <CircleCheck
                    className="h-4 w-4 shrink-0 text-[#16a34a]"
                    aria-hidden="true"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-[540px] lg:mx-0 lg:w-[47%] lg:max-w-none">
            {/* Person image tucked behind top-right */}
            <div className="absolute -right-3 -top-3 z-0 hidden h-[52%] w-[32%] rotate-[4deg] overflow-hidden rounded-2xl border-4 border-white shadow-lg sm:block lg:-right-5">
              <Image
                src="/Images/keep/1.png"
                alt="Smiling customer holding a phone"
                fill
                sizes="(min-width: 1024px) 15vw, 30vw"
                className="object-cover"
              />
            </div>

            {/* Desk phone / router image tucked behind bottom-left */}
            <div className="absolute -bottom-6 -left-4 z-0 hidden h-[44%] w-[34%] -rotate-[5deg] overflow-hidden rounded-2xl border-4 border-white shadow-lg sm:block lg:-left-6">
              <Image
                src="/Images/onb/15.png"
                alt="Office phone and broadband equipment"
                fill
                sizes="(min-width: 1024px) 16vw, 32vw"
                className="object-cover"
              />
            </div>

            {/* Main Number Passport card */}
            <div className="relative z-10 mx-auto w-full rounded-2xl border border-[#ffcc00]/45 bg-[#0b192c] p-5 shadow-[0_24px_50px_rgba(11,25,44,0.28)] sm:w-[86%] sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold tracking-[0.14em] text-[#ffcc00] sm:text-sm">
                  {passport.title}
                </p>
                <span className="rounded-md border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-white/75">
                  {passport.tag}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3.5 rounded-xl border border-white/10 bg-[#14253d] px-4 py-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ffcc00] text-[#0b192c]">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/60">
                    {passport.numberLabel}
                  </p>
                  <p className="mt-0.5 text-lg font-extrabold tracking-[0.16em] text-white sm:text-xl">
                    {passport.number}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-2.5 sm:gap-3">
                {stamps.map((stamp) => (
                  <div
                    key={stamp.label}
                    className={`flex aspect-square flex-col items-center justify-center rounded-full border-2 border-dashed p-1 text-center transition ${
                      stamp.active
                        ? "border-[#ffcc00] bg-[#ffcc00] text-[#0b192c] shadow-[0_0_0_3px_#0b192c,0_0_0_5px_#ffcc00]"
                        : "border-[#ffcc00]/70 text-[#ffcc00]"
                    }`}
                  >
                    <div className="-rotate-6 flex flex-col items-center">
                      <span className="text-xs font-extrabold leading-none sm:text-sm">
                        {stamp.step}
                      </span>
                      <span className="mt-1 hidden text-[10px] font-extrabold tracking-wider xl:inline">
                        {stamp.label}
                      </span>
                      <span className="mt-1 text-[10px] font-extrabold tracking-wider xl:hidden">
                        {stamp.label.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-white p-4">
                <p className="text-base font-extrabold text-[#0b192c]">
                  {passport.detailTitle}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-[#475569] sm:text-sm">
                  {passport.detailText}
                </p>
              </div>

              <p className="mt-3.5 text-xs text-white/55">
                {passport.footnote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed Alert bar */}
      <div className="relative z-10 w-full bg-[#c8102e] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-3.5 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-[6%]">
          <div className="flex items-start gap-2.5 text-xs sm:items-center sm:text-sm">
            <TriangleAlert
              className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0"
              aria-hidden="true"
            />
            <p>
              <span className="font-bold">{content.alert.title}</span>{" "}
              <span className="text-white/90">{content.alert.text}</span>
            </p>
          </div>
          <Link
            href={content.alert.cta.href}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-white px-4 text-xs font-bold text-[#c8102e] shadow-sm transition hover:bg-[#fff1f3] sm:text-sm"
          >
            {content.alert.cta.label}
          </Link>
        </div>
      </div>

      {/* Full-bleed Tabs row */}
      <div className="w-full border-t border-[#e2e8f0] bg-[#f4f6f9]">
        <nav
          aria-label="Switching and support topics"
          className="mx-auto grid max-w-[1440px] grid-cols-1 gap-2.5 px-6 py-3.5 sm:grid-cols-2 sm:px-10 lg:grid-cols-5 lg:px-[6%]"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.title}
              href={tab.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition ${
                tab.active
                  ? "bg-[#ffcc00] text-[#0b192c] shadow-sm"
                  : "border border-[#e2e8f0] bg-white text-[#0b192c] hover:bg-[#f8fafc]"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
                  tab.active
                    ? "bg-[#0b192c] text-white"
                    : "bg-[#f1f5f9] text-[#475569]"
                }`}
              >
                {tab.number}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-bold sm:text-[13px]">
                  {tab.title}
                </span>
                <span
                  className={`block text-[11px] font-medium ${
                    tab.active ? "text-[#0b192c]/80" : "text-[#64748b]"
                  }`}
                >
                  {tab.status}
                </span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
