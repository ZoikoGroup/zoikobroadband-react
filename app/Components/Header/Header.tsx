"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import CartIcon from "./CartIcon";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // listen for login/logout changes
    window.addEventListener("authChanged", checkAuth);

    return () => {
      window.removeEventListener("authChanged", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    //  trigger update across app
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

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3 md:gap-5 px-2 md:px-4">

          <CartIcon />

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-[#10446c] text-white cursor-pointer px-2 py-1 md:px-3 md:py-2 rounded-md hover:bg-[#0d3a5a] transition h-9 md:h-11 text-sm md:text-base"
            >
              Logout
            </button>
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