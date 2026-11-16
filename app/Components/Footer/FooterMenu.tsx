"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FOOTER_SECTIONS } from "./footerData";

/**
 * Mobile / tablet accordion for the footer link groups.
 * Imports the data directly: icons are components, which can't be passed
 * as props from the (server) Footer to this client component.
 */
export default function FooterMenu() {
  const sections = FOOTER_SECTIONS;
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:hidden">
      {sections.map(({ id, title, icon: Icon, links }) => {
        const open = openSection === id;
        return (
          <div key={id} className="border-b border-white/10">
            <button
              type="button"
              onClick={() => setOpenSection(open ? null : id)}
              className="flex w-full items-center justify-between gap-3 py-4 text-left"
              aria-expanded={open}
              aria-controls={`footer-section-${id}`}
            >
              <span className="flex items-center gap-3 font-bold text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F7BE2E]/40 bg-white/5 text-[#F7BE2E]">
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                </span>
                {title}
              </span>
              <ChevronDown aria-hidden className={`h-5 w-5 text-[#F7BE2E] transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <ul id={`footer-section-${id}`} hidden={!open} className="space-y-1 pb-4 pl-12">
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="block py-1.5 text-[15px] text-white/80 transition-colors hover:text-[#F7BE2E]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
