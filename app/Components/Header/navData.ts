import {
  ArrowLeftRight,
  Briefcase,
  Building2,
  Calculator,
  Clock,
  House,
  Layers,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  Router,
  Settings,
  ShieldCheck,
  Headphones,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type NavLink = { label: string; href: string };
export type NavColumn = { title: string; icon: LucideIcon; links: NavLink[] };

export type NavAside =
  | { kind: "checks"; title: string; icon?: LucideIcon; points: string[]; link?: NavLink }
  | { kind: "channels"; title: string; channels: { icon: LucideIcon; title: string; text: string }[] };

export type NavFooter =
  | { kind: "postcode" }
  | { kind: "cta"; icon: LucideIcon; title: string; text: string; cta: NavLink };

export type NavItem = {
  label: string;
  intro: { title: string; text: string; image: string; alt: string };
  columns: NavColumn[];
  aside: NavAside;
  footer: NavFooter;
};

export const NAV: NavItem[] = [
  {
    label: "Home Broadband",
    intro: {
      title: "Home Broadband",
      text: "Choose the right connection for your home.",
      image: "/Images/dropdown/home-broadband-menu.webp",
      alt: "A bright living room with a yellow armchair",
    },
    columns: [
      {
        title: "Explore broadband",
        icon: House,
        links: [
          { label: "All home broadband deals", href: "/all-broadband-deals" },
          { label: "Full Fibre Broadband (FTTP)", href: "/full-fibre" },
          { label: "Part Fibre Broadband (SOGEA)", href: "/part-fibre" },
          { label: "Compare plans & speeds", href: "/compare-plans" },
          { label: "Which speed do I need?", href: "/which-speed-do-i-need" },
        ],
      },
      {
        title: "Getting connected",
        icon: Zap,
        links: [
          { label: "Switch to Zoiko", href: "/switch-to-zoiko" },
          { label: "Moving home", href: "/moving-home" },
          { label: "Installation & routers", href: "/installation-routers" },
          { label: "Check availability", href: "/check-availability" },
          { label: "Getting started guides", href: "/installation-guide" },
        ],
      },
      {
        title: "Equipment & help",
        icon: Router,
        links: [
          { label: "Routers & Wi-Fi", href: "/setup-installation" },
          { label: "Wi-Fi troubleshooting", href: "/change-wi-fi-channel" },
          { label: "Plan add-ons", href: "/bundles" },
          { label: "Manage my broadband", href: "/dashboard" },
          { label: "Help Centre & FAQs", href: "/get-help" },
        ],
      },
    ],
    aside: {
      kind: "checks",
      title: "Before you choose",
      points: ["Address-level eligibility", "Plan-specific speeds", "Clear pricing & terms", "Simple switching guidance"],
    },
    footer: { kind: "postcode" },
  },
  {
    label: "Business Broadband",
    intro: {
      title: "Business Broadband",
      text: "Business connectivity with a clear route to a tailored quote.",
      image: "/Images/dropdown/business-broadband-menu.webp",
      alt: "A team collaborating at desks in a busy office",
    },
    columns: [
      {
        title: "Business connectivity",
        icon: Building2,
        links: [
          { label: "Business broadband plans", href: "/business-broadband-plans" },
          { label: "Business Full Fibre (FTTP)", href: "/business-full-fibre" },
          { label: "Part Fibre (SOGEA)", href: "/business-part-fibre" },
          { label: "Static IP options", href: "/business-broadband" },
          { label: "Multi-site connectivity", href: "/multi-site-connectivity" },
        ],
      },
      {
        title: "Phone & voice",
        icon: Phone,
        links: [
          { label: "Business VoIP / Digital Lines", href: "/digital-lines" },
          { label: "Cloud phone solutions", href: "/cloud-phone-solutions" },
          { label: "Keep your business number", href: "/digital-lines" },
          { label: "Call features & add-ons", href: "/call-features" },
          { label: "VoIP support", href: "/get-help" },
        ],
      },
      {
        title: "Business services",
        icon: Briefcase,
        links: [
          { label: "Installation & onboarding", href: "/installation-onboarding" },
          { label: "Support & SLA options", href: "/business-support" },
          { label: "Connectivity consultation", href: "/contact-us" },
          { label: "Request tailored quote", href: "/request-a-tailored-quote" },
          { label: "Business FAQs", href: "/get-help" },
        ],
      },
    ],
    aside: {
      kind: "checks",
      title: "Business buying checklist",
      points: [
        "Serviceability checked for your address",
        "SLAs only where contracted",
        "Static IP eligibility confirmed",
        "Services from our verified catalogue",
      ],
    },
    footer: {
      kind: "cta",
      icon: Briefcase,
      title: "Need a tailored solution?",
      text: "Speak with the business team.",
      cta: { label: "Request a quote", href: "/business-broadband" },
    },
  },
  {
    label: "Digital Lines",
    intro: {
      title: "Digital Lines",
      text: "Digital phone services for households and businesses.",
      image: "/Images/dropdown/digital-lines-menu.webp",
      alt: "A smartphone home screen full of apps",
    },
    columns: [
      {
        title: "Home digital phone",
        icon: House,
        links: [
          { label: "Home digital phone", href: "/digital-lines" },
          { label: "Broadband and phone bundles", href: "/bundles" },
          { label: "Keep your home number", href: "/digital-lines" },
          { label: "Equipment and setup", href: "/setup-installation" },
          { label: "Home phone FAQs", href: "/get-help" },
        ],
      },
      {
        title: "Business voice",
        icon: Briefcase,
        links: [
          { label: "Business VoIP", href: "/digital-lines" },
          { label: "Cloud phone solutions", href: "/digital-lines" },
          { label: "Call features and options", href: "/digital-lines" },
          { label: "Business number transfer", href: "/digital-lines" },
          { label: "Request a voice quote", href: "/business-broadband" },
        ],
      },
      {
        title: "Important guidance",
        icon: ShieldCheck,
        links: [
          { label: "Digital voice switchover", href: "/landline" },
          { label: "Emergency calling (999/112)", href: "/digital-lines" },
          { label: "Power cut and backup guidance", href: "/digital-lines" },
          { label: "Number transfer progress", href: "/dashboard" },
          { label: "Voice support & faults", href: "/report-a-fault" },
        ],
      },
    ],
    aside: {
      kind: "checks",
      title: "Safety & clarity",
      icon: ShieldCheck,
      points: [
        "Eligibility and price shown upfront",
        "How a power cut affects your phone",
        "Emergency access guidance",
        "Number transfer checks before you switch",
      ],
      link: { label: "Read emergency calling guidance", href: "/digital-lines" },
    },
    footer: {
      kind: "cta",
      icon: PhoneCall,
      title: "Find digital phone options",
      text: "Check the services available.",
      cta: { label: "Explore Digital Lines", href: "/digital-lines" },
    },
  },
  {
    label: "Bundles",
    intro: {
      title: "Bundles",
      text: "Connect services together where they are available at your address.",
      image: "/Images/dropdown/bundles-menu.webp",
      alt: "A bright open-plan living room",
    },
    columns: [
      {
        title: "Home bundles",
        icon: House,
        links: [
          { label: "Broadband & digital phone", href: "/bundles" },
          { label: "Broadband & mobile", href: "/bundles" },
          { label: "Connected home", href: "/bundles" },
          { label: "Compare eligible bundles", href: "/bundles" },
          { label: "Home bundle terms", href: "/terms-conditions" },
        ],
      },
      {
        title: "Business bundles",
        icon: Briefcase,
        links: [
          { label: "Broadband & business VoIP", href: "/bundles" },
          { label: "Business connectivity & mobile", href: "/bundles" },
          { label: "Multi-site options", href: "/multi-site-connectivity" },
          { label: "Request a bundle quote", href: "/bundles" },
        ],
      },
      {
        title: "Build & compare",
        icon: Calculator,
        links: [
          { label: "Choose your services", href: "/bundles" },
          { label: "See compatible plans", href: "/all-plans" },
          { label: "Review total monthly cost", href: "/bundles" },
          { label: "Compare bundle savings", href: "/bundles" },
          { label: "Eligibility & conditions", href: "/terms-conditions" },
        ],
      },
    ],
    aside: {
      kind: "checks",
      title: "Clear bundle pricing",
      points: [
        "Only bundles you can order",
        "Savings based on real prices",
        "Separate and bundle prices side by side",
        "One bill where supported",
      ],
    },
    footer: {
      kind: "cta",
      icon: Layers,
      title: "Bundle options for your address",
      text: "Compare verified, eligible services.",
      cta: { label: "Compare bundles", href: "/bundles" },
    },
  },
  {
    label: "Help & Support",
    intro: {
      title: "Help & Support",
      text: "Straightforward help before and after you join.",
      image: "/Images/dropdown/help-support-menu.webp",
      alt: "A smiling Zoiko customer adviser",
    },
    columns: [
      {
        title: "Get help",
        icon: LifeBuoy,
        links: [
          { label: "Help Centre & FAQs", href: "/get-help" },
          { label: "Broadband troubleshooting", href: "/led-light-meanings" },
          { label: "Routers & Wi-Fi help", href: "/change-wi-fi-channel" },
          { label: "Digital Lines support", href: "/digital-lines" },
          { label: "Installation guides", href: "/installation-guide" },
        ],
      },
      {
        title: "Manage services",
        icon: Settings,
        links: [
          { label: "Track your order", href: "/dashboard" },
          { label: "Report a broadband fault", href: "/report-a-fault" },
          { label: "Service status & updates", href: "/report-a-fault" },
          { label: "Billing & payments", href: "/payments-billing" },
          { label: "Sign in to manage service", href: "/login" },
        ],
      },
      {
        title: "Switching & policies",
        icon: ArrowLeftRight,
        links: [
          { label: "Switch to Zoiko", href: "/why-zoiko" },
          { label: "Moving home", href: "/moving-home" },
          { label: "Change or cancel a plan", href: "/contact-us" },
          { label: "Complaints & escalation", href: "/contact-us" },
          { label: "Accessibility support", href: "/accessibility-statement" },
        ],
      },
    ],
    aside: {
      kind: "channels",
      title: "Contact channels",
      channels: [
        { icon: MessageCircle, title: "Live chat", text: "When an adviser is available" },
        { icon: Phone, title: "Phone support", text: "Opening hours shown on the contact page" },
        { icon: Mail, title: "Email / support form", text: "Send details and get a reply" },
        { icon: Clock, title: "Service hours", text: "Clear hours for every channel" },
      ],
    },
    footer: {
      kind: "cta",
      icon: Headphones,
      title: "Still need assistance?",
      text: "Reach the right support team.",
      cta: { label: "Contact support", href: "/contact-us" },
    },
  },
];

/* ── Search (client-side only, over the site's own pages) ──────────────── */

export const POPULAR_SEARCHES = ["Broadband availability", "Switch to Zoiko", "Plans and speeds", "Moving home", "Router and Wi-Fi help"];

export const QUICK_LINKS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Home Broadband", href: "/fibre-packages", icon: Router },
  { label: "Business Broadband", href: "/business-broadband", icon: Building2 },
  { label: "Digital Lines", href: "/digital-lines", icon: Phone },
  { label: "Bundles", href: "/bundles", icon: Layers },
  { label: "Help Centre", href: "/get-help", icon: LifeBuoy },
];

