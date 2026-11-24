/**
 * Linko – shared definitions used by both the chat widget (client) and the
 * /api/chat route (server).
 *
 * Source: Zoiko Broadband "Linko" specification pack, Docs 01–14 (v1.0).
 * All customer-facing copy below is the draft wording from those documents
 * (WF-01…WF-20, CW-01…CW-07). It is still subject to Product / Legal /
 * Brand approval – change it here, not inside components.
 */

/* ───────────────────────────── Company & contact ───────────────────────── */

export const COMPANY = {
  name: "Zoiko Broadband",
  website: "https://www.zoikobroadband.com",
  phone: "+44 (0)20 7164 6399",
  phoneHref: "tel:+442071646399",
  supportEmail: "support@zoikobroadband.com",
  supportEmailHref: "mailto:support@zoikobroadband.com",
  infoEmail: "info@zoikobroadband.com",
  /** Existing human live-chat (tawk.to) already used on /get-help. */
  liveChatUrl: "https://tawk.to/chat/68c5379a0a06ff1929296dd0/1j5162dnk",
  /** Published contact hours (source: Contact us page, app/contact-us/sections/ContactUsHero.tsx). */
  hours: "Monday to Friday 8am–8pm and Saturday to Sunday 9am–6pm",
};

export const ASSISTANT = {
  name: "Linko",
  label: "AI assistant",
  launcherLabel: "Ask Linko",
};

/* ─────────────────────────── Link allowlist ─────────────────────────────
 * The UI only renders links whose destination is in this allowlist
 * (Doc08: "href_key maps to a server-side destination allowlist – no
 * model-written URLs"). Anything else is shown as plain text.            */

export const PAGES = {
  home: "/",
  checkAvailability: "/check-availability",
  checkPostcode: "/check-my-postcode",
  allPlans: "/all-plans",
  allDeals: "/all-broadband-deals",
  comparePlans: "/compare-plans",
  fullFibre: "/full-fibre",
  partFibre: "/part-fibre",
  fibrePackages: "/fibre-packages",
  bundles: "/bundles",
  landline: "/landline",
  digitalLines: "/digital-lines",
  businessBroadband: "/business-broadband",
  businessPlans: "/business-broadband-plans",
  multiSite: "/multi-site-connectivity",
  switching: "/switch-to-zoiko",
  movingHome: "/moving-home",
  whichSpeed: "/which-speed-do-i-need",
  setupInstallation: "/setup-installation",
  installationRouters: "/installation-routers",
  installationGuide: "/installation-guide",
  ledLights: "/led-light-meanings",
  wifiChannel: "/change-wi-fi-channel",
  wiredWireless: "/wired-a-wireless-speed",
  reportFault: "/report-a-fault",
  paymentsBilling: "/payments-billing",
  getHelp: "/get-help",
  contactUs: "/contact-us",
  ofcomSpeed: "/ofcom-speed-commitment",
  referFriend: "/refer-a-friend",
  blackFriday: "/black-friday",
  login: "/login",
  privacy: "/privacy-notice",
  terms: "/terms-conditions",
  accessibility: "/accessibility-statement",
  cookies: "/cookies-policy",
} as const;

export const EXTERNAL_LINKS = {
  ofcomPriceRises:
    "https://www.ofcom.org.uk/phones-and-broadband/saving-money/telecoms-price-rises-what-are-your-rights",
  ofcomContracts: "https://www.ofcom.org.uk/phones-and-broadband/service-quality/contracts",
  ofcomSwitching:
    "https://www.ofcom.org.uk/phones-and-broadband/switching-provider/switching-broadband-provider",
  ofcomComplaints:
    "https://www.ofcom.org.uk/phones-and-broadband/service-quality/quicker-complaints-resolution-for-telecoms-customers-under-new-ofcom-rules",
  ofcomCompensation:
    "https://www.ofcom.org.uk/phones-and-broadband/service-quality/automatic-compensation-need-know",
  ofcomLandline:
    "https://www.ofcom.org.uk/phones-and-broadband/landline-phones/future-of-landline-calls",
} as const;

const INTERNAL_PATHS = new Set<string>(Object.values(PAGES));
const EXTERNAL_PREFIXES = [
  "https://www.ofcom.org.uk/",
  "https://www.legislation.gov.uk/",
  COMPANY.liveChatUrl,
];

/** True when a link may be rendered (internal site page or approved external source). */
export function isAllowedHref(href: string): boolean {
  if (href === COMPANY.phoneHref || href === COMPANY.supportEmailHref) return true;
  if (href.startsWith("/")) {
    const path = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
    return INTERNAL_PATHS.has(path);
  }
  return EXTERNAL_PREFIXES.some((p) => href.startsWith(p));
}

/* ─────────────────────────── Actions & flows ───────────────────────────
 * Copy and buttons follow Document 01 (LK-WF-01…20 "On-screen copy" and
 * "Primary / secondary CTAs") and the CF-01…CF-08 conversation sequences.
 * A button whose backend is not yet certified is shown disabled with the
 * reason (Doc07: "disabled options explain why"), never faked.          */

export type FlowId =
  | "welcome"
  | "clarify"
  | "somethingElse"
  | "availability"
  | "plans"
  | "business"
  | "businessNext"
  | "businessAvailability"
  | "businessSpecialist"
  | "switching"
  | "switchingYes"
  | "track"
  | "appointment"
  | "signIn"
  | "moving"
  | "movingAddress"
  | "fault"
  | "faultStatus"
  | "faultType"
  | "billing"
  | "complaint"
  | "safetyCheck"
  | "safety"
  | "handoff"
  | "handoffShare"
  | "handoffChannels"
  | "handoffSafety"
  | "accessibility"
  | "caseStatus"
  | "switchFailedMatch"
  | "billingComplaint"
  | "privacy"
  | "end";

/** Calls to the /v1/linko API made by buttons (Doc04 route IDs in comments). */
export type ApiCall =
  | "serviceStatus" // PUB-09
  | "orderStatus" // PRV-01
  | "appointmentRead" // PRV-03
  | "moveRequest" // PRV-05
  | "billSummary"; // PRV-07

type ActionBase = { label: string; primary?: boolean; /** Shown disabled with this reason. */ disabledReason?: string };

export type LinkoAction =
  /** Run a deterministic guided step (no AI call). */
  | (ActionBase & { kind: "flow"; flow: FlowId })
  /** Send a question to the AI as if the user typed it. */
  | (ActionBase & { kind: "ask"; text: string })
  /** Navigate to an allow-listed destination. */
  | (ActionBase & { kind: "link"; href: string })
  /** Call a /v1/linko endpoint and show its typed result. */
  | (ActionBase & { kind: "api"; call: ApiCall })
  /** Widget commands. */
  | (ActionBase & { kind: "command"; command: "retry" | "restart" | "close" | "copySummary" | "endChat" | "nextStep" });

