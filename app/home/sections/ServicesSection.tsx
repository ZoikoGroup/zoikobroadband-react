import Link from "next/link";
import { ArrowRight, Building2, House, Layers, Phone, type LucideIcon } from "lucide-react";
import { Container, SectionHeader } from "./ui";

type Service = { icon: LucideIcon; title: string; text: string; cta: string; href: string; featured?: boolean };

const services: Service[] = [
  {
    icon: House,
    title: "Home Broadband",
    text: "Full fibre and part fibre broadband for your home, checked at your address.",
    cta: "Explore plans",
    href: "/fibre-packages",
  },
  {
    icon: Building2,
    title: "Business Broadband",
    text: "Connectivity for offices, retail, hospitality and multi-site organisations.",
    cta: "Business options",
    href: "/business-broadband",
    featured: true,
  },
  {
    icon: Phone,
    title: "Digital Lines",
    text: "Digital phone options for home and business, including number transfer where supported.",
    cta: "Explore Digital Lines",
    href: "/digital-lines",
  },
  {
    icon: Layers,
    title: "Bundles",
    text: "Bring services together where they are eligible at your address.",
    cta: "Explore Bundles",
    href: "/bundles",
  },
];

export default function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="bg-[#F3F7FC] py-16 dark:bg-gray-950 sm:py-24">
      <Container>
        <SectionHeader
          id="services-heading"
          eyebrow="Our Services"
          title="Connectivity for every part of life"
          intro="Choose where you want to start. Every journey checks your address before showing anything you can order."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text, cta, href, featured }) => (
            <Link
              key={title}
              href={href}
              className={`group flex flex-col rounded-2xl border p-7 shadow-[0_14px_30px_-18px_rgba(11,47,91,0.35)] transition-transform hover:-translate-y-1 ${
                featured
                  ? "border-[#0B2F5B] bg-[#0B2F5B] text-white"
                  : "border-slate-200 bg-white text-[#0B2F5B] dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              }`}
            >
              <span
                className={`flex h-[68px] w-[68px] items-center justify-center rounded-2xl ${
                  featured ? "bg-[#F7BE2E] text-[#0B2F5B]" : "bg-[#E6F0FB] text-[#0B2F5B] dark:bg-gray-800 dark:text-white"
                }`}
              >
                <Icon aria-hidden className="h-7 w-7" strokeWidth={1.7} />
              </span>
              <h3 className="mt-7 text-xl font-bold">{title}</h3>
              <p className={`mt-3 flex-1 leading-relaxed ${featured ? "text-white/85" : "text-slate-600 dark:text-slate-300"}`}>{text}</p>
              <span className={`mt-6 inline-flex items-center gap-2 font-bold ${featured ? "text-[#F7BE2E]" : ""}`}>
                {cta}
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
