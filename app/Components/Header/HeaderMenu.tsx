"use client";
import React from "react";
import Link from "next/link";

const menuItems = [
  { name: "Fibre Packages", href: "/fibre-packages" },
  { name: "Business Broadband", href: "/business-broadband" },
  { name: "Bundles", href: "/bundles" },
  { name: "Check My Postcode", href: "/check-my-postcode" },
  { name: "Why Zoiko", href: "/why-zoiko" },
];

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="flex flex-col rounded-xl gap-1.5 min-[1150px]:hidden w-8 h-8 md:w-12 md:h-12 justify-center items-center relative"
      >
        <span
          className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`absolute top-full left-0 w-full min-[1150px]:hidden z-50 transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="space-y-4 text-md bg-white dark:bg-gray-900 p-6 text-gray-700 dark:text-gray-200 shadow-lg border-t border-gray-200 dark:border-gray-700">
          {menuItems.map((item) => (
            <li key={item.href} onClick={() => setIsOpen(false)}>
              <Link
                href={item.href}
                className="block py-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}