export type MessageTone = "default" | "safety" | "error" | "notice";
export type MessageWidget =
  | "postcode"
  | "summary"
  | "planCard"
  | "secureCard"
  | "specialistForm"
  | "wifiSteps"
  | "moveDate"
  | "handoffSummary";

/** Which journey an address check belongs to (Doc01 WF-03 / WF-05 / WF-10). */
export type AddressContext = "residential" | "business" | "moving";

export interface FlowStep {
  /** Doc07 screen title shown in the header ("Linko / …"). */
  screen?: string;
  /** Human label used in the end-of-chat summary. */
  topic?: string;
  text: string;
  tone?: MessageTone;
  widget?: MessageWidget;
  /** For widget "postcode". */
  context?: AddressContext;
  actions: LinkoAction[];
}

const speakToPerson: LinkoAction = { kind: "flow", label: "Speak to a person", flow: "handoff" };

/** Version of the privacy notice shown in Linko; recorded with consents (Doc05 DM-09). */
export const PRIVACY_NOTICE_VERSION = "linko-privacy-2026-11-23";

/**
 * Accurate transcript handling statement (Doc01 WF-18, Doc04 §13). Retention
 * periods are pending Legal approval; these match the current build.
 */
export const TRANSCRIPT_NOTICE =
  "While your chat is open, a copy with sensitive details removed is held briefly on our servers (deleted when you end the chat or after a short period without activity) and processed by our AI provider to answer you. If you turn on Save chat history in the menu, chats are also kept in this browser for a limited time, and you can delete them at any time. The privacy notice explains how long we keep information.";
const speakToSupport: LinkoAction = { kind: "flow", label: "Speak to support", flow: "handoff" };
const NEEDS_QUOTE = "Available once a current quote is returned for your exact address.";

/** Emergency copy (Doc01 CF-06 / Doc06). */
export const EMERGENCY_LINE =
  "If anyone is in immediate danger, call 999 or 112 using a working phone or mobile — don't rely on the affected line. Linko is not an emergency service.";

export const COPY = {
  // LK-WF-01 (Document 01)
  // Doc07 §03.1 desktop reference anatomy (figure 1).
  welcome: "Hello. I can help you check availability, plans or support.",
  // Document 01 §3.2 block 02 – trust strip
  trust: "I'm Linko, Zoiko Broadband's AI assistant.",
  trustLink: "How I use information",
  // Document 01 §3.2 block 05 / Doc01 footer
  footerDisclaimer: "AI may make mistakes. We confirm live details.",
  composerPlaceholder: "Your next message…",
  // LK-WF-19
  degraded:
    "I can't check that information just now. I haven't placed an order or changed anything. You can try again or speak to our team.",
  retryLimit:
    "I still can't check that, so I'll stop retrying rather than guess. I haven't placed an order or changed anything. Our team can help you directly.",
  rateLimited:
    "You're sending messages faster than I can answer. Please wait a moment and try again, or speak to our team.",
  // LK-WF-02: no more than 2 clarification turns, then generic help + human handover
  clarifyFallback:
    "I'm sorry I haven't been able to find the right answer. You can browse our help pages or speak to our team, who can look at this with you.",
  dlpNotice: (what: string) =>
    `For your security I removed what looked like ${what} from your message. Please don't share passwords, one-time codes, dates of birth, security answers, card or bank details here — Zoiko will only ask for these on its secure pages.`,
  // LK-WF-20
  summaryIntro: "Here's what we covered. I've only completed an action when the relevant system has confirmed it.",
  feedbackThanks: "Thanks for your feedback.",
  // LK-WF-16
  // Doc11 AU-WF-11-01 / FR-11-006: signed in ≠ verified owner; never ask for secrets in chat.
  signIn:
    "Please sign in to MyZoiko to continue securely. I won't ask for your password or one-time code in chat. Signing in alone doesn't show account details until your account is verified there, and I'll never ask for your date of birth here.",
} as const;

