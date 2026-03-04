"use client";
import React from "react";
import Link from "next/link";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        className="flex flex-col text-black rounded-xl gap-1.5 min-[1150px]:hidden w-8 h-8 md:w-12 md:h-12 justify-center items-center relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 w-full min-[1150px]:hidden z-50 transition-all duration-300 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <ul className="space-y-4 text-md bg-white p-6 text-gray-700 shadow-lg border-t border-gray-200">
          <li onClick={() => setIsOpen(false)}><Link href="/fibre-packages">Fibre Packages</Link></li>
          <li onClick={() => setIsOpen(false)}><Link href="/business-broadband">Business Broadband</Link></li>
          <li onClick={() => setIsOpen(false)}><Link href="/bundles">Bundles</Link></li>
          <li onClick={() => setIsOpen(false)}><Link href="/check-my-postcode">Check My Postcode</Link></li>
          <li onClick={() => setIsOpen(false)}><Link href="/why-zoiko">Why Zoiko</Link></li>
        </ul>
      </div>
    </>
  );
}
