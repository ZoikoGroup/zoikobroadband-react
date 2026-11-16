"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import CartIcon from "./CartIcon";
import MegaMenu, { AccountPanel, SearchPanel } from "./MegaMenu";
import { NAV } from "./navData";
import { figtree } from "@/app/fonts";
import { useCart } from "@/app/context/CartContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronDown, MapPin, Search, UserRound, X } from "lucide-react";

type OpenPanel = number | "account" | "search" | null;

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { cart } = useCart();

  // Mega menu state (UI only)
  const [openMenu, setOpenMenu] = useState<OpenPanel>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

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
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mega menu on Escape (links close it themselves via onNavigate)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const openNow = useCallback((i: OpenPanel) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(i);
  }, []);
  const closeSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  }, []);
  const closeMenu = useCallback(() => setOpenMenu(null), []);

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
    <header className={`relative ${figtree.className}`}>
      <div className="fixed inset-x-0 top-0 z-50">
        {/* Main bar */}
        <nav ref={navRef} aria-label="Main" className="relative h-20 bg-white shadow-sm dark:bg-gray-950">
          <div className="flex h-full items-center justify-between gap-4 px-4 md:px-6 min-[1680px]:grid min-[1680px]:grid-cols-[1fr_auto_1fr]">

            {/* Logo */}
            <Link href="/" className="shrink-0 justify-self-start">
              <Image
                src="/ZBLogo.svg"
                alt="Zoiko Broadband Logo"
                width={150}
                height={60}
                priority
                className="h-11 w-auto object-contain min-[1200px]:h-[52px]"
              />
            </Link>

            {/* Centre: desktop nav with mega menus */}
            <ul className="hidden h-full flex-1 items-center justify-center gap-1 min-[1200px]:flex min-[1440px]:gap-4 min-[1680px]:flex-none" onMouseLeave={closeSoon}>
              {NAV.map((item, i) => {
                const isOpen = openMenu === i;
                return (
                  <li key={item.label} className="relative flex h-full items-center" onMouseEnter={() => openNow(i)}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`mega-${i}`}
                      onClick={() => setOpenMenu(isOpen ? null : i)}
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-1.5 py-2.5 text-[15px] font-medium xl:px-2.5 xl:text-base text-[#0B2F5B] transition-colors dark:text-white ${
                        isOpen ? "bg-[#E6F0FB] dark:bg-gray-800" : "hover:bg-slate-50 dark:hover:bg-gray-900"
                      }`}
                    >
                      {item.label}
                      <ChevronDown aria-hidden className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} strokeWidth={2} />
                    </button>
                    {isOpen && <span aria-hidden className="absolute inset-x-2 bottom-0 h-1 rounded-t bg-[#F7BE2E]" />}
                  </li>
                );
              })}
            </ul>

            {/* Right side */}
            <div className="flex shrink-0 items-center justify-end gap-3 justify-self-end min-[1440px]:gap-4">
              {/* Search: panel on desktop, Help Centre link on smaller screens */}
              <button
                type="button"
                aria-label={openMenu === "search" ? "Close search" : "Search"}
                aria-expanded={openMenu === "search"}
                aria-controls="mega-search"
                onClick={() => setOpenMenu(openMenu === "search" ? null : "search")}
                className={`hidden h-11 w-11 items-center justify-center rounded-lg text-[#0B2F5B] dark:text-white min-[1360px]:flex ${
                  openMenu === "search" ? "bg-[#E6F0FB] dark:bg-gray-800" : "hover:bg-slate-100 dark:hover:bg-gray-800"
                }`}
              >
                {openMenu === "search" ? <X aria-hidden className="h-5 w-5" /> : <Search aria-hidden className="h-5 w-5" />}
              </button>

              {/* Cart (unchanged behaviour) — shown once it has items, keeping the bar as per design */}
              {cart.length > 0 && (
                <span className="text-[#0B2F5B] dark:text-white">
                  <CartIcon />
                </span>
              )}

              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    aria-expanded={dropdownOpen}
                    className="flex h-11 items-center gap-2 whitespace-nowrap rounded-lg border border-[#0B2F5B] px-3 text-sm font-semibold text-[#0B2F5B] transition hover:bg-[#0B2F5B] hover:text-white dark:border-slate-300 dark:text-white md:text-base"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0B2F5B]/10 text-xs font-bold uppercase">
                      {userName.charAt(0)}
                    </span>
                    <span className="hidden max-w-[120px] truncate sm:block">{userName}</span>
                    <ChevronDown aria-hidden className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                      <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-700">
                        <p className="text-xs text-gray-400 dark:text-gray-500">Signed in as</p>
                        <p className="truncate text-sm font-semibold text-[#10446c] dark:text-white">{userName}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <svg className="h-4 w-4 text-[#10446c] dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Desktop: opens the My Account panel */}
                  <button
                    type="button"
                    aria-expanded={openMenu === "account"}
                    aria-controls="mega-account"
                    onClick={() => setOpenMenu(openMenu === "account" ? null : "account")}
                    className={`hidden h-11 items-center gap-2 whitespace-nowrap rounded-lg border border-[#0B2F5B] px-3 text-[15px] font-medium text-[#0B2F5B] transition dark:border-slate-300 dark:text-white min-[1200px]:flex min-[1440px]:px-4 min-[1440px]:text-base ${
                      openMenu === "account" ? "bg-[#E6F0FB] dark:bg-gray-800" : "hover:bg-slate-50 dark:hover:bg-gray-900"
                    }`}
                  >
                    <UserRound aria-hidden className="h-5 w-5" />
                    My Account
                  </button>
                  {/* Smaller screens: straight to login, as before */}
                  <Link
                    href="/login"
                    className="flex h-11 items-center gap-2 whitespace-nowrap rounded-lg border border-[#0B2F5B] px-3 text-sm font-semibold text-[#0B2F5B] transition hover:bg-[#0B2F5B] hover:text-white dark:border-slate-300 dark:text-white md:px-4 md:text-base min-[1200px]:hidden"
                  >
                    <UserRound aria-hidden className="h-5 w-5" />
                    <span className="hidden sm:inline">My Account</span>
                    <span className="sm:hidden">Login</span>
                  </Link>
                </>
              )}

              <Link
                href="/check-my-postcode"
                className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-lg bg-[#F7BE2E] px-4 text-[15px] font-semibold text-[#0B2F5B] min-[1440px]:px-5 min-[1440px]:text-base transition-colors hover:bg-[#F2B015] lg:flex"
              >
                <MapPin aria-hidden className="h-5 w-5" />
                Check Availability
              </Link>

              {/* Mobile Menu */}
              <HeaderMenu />
            </div>
          </div>

          {/* Mega menu panel */}
          {openMenu !== null && (
            <div
              className="absolute inset-x-0 top-full hidden px-6 pt-2 min-[1200px]:block"
              onMouseEnter={() => typeof openMenu === "number" && openNow(openMenu)}
              onMouseLeave={() => typeof openMenu === "number" && closeSoon()}
            >
              {typeof openMenu === "number" ? (
                <div className="max-h-[calc(100dvh-96px)] overflow-y-auto rounded-2xl overscroll-contain">
                  <MegaMenu item={NAV[openMenu]} id={`mega-${openMenu}`} onNavigate={closeMenu} />
                </div>
              ) : (
                <div className="flex justify-end">
                  <div
                    className={`max-h-[calc(100dvh-96px)] overflow-y-auto rounded-2xl overscroll-contain ${openMenu === "account" ? "w-[980px]" : "w-[900px]"}`}
                  >
                    {openMenu === "account" ? <AccountPanel onNavigate={closeMenu} /> : <SearchPanel onNavigate={closeMenu} />}
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* Page dim behind the mega menu */}
      {openMenu !== null && (
        <div aria-hidden className="fixed inset-0 top-20 z-40 hidden bg-[#0B2F5B]/70 min-[1200px]:block" onClick={closeMenu} />
      )}
    </header>
  );
}