export const FLOWS: Record<FlowId, FlowStep> = {
  /* LK-WF-01 Launcher and welcome — 4 quick-start chips + Speak to a person link */
  welcome: {
    text: COPY.welcome,
    actions: [], // filled per page by welcomeActions()
  },

  /* LK-WF-02 Intent disambiguation and smart routing */
  clarify: {
    screen: "Intent clarification and smart routing",
    topic: "Finding the right help",
    text: "I can help with a new connection, an existing order or support. Which is closest to what you need?",
    actions: [
      { kind: "flow", label: "New broadband", flow: "availability" },
      { kind: "flow", label: "Existing order", flow: "track" },
      { kind: "flow", label: "Technical problem", flow: "fault" },
      { kind: "flow", label: "Billing question", flow: "billing" },
      { kind: "flow", label: "Something else", flow: "somethingElse" },
    ],
  },
  somethingElse: {
    screen: "Intent clarification and smart routing",
    text: "No problem. Tell me in a few words what you need — for example moving home, switching provider, business broadband or a complaint — and I'll point you to the right help.",
    actions: [
      { kind: "flow", label: "Moving home", flow: "moving" },
      { kind: "flow", label: "Switching to Zoiko", flow: "switching" },
      { kind: "flow", label: "Business broadband", flow: "business" },
      { kind: "flow", label: "Cancellation or complaint", flow: "complaint" },
      speakToPerson,
    ],
  },

  /* LK-WF-03 Postcode and address eligibility (CF-01 A1) */
  availability: {
    screen: "Postcode and exact-address eligibility",
    topic: "Checking availability",
    text: "What is the postcode of the property? I'll then ask you to choose the full address so we check the correct connection.",
    widget: "postcode",
    context: "residential",
    actions: [{ kind: "flow", label: "Speak to a specialist", flow: "handoff" }],
  },

  /* LK-WF-04 Eligible plan comparison — needs an exact-address quote first */
  plans: {
    screen: "Eligible plan comparison",
    topic: "Comparing plans",
    text: "Plans, prices and speeds depend on the exact property, so I won't quote figures here. Plans for your address aren't available in chat yet — the availability checker shows the current plans and prices for your address, and checking doesn't create an order.",
    widget: "planCard",
    actions: [
      { kind: "flow", label: "Check availability", flow: "availability", primary: true },
      { kind: "link", label: "Compare these plans", href: PAGES.comparePlans },
      { kind: "link", label: "View full plan details", href: PAGES.allPlans },
      { kind: "link", label: "Continue to secure checkout", href: PAGES.checkAvailability, disabledReason: NEEDS_QUOTE },
      speakToPerson,
    ],
  },

  /* LK-WF-05 Business quote and specialist hand-off (CF-02) */
  business: {
    screen: "Business quote and specialist",
    topic: "Business broadband",
    text: "I can help with a business connection. Is this for one site or several? A specialist can confirm options and a tailored quote.",
    actions: [
      { kind: "flow", label: "One site", flow: "businessNext" },
      { kind: "flow", label: "Multiple sites", flow: "businessNext" },
      { kind: "flow", label: "Not sure", flow: "businessNext" },
      { kind: "flow", label: "Speak to a business specialist", flow: "businessSpecialist" },
    ],
  },
  businessNext: {
    screen: "Business quote and specialist",
    text: "Would you like to compare standard business options or speak to a specialist about your requirements? I can't confirm SLAs, static IPs or pricing here — a specialist confirms those for the qualifying plan.",
    actions: [
      { kind: "flow", label: "Speak to a business specialist", flow: "businessSpecialist", primary: true },
      { kind: "flow", label: "Check business availability", flow: "businessAvailability" },
      { kind: "link", label: "Request a call back", href: PAGES.contactUs },
      { kind: "link", label: "Continue to business plans", href: PAGES.businessPlans },
    ],
  },
  businessAvailability: {
    screen: "Business quote and specialist",
    text: "What is the postcode of the first site? I'll then ask you to choose the full address.",
    widget: "postcode",
    context: "business",
    actions: [{ kind: "flow", label: "Speak to a business specialist", flow: "businessSpecialist" }],
  },
  businessSpecialist: {
    screen: "Business quote and specialist",
    topic: "Business specialist enquiry",
    text: "A specialist can confirm options and a tailored quote. I'll only ask for the minimum details needed to contact you about this enquiry.",
    widget: "specialistForm",
    actions: [
      { kind: "link", label: "Use the business enquiry form", href: PAGES.businessBroadband },
      speakToPerson,
    ],
  },

  /* LK-WF-06 Switching to Zoiko (CF-03) */
  switching: {
    screen: "One Touch Switch guidance",
    topic: "Switching to Zoiko",
    text: "Are you moving to Zoiko from another broadband provider at the same address?",
    actions: [
      { kind: "flow", label: "Yes, same address", flow: "switchingYes", primary: true },
      { kind: "flow", label: "No, I'm moving home", flow: "moving" },
      { kind: "flow", label: "It's for a business", flow: "business" },
    ],
  },
  switchingYes: {
    screen: "One Touch Switch guidance",
    text: "For most home broadband switches, your new provider manages the switch through One Touch Switch. I'll explain what happens before you confirm.\n- Check your new connection at your exact address.\n- Choose your plan and review the contract information in secure checkout.\n- Zoiko arranges the switch with your current provider — please don't cancel your current service yourself.\n- Your current provider can tell you about any early-exit charges. Some cases (business lines, home moves, some bundles) need our team instead.\n\nI can't promise you'll keep your phone number until our team checks. Do you also have a landline, alarm or telecare device using your current service?",
    actions: [
      { kind: "flow", label: "Check my new connection", flow: "availability", primary: true },
      { kind: "link", label: "Understand switching", href: PAGES.switching },
      { kind: "link", label: "Continue to secure order", href: PAGES.checkAvailability, disabledReason: NEEDS_QUOTE },
      { kind: "flow", label: "Yes — landline, alarm or telecare", flow: "safety" },
      { kind: "flow", label: "No, broadband only", flow: "availability" },
      { kind: "flow", label: "Get help with a failed match", flow: "switchFailedMatch" },
      speakToPerson,
    ],
  },

  /* LK-WF-08 Order tracking (CF-04) */
  track: {
    screen: "Track your order",
    topic: "Tracking an order",
    text: "I can help you track your order. For privacy, please sign in securely before I show personal order details.",
    widget: "secureCard",
    actions: [
      { kind: "link", label: "Sign in to track", href: PAGES.login, primary: true },
      { kind: "api", label: "View order status", call: "orderStatus" },
      { kind: "flow", label: "Engineer appointment", flow: "appointment" },
      { kind: "flow", label: "Get order support", flow: "handoff" },
      { kind: "flow", label: "Report a delay", flow: "handoff" },
    ],
  },

  /* LK-WF-09 Engineer visit / installation appointment */
  appointment: {
    screen: "Engineer appointment",
    topic: "Engineer appointment",
    text: "Once you've signed in, I can show your appointment as held by the order system. Would you like preparation guidance or to check whether a change is possible? I can't book, cancel or change an engineer visit from chat.",
    actions: [
      { kind: "api", label: "View appointment", call: "appointmentRead", primary: true },
      { kind: "link", label: "Prepare for installation", href: PAGES.installationGuide },
      { kind: "link", label: "Request a change", href: PAGES.login },
      speakToSupport,
    ],
  },

  /* LK-WF-16 Sign-in and customer verification */
  signIn: {
    screen: "Sign-in and customer verification",
    text: COPY.signIn,
    widget: "secureCard",
    actions: [
      { kind: "link", label: "Sign in securely", href: PAGES.login, primary: true },
      { kind: "link", label: "Create an account", href: PAGES.login },
      { kind: "flow", label: "Continue without signing in", flow: "welcome" },
      speakToSupport,
    ],
  },

  /* LK-WF-10 Moving home (CF-05) */
  moving: {
    screen: "Moving home",
    topic: "Moving home",
    text: "I can check the options at your new address and help you understand the next steps. Moving your existing service may require a new order.\n\nDo you have a landline, alarm or telecare using your current service? Please speak to our team before any change, and I can't promise you'll keep the same number until they check.",
    actions: [
      { kind: "flow", label: "Check new address", flow: "movingAddress", primary: true },
      { kind: "flow", label: "Yes — landline, alarm or telecare", flow: "safety" },
      { kind: "api", label: "Start a move request", call: "moveRequest" },
      { kind: "link", label: "Find moving help", href: PAGES.movingHome },
      speakToPerson,
    ],
  },
  movingAddress: {
    screen: "Moving home",
    text: "I can check broadband options at your new address. What's the new postcode?",
    widget: "postcode",
    context: "moving",
    actions: [{ kind: "link", label: "Find moving help", href: PAGES.movingHome }],
  },

  /* LK-WF-11 Service status and fault triage — safety first (CF-06) */
  fault: {
    screen: "Service status and fault triage",
    topic: "Reporting a problem",
    text: "I'm sorry your connection is having trouble. Before we start: is anyone relying on this line for emergency calls or a telecare device?",
    actions: [
      { kind: "flow", label: "Yes", flow: "safety", primary: true },
      { kind: "flow", label: "No", flow: "faultStatus" },
      { kind: "flow", label: "Not sure", flow: "safety" },
      { kind: "flow", label: "Prefer not to say", flow: "safety" },
    ],
  },
  faultStatus: {
    screen: "Service status and fault triage",
    text: "Let's first check whether there's a reported issue in your area.",
    actions: [
      { kind: "api", label: "Check service status", call: "serviceStatus", primary: true },
      { kind: "flow", label: "Troubleshoot connection", flow: "faultType" },
      { kind: "link", label: "Report a fault", href: PAGES.reportFault },
      speakToSupport,
    ],
  },

  /* LK-WF-12 Wi-Fi speed and router guidance */
  faultType: {
    screen: "Wi-Fi speed and router guidance",
    topic: "Troubleshooting",
    text: "What's the problem? Choose the closest option and I'll give you safe steps one at a time — no more than three before I hand you to our support team.",
    widget: "wifiSteps",
    actions: [
      { kind: "link", label: "Run a speed test", href: PAGES.wiredWireless },
      { kind: "flow", label: "Contact support", flow: "handoff" },
    ],
  },

  /* LK-WF-13 Billing, charges and payment support */
  billing: {
    screen: "Billing and payment support",
    topic: "Billing",
    text: "I can explain charges, or help you open your bill securely. For your protection, please don't enter payment-card details here.",
    actions: [
      { kind: "link", label: "Sign in to view bill", href: PAGES.login, primary: true },
      { kind: "link", label: "Update payment securely", href: PAGES.login },
      { kind: "ask", label: "Explain a charge", text: "Can you explain the charges on my bill?" },
      { kind: "flow", label: "Raise a billing query", flow: "handoff" },
      speakToSupport,
    ],
  },

  /* LK-WF-14 Cancellation, refunds and complaints (CF-07) */
  complaint: {
    screen: "Cancellation, refund and complaints",
    topic: "Cancellation or complaint",
    text: "I can explain the process or help you contact the right team. Any charges, refunds or cancellation dates must be checked against your contract.\n\nYou can make a complaint without signing in. If a qualifying complaint raised from 8 April 2026 isn't resolved within six weeks, or you receive a deadlock letter, you may be able to take it to an independent ADR scheme. I can't log a complaint from this chat, so I won't tell you one has been logged.\n\nCompensation depends on your service, contract and the rules that apply. Our team can review your circumstances.",
    actions: [
      { kind: "link", label: "Make a complaint", href: PAGES.contactUs, primary: true },
      { kind: "link", label: "Understand cancellation", href: EXTERNAL_LINKS.ofcomContracts },
      { kind: "link", label: "View complaints rules (Ofcom)", href: EXTERNAL_LINKS.ofcomComplaints },
      { kind: "flow", label: "Request cancellation help", flow: "handoff" },
      { kind: "link", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref },
      { kind: "flow", label: "Request an accessible format", flow: "accessibility" },
      speakToPerson,
    ],
  },

  /* LK-WF-15 Digital voice and telecare safety — CF-06 question, then urgent route */
  safetyCheck: {
    screen: "Digital voice and telecare safety",
    topic: "Digital voice and telecare safety",
    tone: "safety",
    text: "Digital phone services may not work during a power cut without suitable backup. If you use telecare or depend on your landline for emergency calls, please speak with our team before changing services.\n\nIs anyone relying on this line for emergency calls or a telecare device?",
    actions: [
      { kind: "flow", label: "Yes", flow: "safety", primary: true },
      { kind: "flow", label: "No", flow: "faultStatus" },
      { kind: "flow", label: "Not sure", flow: "safety" },
      { kind: "flow", label: "Prefer not to say", flow: "safety" },
      { kind: "link", label: "Learn about digital lines", href: PAGES.digitalLines },
    ],
  },
  safety: {
    screen: "Digital voice and telecare safety",
    topic: "Digital voice and telecare safety",
    tone: "safety",
    text: `Please speak with our support team urgently. Digital phone services may fail during a power cut without suitable backup, so please don't restart or disconnect equipment the line depends on until you've spoken to us.\n\n${EMERGENCY_LINE}`,
    actions: [
      { kind: "link", label: `I need additional support — call ${COMPANY.phone}`, href: COMPANY.phoneHref, primary: true },
      { kind: "flow", label: "Speak to a specialist", flow: "handoffSafety" },
      { kind: "api", label: "Check local status", call: "serviceStatus" },
      { kind: "link", label: "Learn about digital lines", href: PAGES.digitalLines },
    ],
  },

  /* LK-WF-17 Human agent hand-off (CF-08) — summary consent first */
  handoff: {
    screen: "Human escalation and callback",
    topic: "Speaking to our team",
    text: "I can help you contact our team. Would you like a short summary to pass on, so you don't have to repeat yourself?",
    actions: [
      { kind: "flow", label: "Yes, prepare a summary", flow: "handoffShare", primary: true },
      { kind: "flow", label: "Continue without sharing this chat", flow: "handoffChannels" },
      { kind: "link", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref },
      { kind: "link", label: "Chat with an adviser", href: COMPANY.liveChatUrl },
      { kind: "flow", label: "Back to Linko", flow: "welcome" },
    ],
  },
  handoffShare: {
    screen: "Human escalation and callback",
    text: "Here's a short summary with no personal details. Linko can't send it to an adviser automatically yet, so copy it and paste it into the live chat or enquiry form. You choose what to paste. Live chat is run by our chat provider and their privacy terms apply.",
    widget: "handoffSummary",
    actions: [
      { kind: "link", label: "Chat with an adviser", href: COMPANY.liveChatUrl, primary: true },
      { kind: "link", label: "Request a callback", href: PAGES.getHelp },
      { kind: "link", label: "Send an enquiry", href: PAGES.contactUs },
      { kind: "flow", label: "Back to Linko", flow: "welcome" },
    ],
  },
  handoffChannels: {
    screen: "Human escalation and callback",
    text: `Here are the ways to reach our team. I can't see live queue or wait times, so I won't promise one. Our published opening hours are ${COMPANY.hours} — please check the Get help page for any changes.`,
    actions: [
      { kind: "link", label: "Chat with an adviser", href: COMPANY.liveChatUrl, primary: true },
      { kind: "link", label: "Request a callback", href: PAGES.getHelp },
      { kind: "link", label: "Send an enquiry", href: PAGES.contactUs },
      { kind: "link", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref },
      { kind: "flow", label: "Back to Linko", flow: "welcome" },
    ],
  },

  /* Doc10 HS-WF-10-03 / HF-03: safety route — phone first, never behind a callback queue */
  handoffSafety: {
    screen: "Human escalation and callback",
    topic: "Speaking to our team",
    tone: "safety",
    text: `Please call us now so a person can help straight away. I can't see live queue times, so I won't make you wait for a callback.\n\n${EMERGENCY_LINE}`,
    actions: [
      { kind: "link", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref, primary: true },
      { kind: "link", label: "Chat with an adviser", href: COMPANY.liveChatUrl },
      { kind: "link", label: "Send an enquiry", href: PAGES.contactUs },
    ],
  },

  /* Doc01 CF-03 A3/A4: the switch couldn't be matched */
  switchFailedMatch: {
    screen: "One Touch Switch guidance",
    topic: "Switching to Zoiko",
    text: "We need our team to help resolve the match. Would you like us to help complete the switch? Please don't cancel your current service yourself in the meantime.",
    actions: [
      { kind: "flow", label: "Yes, help me complete the switch", flow: "handoff", primary: true },
      { kind: "link", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref },
      { kind: "link", label: "Understand switching", href: PAGES.switching },
    ],
  },

  /* Doc01 CF-07 A1/A2: billing dispute — an enquiry or a formal complaint */
  billingComplaint: {
    screen: "Billing and payment support",
    topic: "Billing",
    text: "I'm sorry about the problem with your bill. I can't see your account here, so please sign in to check the charges. Is this a question about your bill, or do you want to make a formal complaint?",
    actions: [
      { kind: "link", label: "Sign in securely", href: PAGES.login, primary: true },
      { kind: "flow", label: "It's a question about my bill", flow: "billing" },
      { kind: "flow", label: "Make a formal complaint", flow: "complaint" },
      speakToPerson,
    ],
  },

  /* Doc10 HF-09: accessibility needs and acting for someone else */
  accessibility: {
    screen: "Human escalation and callback",
    topic: "Accessibility and support needs",
    text: "Tell our team how you'd like us to contact you — for example by phone, email, Relay UK or in large print. You don't need to explain any condition. To act for someone else, the account holder will need to give us permission first.",
    actions: [
      { kind: "link", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref, primary: true },
      { kind: "link", label: "Contact us", href: PAGES.contactUs },
      { kind: "link", label: "Accessibility statement", href: PAGES.accessibility },
      speakToPerson,
    ],
  },

  /* Doc10 HS-WF-10-13: case progress needs a verified route */
  caseStatus: {
    screen: "Human escalation and callback",
    topic: "Case progress",
    text: "For your privacy I can't look up a complaint, fault or case from a reference in chat. Sign in to see your account, or our support team can check the progress for you.",
    actions: [
      { kind: "link", label: "Sign in securely", href: PAGES.login, primary: true },
      speakToSupport,
    ],
  },

  /* LK-WF-18 Privacy, AI limits and transcript controls */
  privacy: {
    screen: "Privacy, AI limits and transcript controls",
    topic: "Privacy and AI",
    text: `I'm an AI assistant. I'll use only the information needed to answer your question. I can't pass this chat to an adviser automatically — I can prepare a short summary for you to share. Please don't share passwords or payment-card numbers.\n\n${TRANSCRIPT_NOTICE} For data-rights requests, use our privacy notice.`,
    actions: [
      { kind: "link", label: "Read privacy notice", href: PAGES.privacy, primary: true },
      { kind: "link", label: "Request data help", href: PAGES.contactUs },
      { kind: "link", label: "Manage cookie preferences", href: PAGES.cookies },
      speakToPerson,
      { kind: "command", label: "End chat", command: "endChat" },
    ],
  },

  /* LK-WF-20 Conversation summary and close */
  end: {
    screen: "Conversation summary and close",
    text: COPY.summaryIntro,
    widget: "summary",
    actions: [
      { kind: "command", label: "Continue to next step", command: "nextStep", primary: true },
      { kind: "command", label: "Start another question", command: "restart" },
      { kind: "command", label: "Copy summary", command: "copySummary" },
      speakToSupport,
      { kind: "command", label: "End chat", command: "endChat" },
    ],
  },
};

