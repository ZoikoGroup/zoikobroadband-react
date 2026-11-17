import React from "react";
import Link from "next/link";
import {
  Info,
  Wifi,
  SquareTerminal,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Choose your path", href: "#choose-your-path" },
  { label: "The steps", href: "#the-steps" },
  { label: "Installation", href: "#installation" },
  { label: "Router & Wi-Fi", href: "#router-wifi" },
  { label: "Engineer visit", href: "#engineer-visit" },
  { label: "Troubleshooting", href: "#troubleshooting" },
  { label: "FAQs", href: "#faqs" },
] as const;

const CONNECTION_PATHS = [
  {
    icon: Wifi,
    title: "Full Fibre (FTTP)",
    description:
      "Fibre runs to the premises where it's provisioned. Uses an ONT indoors, connected to your router.",
    actionLabel: "See FTTP installation",
    href: "#fttp-installation",
    footnote: "Steps may vary by property.",
  },
  {
    icon: SquareTerminal,
    title: "Part Fibre (SOGEA)",
    description:
      "Uses your local access line and socket. Not an analogue voice product — a traditional landline isn't included by default.",
    actionLabel: "See SOGEA installation",
    href: "#sogea-installation",
    footnote: "Socket and setup may vary.",
  },
  {
    icon: HelpCircle,
    title: "Not sure which connection?",
    description:
      "The connection available at your property decides this. Check your address and we'll show what applies.",
    actionLabel: "Check my address",
    href: "/check-availability",
    footnote: "No address is stored to browse this guide.",
  },
] as const;

export default function ChooseConnectionPath() {
  return (
    <div className="min-h-screen bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden">
      {/* Sub-Navigation Bar */}
      <header className="w-full border-b border-gray-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Page sections"
            className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-6 py-4"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-[#0E2F52] hover:text-[#0A3A66] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Notice Banner */}
        <div className="relative bg-[#FFFBEB]/60 border border-[#F0B429] border-l-4 border-l-[#F0B429] rounded-2xl p-5 sm:p-6 mb-16 flex items-start gap-4 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-[#0E2F52] mb-1">
              Your exact installation depends on your address and order
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This page explains how installation and setup generally work.
              We&apos;ll never show an appointment as booked, a router as
              included, installation as free, or self-install as available until
              your own order confirms it. Diagrams here are illustrative.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              CHOOSE YOUR PATH
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h1 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-4 leading-tight">
            Which connection are you getting?
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Pick the connection type to see the right installation guidance. Not
            sure yet? Check your address — the connection available decides
            which applies.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONNECTION_PATHS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-11 h-11 bg-[#F1F5F9] rounded-xl flex items-center justify-center text-[#0E2F52] mb-6">
                    <IconComponent className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0E2F52] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={card.href}
                    className="inline-flex items-center text-sm font-bold text-[#0E2F52] hover:text-[#0A3A66] group mb-2"
                  >
                    <span>{card.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="text-sm text-gray-500">{card.footnote}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
