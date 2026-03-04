"use client";
import { useState } from "react";
import Link from "next/link";

export default function FooterMenu({ sections }: any) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="lg:hidden flex flex-col gap-2">
      {sections.map((section: any) => (
        <div key={section.id} className="border-b border-[#2a6d9e]">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between py-4 text-left"
            aria-expanded={openSection === section.id}
          >
            <h2 className="text-xl text-[#f5c241] font-bold">
              {section.title}
            </h2>

            <svg
              className={`w-5 h-5 text-[#f5c241] transition-transform duration-300 ${
                openSection === section.id ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${
            openSection === section.id ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}>
            <ul className="text-[#CBD5E1] text-base leading-7 space-y-2">
              {section.links.map((link: any, index: number) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-[#f5c241] block py-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
