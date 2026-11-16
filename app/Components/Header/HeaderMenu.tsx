"use client";
import React from "react";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { NAV } from "./navData";
import { MenuLink, MenuPostcodeBar } from "./MegaMenu";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [section, setSection] = React.useState<number | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const close = () => {
    setIsOpen(false);
    setSection(null);
  };

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl min-[1150px]:hidden"
      >
        <span className={`block h-0.5 w-6 bg-[#0B2F5B] transition-all duration-300 dark:bg-gray-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block h-0.5 w-6 bg-[#0B2F5B] transition-all duration-300 dark:bg-gray-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`block h-0.5 w-6 bg-[#0B2F5B] transition-all duration-300 dark:bg-gray-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`absolute left-0 top-full z-50 w-full min-[1150px]:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <div className="max-h-[calc(100vh-80px)] overflow-y-auto border-t border-slate-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <ul className="divide-y divide-slate-200 dark:divide-gray-800">
            {NAV.map((item, i) => {
              const open = section === i;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`m-sec-${i}`}
                    onClick={() => setSection(open ? null : i)}
                    className="flex w-full items-center justify-between py-4 text-left text-lg font-bold text-[#0B2F5B] dark:text-white"
                  >
                    {item.label}
                    <ChevronDown aria-hidden className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <div id={`m-sec-${i}`} hidden={!open} className="pb-4">
                    {item.columns.map(({ title, icon: Icon, links }) => (
                      <div key={title} className="mb-4">
                        <p className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#B8862B]">
                          <Icon aria-hidden className="h-4 w-4" />
                          {title}
                        </p>
                        <ul>
                          {links.map((l) => (
                            <li key={l.label}>
                              <MenuLink href={l.href} label={l.label} onNavigate={close} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 rounded-2xl bg-[#EAF2FC] p-4 dark:bg-gray-800">
            <p className="mb-3 flex items-center gap-2 font-bold text-[#0B2F5B] dark:text-white">
              <MapPin aria-hidden className="h-5 w-5" />
              Check what is available
            </p>
            <MenuPostcodeBar onNavigate={close} idSuffix="mobile" />
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
            <Link href="/dashboard" onClick={close} className="hover:underline">Track order</Link>
            <Link href="/contact-us" onClick={close} className="hover:underline">Contact us</Link>
            <Link href="/accessibility-statement" onClick={close} className="hover:underline">Accessibility</Link>
          </div>
        </div>
      </div>
    </>
  );
}
