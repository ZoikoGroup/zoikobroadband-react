import React from "react";
import Link from "next/link";

const QUOTE_PAGE_NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Start your request", href: "#start-your-request" },
  { label: "Privacy", href: "#privacy" },
  { label: "FAQs", href: "#faqs" },
] as const;

export default function RequestQuoteSubNav() {
  return (
    <nav
      aria-label="Request a tailored quote sections"
      className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-xs border-b border-gray-200/80 text-[#0E2F52] font-sans antialiased"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-start sm:justify-between gap-8 overflow-x-auto py-4 text-xs sm:text-sm font-bold text-[#0E2F52] whitespace-nowrap">
          {QUOTE_PAGE_NAV_LINKS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="hover:text-[#0A3A66] transition-colors py-1"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