/** Every topic label a flow can add — the only topic strings allowed in a handoff summary (Doc05 T-30). */
export const FLOW_TOPICS: ReadonlySet<string> = new Set(
  Object.values(FLOWS)
    .map((f) => f.topic)
    .filter((t): t is string => Boolean(t)),
);

/** LK-WF-01 first-turn chips: Check availability | Compare plans | Business broadband | Track my order
 * (+ "Speak to a person" as a link). The first chip adapts to the page the visitor is on (Doc02). */
export function welcomeActions(pathname: string): LinkoAction[] {
  const base: LinkoAction[] = [
    { kind: "flow", label: "Check availability", flow: "availability" },
    { kind: "flow", label: "Compare plans", flow: "plans" },
    { kind: "flow", label: "Track an order", flow: "track" },
    { kind: "flow", label: "Get support", flow: "clarify" },
  ];
  const p = pathname || "/";
  let page: LinkoAction | null = null;
  if (p.startsWith("/report-a-fault") || p.startsWith("/get-help") || p.includes("led-light") || p.includes("wi-fi") || p.includes("wireless"))
    page = { kind: "flow", label: "Report a fault", flow: "fault" };
  else if (p.startsWith("/business-broadband") || p.startsWith("/multi-site"))
    page = { kind: "flow", label: "Speak to a business specialist", flow: "businessSpecialist" };
  else if (p.startsWith("/payments-billing")) page = { kind: "flow", label: "Billing question", flow: "billing" };
  else if (p.startsWith("/moving-home")) page = { kind: "flow", label: "Moving home", flow: "moving" };
  else if (p.startsWith("/switch-to-zoiko")) page = { kind: "flow", label: "Switching to Zoiko", flow: "switching" };
  else if (p.startsWith("/digital-lines") || p.startsWith("/landline"))
    page = { kind: "flow", label: "Digital voice & telecare", flow: "safetyCheck" };
  // Page intent replaces "Compare plans" so there are always four first-turn chips.
  return page ? [base[0], page, base[2], base[3]] : base;
}

