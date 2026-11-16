import type { StepId } from "../types";

type Segment = { readonly text: string; readonly accent?: boolean };

export const HERO: Record<
  StepId,
  {
    readonly src: string;
    readonly eyebrow?: string;
    readonly title: readonly Segment[];
    readonly subtitle?: string;
  }
> = {
  availability: {
    src: "/Images/flow/1.png",
    eyebrow: "Zoiko Broadband",
    title: [{ text: "Check " }, { text: "availability", accent: true }],
    subtitle:
      "Enter your postcode to find your exact address and see which Zoiko Broadband services you can order.",
  },
  plans: {
    src: "/Images/flow/2.png",
    eyebrow: "Zoiko Broadband",
    title: [
      { text: "Compare our " },
      { text: "broadband plans", accent: true },
    ],
    subtitle:
      "Choose the right broadband for your home with fast, reliable connectivity, great value and award-winning support.",
  },
  personalise: {
    src: "/Images/flow/3.png",
    eyebrow: "Zoiko Broadband",
    title: [{ text: "Personalise your " }, { text: "package", accent: true }],
    subtitle:
      "Make it your own by choosing your router and any optional extras.",
  },
  switching: {
    src: "/Images/flow/4.png",
    eyebrow: "Zoiko Broadband",
    title: [{ text: "Switching & " }, { text: "installation", accent: true }],
    subtitle:
      "Tell us about your current service, choose your installation option and set a convenient date.",
  },
  details: {
    src: "/Images/flow/5.png",
    eyebrow: "Zoiko Broadband",
    title: [{ text: "Your details, " }, { text: "review & pay", accent: true }],
    subtitle:
      "Check everything is right, add your details and set up payment. We'll show your full contract before you commit.",
  },
  confirmation: {
    src: "/Images/flow/6.png",
    eyebrow: "Zoiko Broadband",
    title: [{ text: "Order " }, { text: "confirmed", accent: true }],
    subtitle:
      "Thank you! Your Zoiko Broadband order has been placed successfully. We'll now get everything ready for your installation.",
  },
  tracking: {
    src: "/Images/flow/7.png",
    eyebrow: "Zoiko Broadband",
    title: [{ text: "We're setting up your broadband" }],
    subtitle:
      "Track every step from order to live connection. We'll email and text you as things progress — there's nothing you need to do right now.",
  },
  connected: {
    src: "/Images/flow/8.png",
    eyebrow: "Zoiko Broadband",
    title: [{ text: "Get " }, { text: "Connected", accent: true }],
    subtitle:
      "Your broadband is active! Here's everything you need to get the most from your new Zoiko Broadband service.",
  },
  myzoiko: {
    src: "/Images/flow/9.png",
    title: [{ text: "MyZoiko" }],
    subtitle: "Manage your broadband, billing, and support — all in one place.",
  },
  moving: {
    src: "/Images/flow/10.png",
    title: [{ text: "Moving home? Let's get you connected." }],
    subtitle:
      "Tell us where you're moving and when. We'll check broadband availability at your new address before you make any changes.",
  },
};

export const JOURNEY_STAGES = [
  "Availability",
  "Compare Plans",
  "Personalise Package",
  "Switching & Installation",
  "Review & Pay",
  "Confirmation",
  "Get Connected",
] as const;

export const STAGE_INDEX: Partial<Record<StepId, number>> = {
  availability: 0,
  plans: 1,
  personalise: 2,
  switching: 3,
  details: 4,
  confirmation: 5,
  tracking: 6,
  connected: 6,
};

export const STEPPER_LABELS = [
  "Check availability",
  "Compare plans",
  "Personalise",
  "Your details",
  "Review & pay",
  "Confirm",
] as const;

export const STEPPER_INDEX: Partial<Record<StepId, number>> = {
  plans: 1,
  personalise: 2,
  switching: 2,
  details: 3,
  confirmation: 4,
  tracking: 5,
};

export const HELP_ITEMS = [
  {
    id: "support",
    label: "Need help?",
    text: "Our UK-based support team is here for you 7 days a week.",
    icon: "headphones",
  },
  { id: "call", label: "Call us", text: "0800 321 4321", icon: "phone" },
  { id: "chat", label: "Live chat", text: "Chat with our team", icon: "chat" },
  {
    id: "privacy",
    label: "Private by design",
    text: "We only use your postcode to check coverage.",
    icon: "lock",
  },
] as const;

export const CONTROL_POINTS = [
  "Checking availability doesn't place an order or take a payment.",
  "Prices and plans are shown only once your exact address is confirmed.",
  "No sign-in needed to check coverage or compare plans.",
] as const;

export const JARGON = [
  {
    term: "Full Fibre (FTTP)",
    text: "Fibre runs straight to your home for the fastest, most reliable speeds.",
  },
  {
    term: "SoGEA",
    text: "Fibre to the street cabinet, then copper to your home — no separate phone line needed.",
  },
] as const;

