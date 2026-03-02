import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  return (
    <div className="relative">
      <nav className="bg-white fixed top-0 z-50 flex w-full items-center justify-around px-4 py-4 md:px-8 lg:px-16 ">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/ZBLogo.svg"
            alt="Zoiko Broadband Logo"
            width={150}
            height={60}
            priority
            className="w-auto h-12 md:h-16 lg:h-18 object-contain"
          />
        </Link>

        {/* Desktop Nav Items */}
        <div className="nav-items">
          <ul className="hidden min-[1150px]:flex items-center gap-10 md:gap-14 bg-gray-100 rounded-full px-6 py-4 md:px-7 md:py-6 md:text-base max-w-fit">
            <li className="hover:text-blue-900 dark:hover:text-blue-500 cursor-pointer">
              <Link href="/fibre-packages">Fibre Packages</Link>
            </li>
            <li className="hover:text-blue-900 dark:hover:text-blue-500 cursor-pointer">
              <Link href="/business-broadband">Business Broadband</Link>
            </li>
            <li className="hover:text-blue-900 dark:hover:text-blue-500 cursor-pointer">
              <Link href="/bundles">Bundles</Link>
            </li>
            <li className="hover:text-blue-900 dark:hover:text-blue-500 cursor-pointer">
              <Link href="/check-my-postcode">Check My Postcode</Link>
            </li>
            <li className="hover:text-blue-900 dark:hover:text-blue-500 cursor-pointer">
              <Link href="/why-zoiko">Why Zoiko</Link>
            </li>
          </ul>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="bg-[#10446c] text-white px-2 py-2 rounded-md hover:bg-blue-600 h-9 md:h-12 lg:h-13 text-sm md:text-base lg:text-lg">
              MyZoiko{" "}
              <span>
                <select className="bg-transparent text-white text-sm md:text-base lg:text-lg justify-center"></select>
              </span>
            </button>
          </Link>

          {/* Hamburger Button with Animation */}
          <HeaderMenu />
        </div>
      </nav>
    </div>
  );
}