/** Doc07 fig. 3 – data-constrained cards. Values are deliberately absent until a live authority exists. */
export const PLAN_CARD = {
  title: "Plans matched to your address",
  note: "Not available in chat yet — confirmed for your exact address in the availability checker",
  rows: [
    ["Monthly price", "Not confirmed"],
    ["Download / upload", "Not confirmed"],
    ["Contract", "Not confirmed"],
    ["Upfront charges", "Not confirmed"],
  ],
} as const;

export const SECURE_CARD = {
  title: "Authenticated order view",
  banner: "Private details are hidden in public chat.",
  rows: [
    ["Your status", "Not signed in — public chat"],
    ["Order status", "Only after verification"],
    ["Engineer appointment", "Supplier-confirmed"],
    ["Payment actions", "Hosted secure transfer"],
  ],
  footnote: "Linko never shows invented data, secrets, full card details or unauthorised order identifiers.",
} as const;

export const ERROR_SCREEN = "Degraded, error and unsafe inputs";

/* ─────────────────────── Deterministic intent router ──────────────────────
 * Doc08: "Policy engine and intent router (deterministic before the model)".
 * Priority: P0 safety → human request → complaint → (AI).                  */

const SAFETY_RE =
  /\b(telecare|tele-care|care ?line|careline|lifeline|personal alarm|care alarm|pendant alarm|medical alarm|security alarm|fire alarm|burglar alarm|alarm (?:uses|is on|on) (?:the|my) (?:phone|line)|lift line|power ?cut|power outage|power failure|power is (?:off|down)|no dial ?tone|dial ?tone|digital (?:voice|phone|landline)|(?:landline|phone ?line|home phone)\W+(?:\w+\W+){0,4}?(?:not working|isn't working|is dead|dead|down|cut off)|emergency|vulnerable)\b|(?<![\d.])\b(?:999|112)\b(?!\s?(?:mb|mbps|meg|gb|gbps)\b)/i;
const HUMAN_RE =
  /\b(speak|talk|chat)\s+(?:to|with)\s+(?:a|an|the|your|some)?\s*(?:real\s+)?(?:person|human|agent|adviser|advisor|someone|team|representative)\b|\breal person\b|\bhuman agent\b|\b(?:a human|operator|call me back|callback|call back)\b|\b(?:i'?m|i am|feeling) (?:so )?(?:upset|stressed|desperate|distressed|crying)\b|^\s*(?:a\s+)?(?:human|agent|person|adviser|advisor|operator|representative)(?:\s+please)?[\s.!?]*$|\b(?:want|need|get)\s+(?:a|an)\s+(?:real\s+)?(?:person|human|agent|adviser|advisor)\b/i;
// Doc10: recognise complaints from dissatisfaction wording, not just the word "complaint".
const COMPLAINT_RE =
  /\b(complain\w*|ombudsman|adr|deadlock|unacceptable|disgusted|fed up|sick of|appalling|terrible service|awful service|rubbish service|useless service|want (?:a|my) refund|compensation)\b/i;

// Vulnerability / reliance on the line (Doc09 §02.4 P0, Doc10 §02.1) and electricity wording (AT-12-072).
const VULNERABLE_RE =
  /\b(?:rel(?:y|ies|ying) on (?:the|this|my|our) (?:line|phone|landline)|depend(?:s|ent|ing)? on (?:the|this|my|our) (?:line|phone|landline)|at risk|in danger|(?:lives?|living) (?:on their own|alone)|can'?t call (?:for help|999|anyone)|no (?:other|mobile) phone|medical (?:device|equipment|alarm)|oxygen|no electricity|without electricity|no power|without power|power (?:goes|went) (?:off|out)|blackout)\b/i;
// Doc10 §07 "no magic wording": dissatisfaction is a complaint signal.
const COMPLAINT_EXTRA_RE =
  /\b(?:not happy|unhappy|dissatisfied|disappointed|ridiculous|escalate|manager|supervisor|money back|still (?:not|isn'?t) (?:fixed|working|resolved)|(?:third|3rd|fourth|4th) time|been (?:waiting|chasing)|nobody (?:has )?(?:called|fixed|helped))\b/i;
// Doc03 §05.3 / Doc09 GATE-15 deterministic journey rows (before the model).
const CANCEL_RE = /\b(?:cancel(?:l?ing|l?ation)?|terminate|end my contract|leave zoiko)\b/i;
const OLD_PROVIDER_RE = /\b(?:old|current|previous|other|existing) (?:provider|broadband|line|supplier)\b|\b(?:BT|Sky|Virgin|TalkTalk|Plusnet|Vodafone|EE|Shell)\b/;
const ORDER_RE =
  /\b(?:where(?:'s| is) my (?:order|router|installation)|order (?:status|update|progress)|status of (?:my |the |an |this )?order|track(?:ing)? (?:my |an |the )?order|has my order)\b/i;
const CASE_RE =
  /\b(?:(?:my|the) (?:complaint|case|ticket|fault|callback) (?:ref(?:erence)?|number|update|status|progress)|update on my (?:complaint|case|fault|ticket))\b/i;
const APPT_RE = /\b(?:engineer(?: visit)?|installation (?:date|visit|appointment)|appointment|reschedule|rebook)\b/i;
const PRIVATE_RE =
  /\b(?:show|give|tell|send|what(?:'s| is)|check|see|view)\b[^.?!]{0,30}\bmy\s+(?:last |latest |current |next )?(?:bill|invoice|balance|statement|payment|direct debit|account(?: details| number)?|contract end date)\b|\bhow much do (?:i|we) owe\b|\bsigned in (?:with|via|using) (?:google|facebook|apple)\b/i;
const LOGIN_RE = /\b(?:forgot(?:ten)?|reset|change)\b[^.?!]{0,20}\bpassword\b|\b(?:can'?t|cannot|unable to) (?:log|sign) ?in\b|\blocked out\b/i;
const ACCESS_RE =
  /\b(?:deaf|hard of hearing|blind|partially sighted|BSL|Relay UK|textphone|large print|braille|easy read|accessible format|on behalf of|power of attorney|i'?m (?:a|their|his|her) carer)\b/i;
const FAULT_RE =
  /\b(?:no internet|internet (?:is )?(?:down|not working)|broadband (?:is )?(?:down|not working)|no connection|keeps (?:dropping|disconnecting)|wi-?fi (?:is )?(?:not working|dropping|down)|router (?:lights?|not working)|slow (?:speed|broadband|internet|wi-?fi))\b/i;
const MOVE_RE = /\b(?:moving (?:home|house)|move house|moving to a new (?:home|house|address)|new address)\b/i;
const SWITCH_RE = /\b(?:switch(?:ing)? (?:to zoiko|provider|from)|one touch switch)\b/i;
const BILL_RE = /\b(?:overcharged|charged twice|wrong bill|bill (?:is )?wrong|direct debit|dispute (?:a )?charge)\b/i;
const PAY_RE = /\b(?:pay (?:my |a |the )?bill|make a payment|payment (?:failed|declined)|update (?:my )?(?:card|payment))\b/i;
const AVAIL_RE = /\b(?:is (?:full )?fibre available|availability|available (?:at|in|for) my|can i get (?:full )?fibre|check (?:my )?(?:postcode|address))\b/i;
const BUSINESS_RE = /\b(?:business broadband|leased line|multi-?site|office (?:connection|broadband)|static ip|\bsla\b|for my (?:business|company|office))\b/i;
const PRICE_Q_RE = /\b(?:how much (?:is|are|does|do)|price|prices|cost|costs|cheapest|deal|deals|tariff)\b/i;
const PRIVACY_RE = /\b(?:delete my data|my (?:personal )?data|gdpr|data protection|are you (?:a )?(?:bot|robot|real|human|person)|is this (?:a )?(?:bot|ai))\b/i;
// Doc01 CF-06 A1: a landline fault alone first asks the telecare question; stronger signals go straight to safety.
const STRONG_SAFETY_RE = /\b(?:telecare|tele-care|care ?line|careline|lifeline|alarm|lift line|power|999|112|emergency|vulnerable)\b/i;
const LANDLINE_FAULT_RE = /\b(?:no dial ?tone|dial ?tone|(?:landline|phone ?line|home phone)\W+(?:\w+\W+){0,4}?(?:not working|isn't working|is dead|dead|down|cut off))\b/i;

export type RoutedIntent =
  | "safety"
  | "handoff"
  | "complaint"
  | "track"
  | "signIn"
  | "appointment"
  | "switchingYes"
  | "caseStatus"
  | "accessibility"
  | "fault"
  | "moving"
  | "switching"
  | "billing"
  | "billingComplaint"
  | "safetyCheck"
  | "availability"
  | "business"
  | "plans"
  | "privacy"
  | null;

export function routeIntent(text: string): RoutedIntent {
  if (VULNERABLE_RE.test(text) || (SAFETY_RE.test(text) && STRONG_SAFETY_RE.test(text))) return "safety";
  if (LANDLINE_FAULT_RE.test(text)) return "safetyCheck";
  if (SAFETY_RE.test(text)) return "safety";
  // "Cancel my old broadband" is a switching question (Doc09 §05.4); "cancel the engineer" is an appointment one.
  if (CANCEL_RE.test(text) && OLD_PROVIDER_RE.test(text)) return "switchingYes";
  if (CANCEL_RE.test(text) && APPT_RE.test(text)) return "appointment";
  // Progress on an existing case is a lookup, not a new complaint (Doc10 HS-WF-10-13).
  if (CASE_RE.test(text)) return "caseStatus";
  // Doc01 CF-07 A1: a billing dispute offers "question about my bill" vs "formal complaint".
  if (BILL_RE.test(text) && (COMPLAINT_RE.test(text) || COMPLAINT_EXTRA_RE.test(text))) return "billingComplaint";
  // A complaint wins over the distress branch of a person request (Doc10 HS-T033).
  if (COMPLAINT_RE.test(text) || COMPLAINT_EXTRA_RE.test(text) || CANCEL_RE.test(text)) return "complaint";
  if (HUMAN_RE.test(text)) return "handoff";
  if (ACCESS_RE.test(text)) return "accessibility";
  if (ORDER_RE.test(text)) return "track";
  if (PRIVATE_RE.test(text) || LOGIN_RE.test(text)) return "signIn";
  if (APPT_RE.test(text)) return "appointment";
  if (FAULT_RE.test(text)) return "fault";
  if (MOVE_RE.test(text)) return "moving";
  if (SWITCH_RE.test(text)) return "switching";
  if (BILL_RE.test(text) || PAY_RE.test(text)) return "billing";
  if (PRIVACY_RE.test(text)) return "privacy";
  if (BUSINESS_RE.test(text)) return "business";
  if (AVAIL_RE.test(text)) return "availability";
  if (PRICE_Q_RE.test(text)) return "plans";
  return null;
}

/* ───────────────────────── Data-loss prevention ──────────────────────────
 * Doc05/12/13: redact card, password and one-time-code text before it is
 * stored, logged or sent to the model. Runs in the browser AND on the server. */

function luhnValid(digits: string): boolean {
  let sum = 0;
  let dbl = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (dbl) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

export interface RedactionResult {
  text: string;
  removed: string[]; // human-readable kinds, e.g. "a card number"
}

export function redactSensitive(input: string): RedactionResult {
  const removed = new Set<string>();
  let text = input;

  // Payment card numbers: 13–19 digits, optional spaces/dashes, Luhn-valid.
  text = text.replace(/\b(?:\d[ -]?){12,18}\d\b/g, (m) => {
    const digits = m.replace(/\D/g, "");
    if (digits.length >= 13 && digits.length <= 19 && luhnValid(digits)) {
      removed.add("a card number");
      return "[card number removed]";
    }
    return m;
  });

  // Card security code.
  text = text.replace(/\b(cvv|cvc|cv2|security code)\b\s*(?:is|:)?\s*\d{3,4}\b/gi, (_m, label) => {
    removed.add("a card security code");
    return `${label} [removed]`;
  });

  // Bank sort code + account number.
  text = text.replace(/\b\d{2}[- ]\d{2}[- ]\d{2}\b/g, () => {
    removed.add("bank details");
    return "[sort code removed]";
  });
  text = text.replace(/\b(account (?:number|no\.?))\s*(?:is|:)?\s*\d{8}\b/gi, (_m, label) => {
    removed.add("bank details");
    return `${label} [removed]`;
  });

  // IBAN (UK and other).
  text = text.replace(/\b[A-Z]{2}\d{2}\s?[A-Z]{4}(?:\s?\d){14}\b/gi, () => {
    removed.add("bank details");
    return "[bank details removed]";
  });

  // National Insurance number.
  text = text.replace(/\b[A-CEGHJ-PR-TW-Z]{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?[A-D]\b/gi, () => {
    removed.add("an ID number");
    return "[ID number removed]";
  });
  // Passport / driving licence number next to its label.
  text = text.replace(/\b(passport|driving licen[cs]e|licen[cs]e)(\s*(?:number|no\.?)?\s*(?:is|:)?\s*)([A-Z0-9]{8,18})\b/gi, (m, label, sep, val) => {
    if (!/\d/.test(val)) return m;
    removed.add("an ID number");
    return `${label}${sep}[removed]`;
  });

  // API keys and tokens (supplier secrets).
  text = text.replace(
    /\b(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]{10,}\b|\bgsk_[A-Za-z0-9]{20,}\b|\beyJ[\w-]+\.[\w-]+\.[\w-]+\b|\bBearer\s+\S{16,}/g,
    () => {
      removed.add("a security token");
      return "[token removed]";
    },
  );

  // Passwords / passcodes – separator optional ("my password hunter2"); skip ordinary words.
  text = text.replace(
    /\b(password|passcode|passwd|pwd)\b(\s*(?:is|:|=)\s*|\s+)(?!(?:reset|change|changed|help|for|to|and|or|please|isn't|is|was|not|forgot|forgotten|doesn't|won't|on|of|the|my|a)\b)(\S+)/gi,
    (m, label, sep, val) => {
      if (!/[:=]|\bis\b/i.test(sep) && !/[\d\W_]/.test(val)) return m;
      removed.add("a password");
      return `${label}${sep}[removed]`;
    },
  );

  // Sign-in / reset / magic links and OAuth tokens.
  text = text.replace(/\bhttps?:\/\/\S*(?:reset|token|code=|otp|verify|magic|oauth|session|sig=)\S*/gi, () => {
    removed.add("a sign-in or reset link");
    return "[secure link removed]";
  });
  text = text.replace(/\bya29\.[\w-]{20,}|\bEAA[A-Za-z0-9]{30,}|\b(?:access|refresh|id)_token=\S+/g, () => {
    removed.add("a security token");
    return "[token removed]";
  });

  // Health details (Doc03 AT-53 / AI-05): an NHS number, or a medical condition / medication stated about someone.
  text = text.replace(/\b(?:NHS (?:number|no\.?))\s*(?:is|:)?\s*\d{3}\s?\d{3}\s?\d{4}\b/gi, () => {
    removed.add("health details");
    return "NHS number [removed]";
  });
  text = text.replace(
    /\b((?:i|he|she|they|my (?:mum|mother|dad|father|wife|husband|partner|son|daughter|nan|gran))\s+(?:has|have|had|is on|takes|take|suffers? from)\s+)(dementia|alzheimer'?s|diabetes|epilepsy|cancer|copd|heart (?:condition|failure)|parkinson'?s|a stroke|[a-z]+(?:mab|pril|olol|statin|pam|zole|mycin))\b/gi,
    (_m, lead) => {
      removed.add("health details");
      return `${lead}[health detail removed]`;
    },
  );

  // Date of birth and security answers (Doc11 FR-11-015 / -036).
  text = text.replace(/\b(dob|d\.o\.b\.?|date of birth|born on)\b(\s*(?:is|:)?\s*)\d{1,2}[/.\- ]\d{1,2}[/.\- ]\d{2,4}/gi, (_m, label, sep) => {
    removed.add("a date of birth");
    return `${label}${sep}[removed]`;
  });
  text = text.replace(/\b(mother'?s maiden name|memorable (?:word|answer|information)|security answer)\b(\s*(?:is|:)?\s*)\S+/gi, (_m, label, sep) => {
    removed.add("security answers");
    return `${label}${sep}[removed]`;
  });

  // A message that is only a 6–8 digit number is treated as a one-time code.
  if (/^\s*\d{6,8}\s*$/.test(text)) {
    removed.add("a one-time code");
    text = "[code removed]";
  }

  // One-time codes (labelled).
  text = text.replace(
    /\b(one[- ]time (?:code|passcode|password)|otp|verification code|security code|pin|(?:(?:sms|text|login|sign[- ]in|access|auth(?:entication)?|2fa|mfa|verification|my)\s+)code)\b(\s*(?:is|:|=)?\s*)\d{4,8}\b/gi,
    (_m, label, sep) => {
      removed.add("a one-time code");
      return `${label}${sep}[removed]`;
    },
  );

  return { text, removed: [...removed] };
}

/* ─────────────────────────── Postcode helpers ─────────────────────────── */

const UK_POSTCODE_RE = /^(GIR ?0AA|[A-PR-UWYZ][A-HK-Y]?\d[A-Z\d]? ?\d[ABD-HJLNP-UW-Z]{2})$/i;

export function normalisePostcode(raw: string): string | null {
  const compact = raw.trim().toUpperCase().replace(/\s+/g, "");
  if (compact.length < 5 || compact.length > 7) return null;
  const formatted = `${compact.slice(0, -3)} ${compact.slice(-3)}`;
  return UK_POSTCODE_RE.test(formatted) ? formatted : null;
}

/* ─────────────────────────── Analytics (PII-free) ─────────────────────── */

export type LinkoEvent =
  | "linko_open"
  | "linko_close"
  | "linko_intent_selected"
  | "linko_message_sent"
  | "linko_handoff"
  | "linko_safety_shown"
  | "linko_dlp_redacted"
  | "linko_error"
  | "linko_feedback"
  | "linko_flow_exit"
  | "linko_session_started"
  | "linko_session_ended"
  | "linko_intent_clarified"
  | "linko_fallback_offered"
  | "linko_availability_result"
  | "linko_plans_viewed"
  | "linko_auth_required"
  | "linko_guardrail_triggered"
  | "linko_tool_failure"
  | "linko_ots_guidance_shown"
  | "linko_voice_safety_notice"
  | "linko_complaint_started"
  | "linko_answer_disputed"
  | "linko_fault_safety_triaged"
  | "linko_diagnostics_completed"
  | "linko_switch_route_selected"
  | "linko_complaint_recognised";

export const LINKO_RELEASE = "linko-2026-11-23";

/** Pushes privacy-minimised events to window.dataLayer when present. Never include chat text, postcodes or addresses. */
export function track(event: LinkoEvent, props: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    // Base fields only: page path (no query string) and release – never chat text or personal data.
    w.dataLayer?.push({ event, page_id: window.location.pathname, version: LINKO_RELEASE, ...props });
  } catch {
    // analytics must never break the chat
  }
}

/* ───────────────────── Typed AI answer (Doc12 output schema) ────────────── */

/** Route keys the model may propose. Anything else is dropped. */
export const FLOW_ROUTES = {
  check_address: "availability",
  speak_to_team: "handoff",
  report_problem: "fault",
  telecare_safety: "safety",
  privacy: "privacy",
} as const satisfies Record<string, FlowId>;

export type PageKey = keyof typeof PAGES;
export type RouteKey = PageKey | keyof typeof FLOW_ROUTES;

export const ROUTE_KEYS: string[] = [...Object.keys(PAGES), ...Object.keys(FLOW_ROUTES)];

export type AnswerMode = "public_guidance" | "secure_required" | "handoff" | "abstain";

export interface LinkoAnswer {
  status:
    | "answered"
    | "abstained"
    | "handoff"
    | "safety"
    | "complaint"
    | "budget_limited"
    | "provider_unavailable"
    | "rate_limited"
    | "invalid";
  message: string;
  tone?: MessageTone;
  actions: LinkoAction[];
  /** Set when the server removed sensitive data from the user's message. */
  redacted?: string[];
  /** Set when the answer is a deterministic guided step rather than model text. */
  flow?: FlowId;
}

/** Converts a model-proposed {label, route} into a safe UI action, or null. */
export function actionFromRoute(route: string, label?: string): LinkoAction | null {
  const cleanLabel = (label ?? "").replace(/[<>[\]()*_`#]/g, "").trim().slice(0, 40);
  if (route in FLOW_ROUTES) {
    const flow = FLOW_ROUTES[route as keyof typeof FLOW_ROUTES];
    const fallback: Record<string, string> = {
      availability: "Check my address",
      handoff: "Speak to a person",
      fault: "Report a problem",
      safety: "Telecare & safety help",
      privacy: "Privacy and AI",
    };
    return { kind: "flow", flow, label: cleanLabel || fallback[flow] };
  }
  // Speed-code membership is unverified (Doc06 C07), so the model may not link to it.
  if (route in PAGES && route !== "ofcomSpeed") {
    const href = PAGES[route as PageKey];
    return { kind: "link", href, label: cleanLabel || route };
  }
  return null;
}
