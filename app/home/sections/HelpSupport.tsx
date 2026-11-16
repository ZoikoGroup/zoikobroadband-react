import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  Activity,
  ChevronRight,
  Headset,
  LifeBuoy,
  Mail,
  MessageSquareWarning,
  Package,
  ReceiptText,
  Router,
  Wrench,
} from "lucide-react";
import { Container, SectionHeader } from "./ui";

const links = [
  { icon: LifeBuoy, label: "Help Centre", href: "/get-help" },
  { icon: Activity, label: "Check Service Status", href: "/report-a-fault" },
  { icon: Wrench, label: "Report a Fault", href: "/report-a-fault" },
  { icon: Router, label: "Router and Wi-Fi Help", href: "/setup-installation" },
  { icon: ReceiptText, label: "Billing & Payments", href: "/payments-billing" },
  { icon: Package, label: "Track Your Order", href: "/dashboard" },
  { icon: MessageSquareWarning, label: "Complaints", href: "/contact-us" },
  { icon: Accessibility, label: "Accessibility", href: "/accessibility-statement" },
  { icon: Mail, label: "Contact Us", href: "/contact-us" },
];

export default function HelpSupport() {
  return (
    <section aria-labelledby="help-heading" className="bg-white py-16 dark:bg-gray-950 sm:py-24">
      <Container>
        <SectionHeader
          id="help-heading"
          eyebrow="Help & Support"
          title="Here to help, before and after you join"
          intro="Find answers, manage your service or get in touch. You do not need to sign in to contact us or make a complaint."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[440px_1fr]">
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl">
            <Image
              src="/Images/home/help-support-team.webp"
              alt="A support adviser gesturing at a laptop screen"
              fill
              sizes="(min-width: 1024px) 440px, 100vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-start gap-3 rounded-2xl bg-[#0B2F5B] px-5 py-4 text-white">
              <Headset aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#F7BE2E]" />
              <p>
                <span className="block font-bold">Talk to our team</span>
                <Link href="/contact-us" className="font-semibold text-[#F7BE2E] underline underline-offset-4">
                  Contact Us
                </Link>
              </p>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {links.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group flex h-full min-h-[88px] items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_14px_30px_-22px_rgba(11,47,91,0.4)] transition-colors hover:border-[#0B2F5B] dark:border-gray-800 dark:bg-gray-900"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E6F0FB] text-[#0B2F5B] dark:bg-gray-800 dark:text-white">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="flex-1 font-bold text-[#0B2F5B] dark:text-white">{label}</span>
                  <ChevronRight aria-hidden className="h-4 w-4 text-[#1d5fa8] transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
