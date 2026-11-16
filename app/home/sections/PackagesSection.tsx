import Link from "next/link";
import { ArrowRight, CalendarDays, Gauge, MapPin, ReceiptText, Rocket, Wifi, Zap, type LucideIcon } from "lucide-react";
import { Container, SectionHeader, UnderlineLink } from "./ui";

type Pkg = {
  icon: LucideIcon;
  name: string;
  price: number;
  tech: string;
  summary: string;
  featured?: boolean;
};

const packages: Pkg[] = [
  {
    icon: Gauge,
    name: "Entry / Value",
    price: 35,
    tech: "Part fibre (SOGEA) or verified entry tier",
    summary: "Everyday browsing, email and HD streaming for smaller homes.",
  },
  {
    icon: Wifi,
    name: "Everyday Fibre",
    price: 55,
    tech: "Full fibre or part fibre, depending on your address",
    summary: "Streaming, video calls and home working for most households.",
    featured: true,
  },
  {
    icon: Zap,
    name: "High Demand",
    price: 51,
    tech: "Full fibre (FTTP), where available",
    summary: "Busy homes with lots of devices, 4K streaming and large uploads.",
  },
  {
    icon: Rocket,
    name: "Gigabit / Premium",
    price: 61,
    tech: "Full fibre (FTTP), where available",
    summary: "The most headroom for heavy users and connected homes.",
  },
];

const details = [
  { icon: Gauge, label: "Speed", value: "Confirmed for your address" },
  { icon: CalendarDays, label: "Contract and price rises", value: "Shown before you order" },
  { icon: ReceiptText, label: "Upfront costs", value: "Shown before you order" },
];

export default function PackagesSection() {
  return (
    <section id="packages" aria-labelledby="packages-heading" className="bg-white py-16 dark:bg-gray-900 sm:py-24">
      <Container>
        <SectionHeader
          id="packages-heading"
          eyebrow="Compare Packages"
          title="Broadband packages for your home"
          intro="Speeds, prices and contract terms are confirmed for your address. Check your postcode to see what you can order."
        />
        <p className="mt-8 flex items-center justify-center gap-2 text-center font-semibold text-[#0B2F5B] dark:text-white">
          <MapPin aria-hidden className="h-5 w-5 shrink-0" />
          Check your address to see which packages are available to you.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {packages.map(({ icon: Icon, name, price, tech, summary, featured }) => (
            <article
              key={name}
              className={`relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_18px_40px_-24px_rgba(11,47,91,0.35)] dark:bg-gray-950 ${
                featured
                  ? "border-[3px] border-[#F7BE2E] lg:-mt-1"
                  : "border border-slate-300 border-t-4 border-t-[#1B4F86] dark:border-gray-700"
              }`}
            >
              {featured && (
                <span className="absolute right-5 top-6 rounded-full bg-[#F7BE2E] px-3 py-1 text-xs font-bold text-[#0B2F5B]">
                  Most households
                </span>
              )}
              <span
                className={`flex h-[52px] w-[52px] items-center justify-center rounded-xl ${
                  featured ? "bg-[#0B2F5B] text-[#F7BE2E]" : "bg-[#E6F0FB] text-[#0B2F5B] dark:bg-gray-800 dark:text-white"
                }`}
              >
                <Icon aria-hidden className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-[#0B2F5B] dark:text-white">{name}</h3>
              <p className="mt-2 text-[#0B2F5B] dark:text-white">
                <span className="text-2xl font-extrabold">£{price}</span>
                <span className="text-lg text-slate-600 dark:text-slate-300">/month</span>
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{tech}</p>
              <p className="mt-5 leading-relaxed text-slate-700 dark:text-slate-300">{summary}</p>

              <hr className="my-5 border-slate-200 dark:border-gray-700" />

              <ul className="flex-1 space-y-4">
                {details.map(({ icon: DIcon, label, value }) => (
                  <li key={label} className="flex gap-3">
                    <DIcon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#0B2F5B] dark:text-slate-300" />
                    <span className="text-sm">
                      <span className="block font-semibold text-[#0B2F5B] dark:text-white">{label}</span>
                      <span className="text-slate-600 dark:text-slate-400">{value}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="#check-postcode"
                aria-label={`Check availability for ${name}`}
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition-colors ${
                  featured ? "bg-[#F7BE2E] text-[#0B2F5B] hover:bg-[#F2B015]" : "bg-[#0B2F5B] text-white hover:bg-[#123d72]"
                }`}
              >
                Check Availability
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-8">
          <UnderlineLink href="/all-plans">View all plans</UnderlineLink>
          <UnderlineLink href="/fibre-packages">Compare Plans</UnderlineLink>
        </div>
      </Container>
    </section>
  );
}
