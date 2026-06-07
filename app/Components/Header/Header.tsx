"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import CartIcon from "./CartIcon";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const name =
          user.first_name
            ? `${user.first_name}${user.last_name ? " " + user.last_name : ""}`
            : user.username || "Account";
        setUserName(name);
      } catch {
        setUserName("Account");
      }
    };

    checkAuth();
    window.addEventListener("authChanged", checkAuth);
    return () => window.removeEventListener("authChanged", checkAuth);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    window.dispatchEvent(new Event("authChanged"));
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <header className="relative">
      <nav className="bg-white dark:bg-gray-950 fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 md:px-8 lg:px-16 shadow-sm">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/ZBLogo.svg"
            alt="Zoiko Broadband Logo"
            width={150}
            height={60}
            priority
            className="w-auto h-12 md:h-16 object-contain"
          />
        </Link>

        {/* Desktop Nav Items */}
        <div className="nav-items">
          <ul className="hidden min-[1150px]:flex items-center gap-10 md:gap-14 bg-gray-100 dark:bg-gray-800 rounded-full px-6 py-4 md:px-7 md:py-5 md:text-base max-w-fit">
            <li><Link href="/fibre-packages">Fibre Packages</Link></li>
            <li><Link href="/business-broadband">Business Broadband</Link></li>
            <li><Link href="/bundles">Bundles</Link></li>
            <li><Link href="/check-my-postcode">Check My Postcode</Link></li>
            <li><Link href="/why-zoiko">Why Zoiko</Link></li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-5 px-2 md:px-4">

          <CartIcon />

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar button */}
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 bg-[#10446c] text-white px-3 py-2 rounded-md hover:bg-[#0d3a5a] transition h-9 md:h-11 text-sm md:text-base"
              >
                {/* Circle avatar with initial */}
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold uppercase">
                  {userName.charAt(0)}
                </span>
                <span className="hidden sm:block max-w-[120px] truncate">{userName}</span>
                {/* Chevron */}
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-400 dark:text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold text-[#10446c] dark:text-white truncate">{userName}</p>
                  </div>

                  {/* Dashboard */}
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <svg className="w-4 h-4 text-[#10446c] dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-[#10446c] text-white cursor-pointer px-2 py-1 md:px-3 md:py-2 rounded-md hover:bg-[#0d3a5a] transition h-9 md:h-11 text-sm md:text-base">
                Login
              </button>
            </Link>
          )}

          {/* Mobile Menu */}
          <HeaderMenu />

        </div>
      </nav>
    </header>
  );
}
