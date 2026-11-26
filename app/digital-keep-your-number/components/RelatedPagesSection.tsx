import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedPageLink {
  title: string;
  href: string;
}

const relatedPages: RelatedPageLink[] = [
  { title: "Business VoIP", href: "/business-voip" },
  { title: "Cloud Phone Solutions", href: "/cloud-phone-solutions" },
  { title: "Call Features & Add-ons", href: "/call-features-and-addons" },
  { title: "Switch to Zoiko", href: "/switch-to-zoiko" },
  { title: "Moving Home", href: "/moving-home" },
  { title: "Emergency Calling Guide", href: "/emergency-calling-guide" },
];

export default function RelatedPagesSection() {
  return (
    <section
      id="related-pages"
      className="w-full bg-white px-4 py-14 text-[#0E223B] antialiased sm:px-6 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1300px]">
        {/* Centered Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
            <span className="text-[10.5px] font-extrabold uppercase tracking-[0.15em] text-[#B78418]">
              Keep exploring
            </span>
            <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
          </div>

          <h2 className="mt-3 text-[34px] font-extrabold leading-[1.14] tracking-[-0.025em] text-[#0E223B] sm:text-[42px]">
            Related pages
          </h2>
        </div>

        {/* 3x2 Navigation Tile Grid */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPages.map((page) => (
            <Link
              key={page.title}
              href={page.href}
              className="group flex items-center justify-between rounded-xl border border-[#DCE5F0] bg-white px-5 py-4 shadow-[0_2px_8px_rgba(14,34,59,0.02)] transition-all hover:border-[#B6C7DC] hover:bg-[#F8FBFF] hover:shadow-[0_6px_18px_rgba(14,34,59,0.05)] sm:px-6 sm:py-[18px]"
            >
              <span className="text-[13.5px] font-bold tracking-[-0.01em] text-[#0E223B] sm:text-[14px]">
                {page.title}
              </span>

              <ArrowRight
                className="h-4 w-4 shrink-0 text-[#1D3B5E] transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
