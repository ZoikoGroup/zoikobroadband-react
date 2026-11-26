import {
  ArrowLeftRight,
  BookOpen,
  Briefcase,
  CircleUserRound,
  Headphones,
  House,
  Info,
  Layers,
  MapPin,
  Phone,
  ShieldCheck,
  Wifi,
  type LucideIcon,
} from "lucide-react";

export type FooterLink = { name: string; href: string };
export type FooterSection = { id: string; title: string; icon: LucideIcon; links: FooterLink[] };

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    id: "home-broadband",
    title: "Home Broadband",
    icon: House,
    links: [
      { name: "All Home Broadband Plans", href: "/all-broadband-deals" },
      { name: "Full Fibre (FTTP)", href: "/full-fibre" },
      { name: "Part Fibre (SOGEA)", href: "/part-fibre" },
      { name: "Compare Plans & Speeds", href: "/compare-plans" },
      { name: "Which Speed Do I Need?", href: "/which-speed-do-i-need" },
    ],
  },
  {
    id: "business-broadband",
    title: "Business Broadband",
    icon: Briefcase,
    links: [
      { name: "Business Broadband Plans", href: "/business-broadband-plans" },
      { name: "Business Full Fibre", href: "/business-full-fibre" },
      { name: "Static IP Options", href: "/business-broadband" },
      { name: "Multi-site Connectivity", href: "/multi-site-connectivity" },
      { name: "Request a Tailored Quote", href: "/request-a-tailored-quote" },
    ],
  },
  {
    id: "digital-lines",
    title: "Digital Lines",
    icon: Phone,
    links: [
      { name: "Home Digital Phone", href: "/digital-lines" },
      { name: "Business VoIP", href: "/digital-lines" },
      { name: "Cloud Phone Solutions", href: "/cloud-phone-solutions" },
      { name: "Keep Your Number", href: "/digital-keep-your-number" },
      { name: "Emergency Calling Guide", href: "/digital-lines" },
    ],
  },
  {
    id: "bundles",
    title: "Bundles",
    icon: Layers,
    links: [
      { name: "Home Bundles", href: "/bundles" },
      { name: "Business Bundles", href: "/bundles" },
      { name: "Broadband & Mobile", href: "/bundles" },
      { name: "Compare Bundle Savings", href: "/bundles" },
      { name: "Bundle Terms & Eligibility", href: "/terms-conditions" },
    ],
  },
  {
    id: "check-availability",
    title: "Check Availability",
    icon: MapPin,
    links: [
      { name: "Check Broadband Availability", href: "/check-availability" },
      { name: "Address Checker", href: "/check-my-postcode" },
      { name: "Find Your Plan", href: "/fibre-packages" },
      { name: "Broadband Coverage FAQs", href: "/check-my-postcode" },
      { name: "Installation Availability", href: "/setup-installation" },
    ],
  },
  {
    id: "switching",
    title: "Switching & Moving",
    icon: ArrowLeftRight,
    links: [
      { name: "Switch to Zoiko", href: "/switch-to-zoiko" },
      { name: "Moving Home", href: "/moving-home" },
      { name: "How Switching Works", href: "/setup-installation" },
      { name: "Keep Your Number", href: "/keep-your-phone-number" },
      { name: "Installation & Set-up", href: "/setup-installation" },
    ],
  },
  {
    id: "help",
    title: "Help & Support",
    icon: Headphones,
    links: [
      { name: "Help Centre & FAQs", href: "/get-help" },
      { name: "Broadband Troubleshooting", href: "/led-light-meanings" },
      { name: "Report a Fault", href: "/report-a-fault" },
      { name: "Service Status & Updates", href: "/report-a-fault" },
      { name: "Contact Support", href: "/contact-us" },
    ],
  },
  {
    id: "account",
    title: "My Account",
    icon: CircleUserRound,
    links: [
      { name: "Log In to My Account", href: "/login" },
      { name: "Track Your Order", href: "/dashboard" },
      { name: "Billing & Payments", href: "/payments-billing" },
      { name: "Manage Your Services", href: "/managed-services" },
      { name: "Account Security", href: "/dashboard" },
    ],
  },
  {
    id: "wifi",
    title: "Wi-Fi & Equipment",
    icon: Wifi,
    links: [
      { name: "Routers & Wi-Fi", href: "/installation-routers" },
      { name: "Installation Guides", href: "/installation-guide" },
      { name: "Improve Your Wi-Fi", href: "/change-wi-fi-channel" },
      { name: "Equipment & Returns", href: "/get-help" },
      { name: "Digital Phone Set-up", href: "/digital-lines" },
    ],
  },
  {
    id: "guides",
    title: "Guides & Advice",
    icon: BookOpen,
    links: [
      { name: "Fibre Explained", href: "/blogs" },
      { name: "Broadband Speed Guide", href: "/wired-a-wireless-speed" },
      { name: "Switching Guides", href: "/blogs" },
      { name: "Online Safety", href: "/blogs" },
      { name: "Customer FAQs", href: "/get-help" },
    ],
  },
  {
    id: "about",
    title: "About Zoiko",
    icon: Info,
    links: [
      { name: "Why Choose Zoiko", href: "/why-zoiko" },
      { name: "About Us", href: "/about-us" },
      { name: "Our Connectivity Approach", href: "/ofcom-speed-commitment" },
      { name: "Careers", href: "/careers" },
      { name: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    id: "legal",
    title: "Legal & Trust",
    icon: ShieldCheck,
    links: [
      { name: "Terms & Conditions", href: "/terms-conditions" },
      { name: "Privacy Notice", href: "/privacy-notice" },
      { name: "Cookie Policy & Settings", href: "/cookies-policy" },
      { name: "Complaints & ADR", href: "/contact-us" },
      { name: "Accessibility & Inclusion", href: "/accessibility-statement" },
    ],
  },
];

export const BOTTOM_LINKS: FooterLink[] = [
  { name: "Terms & Conditions", href: "/terms-conditions" },
  { name: "Privacy Notice", href: "/privacy-notice" },
  { name: "Cookie Policy", href: "/cookies-policy" },
  { name: "Cookie Settings", href: "/cookies-policy" },
  { name: "Accessibility", href: "/accessibility-statement" },
  { name: "Complaints & ADR", href: "/contact-us" },
  { name: "Digital Voice 999 Guidance", href: "/digital-lines" },
  // Kept from the previous footer so no page loses its footer link
  { name: "Refer a Friend", href: "/refer-a-friend" },
  { name: "Our Sustainability", href: "/our-sustainability" },
  { name: "Zoiko Group", href: "/zoiko-group" },
  { name: "Partners & Affiliations", href: "/partnership" },
];
