import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
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
            
            <li className="hover:text-blue-900 dark:text-white dark:hover:text-blue-400 cursor-pointer">
              <Link href="/fibre-packages">Fibre Packages</Link>
            </li>

            <li className="hover:text-blue-900 dark:text-white dark:hover:text-blue-400 cursor-pointer">
              <Link href="/business-broadband">Business Broadband</Link>
            </li>

            <li className="hover:text-blue-900 dark:text-white dark:hover:text-blue-400 cursor-pointer">
              <Link href="/bundles">Bundles</Link>
            </li>

            <li className="hover:text-blue-900 dark:text-white dark:hover:text-blue-400 cursor-pointer">
              <Link href="/check-my-postcode">Check My Postcode</Link>
            </li>

            <li className="hover:text-blue-900 dark:text-white dark:hover:text-blue-400 cursor-pointer">
              <Link href="/why-zoiko">Why Zoiko</Link>
            </li>

          </ul>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">

          <Link href="/login">
            <button className="bg-[#10446c] text-white px-3 py-2 rounded-md hover:bg-blue-600 transition h-9 md:h-11 text-sm md:text-base">
              MyZoiko
            </button>
          </Link>

          {/* Mobile Menu */}
          <HeaderMenu />

        </div>
      </nav>
    </header>
  );
}