/** Flat, de-duplicated index of every page the menus point to, plus a few extra keywords. */
export const SEARCH_INDEX: { label: string; href: string; keywords: string }[] = (() => {
  const extra = [
    { label: "Check broadband availability", href: "/check-availability", keywords: "availability postcode address coverage" },
    { label: "Plans and speeds", href: "/fibre-packages", keywords: "plans speeds packages prices deals" },
    { label: "Moving home", href: "/moving-home", keywords: "moving home house move" },
    { label: "Router and Wi-Fi help", href: "/change-wi-fi-channel", keywords: "router wifi wi-fi channel" },
    { label: "Router light meanings", href: "/led-light-meanings", keywords: "router led lights" },
    { label: "Why Zoiko", href: "/why-zoiko", keywords: "switch switching why zoiko" },
    { label: "Contact us", href: "/contact-us", keywords: "contact phone email chat" },
    { label: "Privacy notice", href: "/privacy-notice", keywords: "privacy data" },
  ];
  const fromNav = NAV.flatMap((n) =>
    n.columns.flatMap((c) => c.links.map((l) => ({ label: l.label, href: l.href, keywords: `${n.label} ${c.title}` }))),
  );
  const seen = new Set<string>();
  return [...extra, ...fromNav].filter((e) => {
    const key = e.label.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
})();

export const MAP_PIN = MapPin;