export const PLAN_BENEFITS = [
  "No setup fee",
  "Zoiko router included",
  "UK-based support",
  "Clear, fair contracts",
] as const;

export const PLAN_TAGLINES = [
  "Reliable broadband for everyday use",
  "Faster broadband for busy homes",
  "Our fastest, most reliable broadband",
] as const;

export const PLAN_BADGES = [
  "Great value",
  "Our best-selling plan",
  "Blazing fast",
] as const;

export const PLAN_FEATURES = [
  [
    "Browse, email and stream in HD",
    "Ideal for smaller households",
    "Zoiko router included",
  ],
  [
    "Stream, game and work from home",
    "Great for multiple devices",
    "Zoiko router included",
  ],
  [
    "Perfect for streaming, gaming and 4K",
    "Ideal for larger or connected homes",
    "Zoiko router included",
  ],
] as const;

export const ROUTER_INCLUDES = [
  "Fast and secure Wi-Fi",
  "Works across your home",
  "Easy (self-setup)",
] as const;

export const PLAN_FACTS = [
  { id: "speed", title: "Speed", text: "From 67 Mbps to 900 Mbps" },
  { id: "usage", title: "Usage", text: "Unlimited" },
  { id: "tech", title: "Technology", text: "Full Fibre (FTTP) or SoGEA" },
  {
    id: "contracts",
    title: "Contracts",
    text: "Flexible terms from 18 months",
  },
  { id: "switching", title: "Switching", text: "We'll handle it for you" },
] as const;

export const ROUTERS = [
  {
    id: "wifi6",
    name: "Zoiko Wi-Fi 6 Router",
    price: 0,
    src: "/Images/flow/router.png",
    features: [
      "Fast, reliable Wi-Fi 6",
      "Great home coverage",
      "Ideal for most households",
    ],
  },
  {
    id: "mesh",
    name: "Zoiko Wi-Fi Mesh (2-Pack)",
    price: 5,
    src: "/Images/flow/router.png",
    features: [
      "Stronger, wider coverage",
      "Ideal for larger homes",
      "Seamless whole-home Wi-Fi",
    ],
  },
  {
    id: "wifi6e",
    name: "Zoiko Wi-Fi 6E Router",
    price: 8,
    src: "/Images/flow/router.png",
    features: [
      "Next-gen Wi-Fi 6E",
      "Higher capacity & speed",
      "Perfect for 4K streaming and smart homes",
    ],
  },
] as const;

export const EXTRAS = [
  {
    id: "digital-line",
    name: "Digital Line (Home Phone)",
    price: 5,
    text: "Keep your home number or get a new one, via a reliable digital phone line.",
  },
  {
    id: "home-protect",
    name: "Home Protect",
    price: 2.99,
    text: "Enhanced online security for all the devices in your home.",
  },
] as const;

export const SUMMARY_BENEFITS = [
  "Full fibre speeds at your address",
  "Free router included",
  "UK-based support, 7 days a week",
  "14-day cooling-off period (in line with UK regulations)",
] as const;

export const SWITCH_OPTIONS = [
  {
    id: "switch",
    title: "Yes, I'm switching",
    text: "Switch from my current provider (One Touch Switch).",
  },
  {
    id: "new",
    title: "No, I'm a new customer",
    text: "I don't have a broadband service at this address right now.",
  },
] as const;

export const NUMBER_OPTIONS = [
  {
    id: "keep",
    title: "Yes, keep my number",
    text: "Transfer my existing home phone number (subject to eligibility).",
  },
  {
    id: "new",
    title: "No, I don't want to keep it",
    text: "I'll get a new number (if I add a Digital Line).",
  },
] as const;

export const INSTALL_OPTIONS = [
  {
    id: "date",
    title: "Book a preferred date",
    text: "Choose a convenient date and time for installation (if required).",
  },
  {
    id: "earliest",
    title: "Earliest available",
    text: "Book the next available installation appointment.",
  },
] as const;

export const ONE_TOUCH_POINTS = [
  "We contact your current provider",
  "A smooth and secure switch",
  "You'll keep your service until the switch",
] as const;

export const EXPECT_POINTS = [
  "We'll confirm your installation date",
  "You'll receive updates by email and SMS",
  "Our engineer will set up your service (if required)",
] as const;

export const SWITCH_BENEFITS = [
  "A simple, hassle-free switch",
  "Keep your home phone number (subject to eligibility)",
  "Flexible installation options",
  "UK-based support, 7 days a week",
] as const;

export const PAYMENT_OPTIONS = [
  {
    id: "direct-debit",
    title: "Direct Debit",
    text: "For your monthly broadband charges.",
    recommended: true,
  },
  {
    id: "card",
    title: "Debit / credit card",
    text: "Secure, British card payment.",
    recommended: false,
  },
  {
    id: "apple-pay",
    title: "Apple Pay",
    text: "Shown when supported by your device.",
    recommended: false,
  },
  {
    id: "google-pay",
    title: "Google Pay",
    text: "Shown when supported by your device.",
    recommended: false,
  },
] as const;

