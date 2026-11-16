import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { figtree } from "@/app/fonts";
import FooterMenu from "./FooterMenu";
import { BOTTOM_LINKS, FOOTER_SECTIONS } from "./footerData";

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/zoiko-broadband/", icon: FaLinkedinIn },
  { name: "Facebook", href: "https://www.facebook.com/ZoikoBroadband/", icon: FaFacebookF },
  { name: "Instagram", href: "https://www.instagram.com/zoikobroadband/", icon: FaInstagram },
  { name: "YouTube", href: "https://www.youtube.com/@ZoikoBroadband", icon: FaYoutube },
  { name: "X", href: "https://x.com/zoikobroadband", icon: FaXTwitter },
];

const supportLinks = [
  { name: "Contact Support", href: "/contact-us" },
  { name: "Track Order", href: "/dashboard" },
  { name: "Report a Fault", href: "/report-a-fault" },
  { name: "Service Status", href: "/report-a-fault" },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className={`w-full border-t-4 border-[#F7BE2E] bg-[#071E3D] text-white ${figtree.className}`}>
      <div className="px-4 sm:px-6">
        {/* Top band */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-9 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
            <Link href="/" className="w-fit shrink-0 rounded-2xl bg-white px-5 py-4">
              <Image src="/ZBLogo.svg" alt="Zoiko Broadband home" width={150} height={60} className="h-11 w-auto" />
            </Link>
            <div>
              <p className="text-2xl font-extrabold tracking-tight sm:text-[28px]">Connectivity, made clear.</p>
              <p className="mt-2 text-white/80">Explore services, manage your connection and get the support you need.</p>
            </div>
          </div>
          <Link
            href="/availability"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-[#F7BE2E] px-6 py-4 font-bold text-[#0B2F5B] transition-colors hover:bg-[#F2B015]"
          >
            <MapPin aria-hidden className="h-5 w-5" />
            Check Availability
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        {/* Link groups — desktop grid */}
        <nav aria-label="Footer" className="hidden grid-cols-6 gap-x-6 gap-y-12 border-b border-white/10 py-12 lg:grid">
          {FOOTER_SECTIONS.map(({ id, title, icon: Icon, links }) => (
            <div key={id}>
              <h2 className="flex items-center gap-3 font-bold">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#F7BE2E]/40 bg-white/5 text-[#F7BE2E]">
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                </span>
                <span className="text-[15px] xl:text-base">{title}</span>
              </h2>
              <ul className="mt-6 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[15px] text-white/80 transition-colors hover:text-[#F7BE2E]">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Link groups — mobile accordion */}
        <div className="border-b border-white/10 py-4 lg:hidden">
          <FooterMenu />
        </div>

        {/* Contact row */}
        <div className="grid gap-10 border-b border-white/10 py-10 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_auto]">
          <div>
            <h2 className="font-bold text-[#F7BE2E]">Zoiko Group — UK Headquarters</h2>
            <address className="mt-4 not-italic leading-relaxed text-white/90 sm:text-lg">
              167–169 Great Portland Street, 5th Floor
              <br />
              London W1W 5PF, United Kingdom
            </address>
            <p className="mt-2 text-sm text-white/70">Group UK office. Not the registered office.</p>
          </div>

          <div>
            <h2 className="font-bold text-[#F7BE2E]">Customer Support</h2>
            <a href="tel:+442071646399" className="mt-4 inline-flex items-center gap-3 text-xl font-bold hover:text-[#F7BE2E]">
              <Phone aria-hidden className="h-5 w-5 text-[#F7BE2E]" />
              +44 (0)20 7164 6399
            </a>
            <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              {supportLinks.map((l, i) => (
                <li key={l.name} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-[#F7BE2E]" />}
                  <Link href={l.href} className="hover:text-[#F7BE2E]">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-[#F7BE2E]">Follow Zoiko</h2>
            <ul className="mt-4 flex flex-wrap gap-4">
              {socials.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Zoiko Broadband on ${name}`}
                    className="group flex flex-col items-center gap-1.5 text-xs text-white/60 hover:text-white"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-[#0B2F5B] transition-colors group-hover:bg-[#F7BE2E]">
                      <Icon aria-hidden className="h-[18px] w-[18px]" />
                    </span>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="py-9 text-center">
          <p className="font-bold sm:text-lg">
            &copy; 2026 Zoiko Telecom Ltd. Zoiko Broadband is a trading name of Zoiko Telecom Ltd. All rights reserved.
          </p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 text-white/80">
            <span>Registered in England and Wales</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[#F7BE2E]" />
            <span>Company No. 15021457</span>
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {BOTTOM_LINKS.map((l) => (
              <li key={l.name}>
                <Link href={l.href} className="underline underline-offset-4 hover:text-[#F7BE2E]">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/75">
            Plans and availability depend on your address. Bundles and prices are subject to verified terms and eligibility.
          </p>
        </div>
      </div>
    </footer>
  );
}