export const NEXT_STEPS = [
  {
    id: "received",
    title: "Order received",
    text: "We've received your order and payment.",
    icon: "check",
  },
  {
    id: "booked",
    title: "Installation booked",
    text: "Your installation is scheduled for the date shown.",
    icon: "calendar",
  },
  {
    id: "way",
    title: "Equipment on the way",
    text: "Your router will be sent to you before installation.",
    icon: "truck",
  },
  {
    id: "connected",
    title: "Get connected",
    text: "We'll install and activate your service on the same day.",
    icon: "wifi",
  },
] as const;

export const CONFIRMED_BENEFITS = [
  "Look out for your router delivery",
  "Our engineer will install and activate your service",
  "Sign in to MyZoiko to manage your broadband",
] as const;

export const TIMELINE = [
  {
    id: "received",
    title: "Order received",
    text: "",
    offset: 0,
    status: "done",
  },
  {
    id: "eligible",
    title: "Eligibility accepted",
    text: "Address verified for Full Fibre (FTTP).",
    offset: 0,
    status: "done",
  },
  {
    id: "wholesale",
    title: "Wholesale order placed",
    text: "",
    offset: 1,
    status: "done",
  },
  {
    id: "engineer",
    title: "Engineer appointment confirmed",
    text: "",
    offset: 2,
    status: "done",
  },
  {
    id: "equipment",
    title: "Equipment on the way",
    text: "Dispatched with Royal Mail Tracked 48.",
    offset: 3,
    status: "current",
  },
  {
    id: "installed",
    title: "Installed",
    text: "Pending — on your appointment date, or follow the quoted guide if no engineer visit is required.",
    offset: 9,
    status: "pending",
  },
  {
    id: "activated",
    title: "Service activated",
    text: "Pending — your plan may take up to 24 hours to go live.",
    offset: 9,
    status: "pending",
  },
] as const;

export const TRACKING_HELP = [
  { id: "connected", label: "Get Connected to Zoiko", primary: true },
  { id: "chat", label: "Use chat", primary: false },
  { id: "call", label: "Call 0800 321 4321", primary: false },
] as const;

export const SETUP_STEPS = [
  {
    id: "router",
    title: "Connect your router",
    text: "Plug in and power it up.",
  },
  {
    id: "wifi",
    title: "Join your Wi-Fi",
    text: "Use the network name and password on your router label.",
  },
  {
    id: "perf",
    title: "Get the best performance",
    text: "Place your router in the centre of your home.",
  },
] as const;

export const MANAGE_POINTS = [
  "View and manage your plan",
  "Check usage and speeds",
  "Download your bills",
  "Change your plan or add extras",
  "Get support in one place",
] as const;

export const CONNECTED_JOURNEY = [
  { id: "placed", title: "Order placed", text: "Tue, 18 Nov" },
  { id: "booked", title: "Installation booked", text: "Tue, 25 Nov" },
  { id: "visit", title: "Engineer visit", text: "Completed" },
  { id: "live", title: "Service activated", text: "Live" },
] as const;

export const MORE_LINKS = [
  { id: "booster", label: "Add a Wi-Fi Booster", href: "/bt-broadband" },
  { id: "upgrade", label: "Upgrade your plan", href: "/bt-broadband" },
  { id: "landline", label: "Add a landline", href: "/bt-broadband" },
  { id: "devices", label: "Explore devices", href: "/ee-mobile-plans" },
  { id: "offers", label: "View exclusive offers", href: "/bt-broadband" },
] as const;

export const DASH_NAV = [
  "Dashboard",
  "My Broadband",
  "Billing & Payments",
  "My Plan & Add-Ons",
  "Manage Account",
  "Help & Support",
  "Messages",
  "Service Updates",
  "Sign Out",
] as const;

export const DASH_ACTIONS = [
  { id: "upgrade", label: "Upgrade my plan", text: "" },
  { id: "add", label: "Add a service", text: "Voice, TV, Mobile" },
  { id: "switch", label: "Switch product", text: "" },
  { id: "move", label: "Move home", text: "" },
  { id: "details", label: "Update my details", text: "" },
  { id: "docs", label: "View documents", text: "Contract, T&Cs" },
] as const;

export const DASH_LINKS = [
  { id: "move", label: "Move home" },
  { id: "complaint", label: "Make a complaint" },
  { id: "access", label: "Accessibility & extra support" },
  { id: "cancel", label: "Cancel or leave Zoiko" },
] as const;

export const MOVING_STEPS = [
  "New address",
  "Check availability",
  "Review options & costs",
  "Confirm your move",
] as const;

export const MOVING_NEXT = [
  "Address qualification",
  "Your options",
  "Your confirmation",
] as const;
