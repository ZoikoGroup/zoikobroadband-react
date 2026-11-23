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
const speakToSupport: LinkoAction = { kind: "flow", label: "Speak to support", flow: "handoff" };
const NEEDS_QUOTE = "Available once a current quote is returned for your exact address.";

/** Emergency copy (Doc01 CF-06 / Doc06). */
export const EMERGENCY_LINE =
  "If anyone is in immediate danger, call 999 or 112 using a working phone or mobile — don't rely on the affected line. Linko is not an emergency service.";

export const COPY = {
  // LK-WF-01 (Document 01)
  welcome:
    "Hello, I'm Linko, Zoiko Broadband's AI assistant. I can help you explore broadband, check availability, follow an order or find support. What would you like to do?",
  // Document 01 §3.2 block 02 – trust strip
  trust: "I'm Linko, Zoiko Broadband's AI assistant.",
  trustLink: "How I use information",
  // Document 01 §3.2 block 05 / Doc01 footer
  footerDisclaimer: "AI assistant • Information may need checking",
  composerPlaceholder: "Type your question…",
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
    `For your security I removed what looked like ${what} from your message. Please don't share passwords, one-time codes, card or bank details here — Zoiko will only ask for these on secure pages.`,
  // LK-WF-20
  summaryIntro: "Here's what we covered. I've only completed an action when the relevant system has confirmed it.",
  feedbackThanks: "Thanks for your feedback.",
  // LK-WF-16
  signIn: "Please sign in to MyZoiko to continue securely. I won't ask for your password or one-time code in chat.",
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
    text: "Plans, prices and speeds depend on the exact property. Once your full address has been checked, I'll show the plans currently shown for your selected address — prices and speeds are then confirmed in checkout. I won't quote figures before that.",
    widget: "planCard",
    actions: [
      { kind: "flow", label: "Change address", flow: "availability", primary: true },
      { kind: "link", label: "Compare these plans", href: PAGES.comparePlans },
      { kind: "link", label: "View full plan details", href: PAGES.allPlans },
      { kind: "link", label: "Continue to secure checkout", href: PAGES.checkAvailability, disabledReason: NEEDS_QUOTE },
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
    text: "For most home broadband switches, your new provider manages the switch through One Touch Switch. I'll explain what happens before you confirm.\n- Check your new connection at your exact address.\n- Choose your plan and review the contract information in secure checkout.\n- Zoiko arranges the switch with your current provider — please don't cancel your current service yourself.\n- Your current provider can tell you about any early-exit charges. Some cases (business lines, home moves, some bundles) need our team instead.\n\nDo you also have a landline, alarm or telecare device using your current service?",
    actions: [
      { kind: "flow", label: "Check my new connection", flow: "availability", primary: true },
      { kind: "link", label: "Understand switching", href: PAGES.switching },
      { kind: "link", label: "Continue to secure order", href: PAGES.checkAvailability, disabledReason: NEEDS_QUOTE },
      { kind: "flow", label: "Yes, I have an alarm or telecare", flow: "safety" },
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
    text: "Your appointment details are shown below as held by the order system. Would you like preparation guidance or to check whether a change is possible? I can't book, cancel or change an engineer visit from chat.",
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
      { kind: "flow", label: "Continue without signing in", flow: "welcome" },
      speakToSupport,
    ],
  },

  /* LK-WF-10 Moving home (CF-05) */
  moving: {
    screen: "Moving home",
    topic: "Moving home",
    text: "I can check the options at your new address and help you understand the next steps. Moving your existing service may require a new order.",
    actions: [
      { kind: "flow", label: "Check new address", flow: "movingAddress", primary: true },
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
      { kind: "flow", label: "Not sure", flow: "safety" },
      { kind: "flow", label: "No", flow: "faultStatus" },
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
    text: "Is the problem affecting all devices or just one? That helps us distinguish Wi-Fi coverage from a connection fault.",
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
      { kind: "flow", label: "Raise a billing query", flow: "complaint" },
    ],
  },

  /* LK-WF-14 Cancellation, refunds and complaints (CF-07) */
  complaint: {
    screen: "Cancellation, refund and complaints",
    topic: "Cancellation or complaint",
    text: "I can explain the process or help you contact the right team. Any charges, refunds or cancellation dates must be checked against your contract.\n\nYou can make a complaint without signing in. If a qualifying complaint raised from 8 April 2026 isn't resolved within six weeks, or you receive a deadlock letter, you may be able to take it to an independent ADR scheme. I can't log a complaint from this chat, so I won't tell you one has been logged.",
    actions: [
      { kind: "ask", label: "Understand cancellation", text: "How does cancelling my contract work?" },
      { kind: "flow", label: "Request cancellation help", flow: "handoff" },
      { kind: "link", label: "Make a complaint", href: PAGES.contactUs, primary: true },
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
      { kind: "flow", label: "Not sure", flow: "safety" },
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
      { kind: "flow", label: "Speak to a specialist", flow: "handoffChannels" },
      { kind: "link", label: "Learn about digital lines", href: PAGES.digitalLines },
    ],
  },

  /* LK-WF-17 Human agent hand-off (CF-08) — summary consent first */
  handoff: {
    screen: "Human escalation and callback",
    topic: "Speaking to our team",
    text: "I can connect you to the right team. Would you like me to pass on a short summary so you don't have to repeat yourself?",
    actions: [
      { kind: "flow", label: "Yes, prepare a summary", flow: "handoffShare", primary: true },
      { kind: "flow", label: "No, continue without sharing", flow: "handoffChannels" },
      { kind: "flow", label: "Back to Linko", flow: "welcome" },
    ],
  },
  handoffShare: {
    screen: "Human escalation and callback",
    text: "Here's a short summary with no personal details. Linko can't send it to an adviser automatically yet, so copy it and paste it into the live chat or enquiry form.",
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
    text: "Here are the ways to reach our team. I can't see live queue or wait times, so I won't promise one. Current opening hours are on our Get help page.",
    actions: [
      { kind: "link", label: "Chat with an adviser", href: COMPANY.liveChatUrl, primary: true },
      { kind: "link", label: "Request a callback", href: PAGES.getHelp },
      { kind: "link", label: "Send an enquiry", href: PAGES.contactUs },
      { kind: "link", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref },
      { kind: "flow", label: "Back to Linko", flow: "welcome" },
    ],
  },

  /* LK-WF-18 Privacy, AI limits and transcript controls */
  privacy: {
    screen: "Privacy, AI limits and transcript controls",
    topic: "Privacy and AI",
    text: "I'm an AI assistant. I'll use the information needed to answer your question and may transfer details to a human team if you ask. Please don't share passwords or payment-card numbers.\n\nYour chats are saved only in this browser on this device (Chat history in the menu) until you delete them — they aren't stored by Zoiko Broadband. For data-rights requests, use our privacy notice.",
    actions: [
      { kind: "link", label: "Read privacy notice", href: PAGES.privacy, primary: true },
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
      { kind: "command", label: "End chat", command: "endChat" },
    ],
  },
};

/** LK-WF-01 first-turn chips: Check availability | Compare plans | Business broadband | Track my order
 * (+ "Speak to a person" as a link). The first chip adapts to the page the visitor is on (Doc02). */
export function welcomeActions(pathname: string): LinkoAction[] {
  const base: LinkoAction[] = [
    { kind: "flow", label: "Check availability", flow: "availability" },
    { kind: "flow", label: "Compare plans", flow: "plans" },
    { kind: "flow", label: "Business broadband", flow: "business" },
    { kind: "flow", label: "Track my order", flow: "track" },
  ];
  const p = pathname || "/";
  let page: LinkoAction | null = null;
  if (p.startsWith("/report-a-fault") || p.includes("led-light") || p.includes("wi-fi") || p.includes("wireless"))
    page = { kind: "flow", label: "Report a problem", flow: "fault" };
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
  note: "Example layout — no tariff values authorised",
  rows: [
    ["Monthly price", "From authorised quote"],
    ["Download / upload", "Address-qualified range"],
    ["Contract", "Selected plan term"],
    ["Upfront charges", "Itemised, if applicable"],
  ],
} as const;

export const SECURE_CARD = {
  title: "Authenticated order view",
  banner: "Private details are hidden in public chat.",
  rows: [
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
  /\b(telecare|tele-care|care ?line|careline|lifeline|personal alarm|care alarm|pendant alarm|medical alarm|alarm (?:uses|is on|on) (?:the|my) (?:phone|line)|lift line|power ?cut|power outage|999|112|emergency|vulnerable)\b/i;
const HUMAN_RE =
  /\b(speak|talk|chat)\s+(?:to|with)\s+(?:a|an|the|your|some)?\s*(?:real\s+)?(?:person|human|agent|adviser|advisor|someone|team|representative)\b|\breal person\b|\bhuman agent\b/i;
// Doc10: recognise complaints from dissatisfaction wording, not just the word "complaint".
const COMPLAINT_RE =
  /\b(complain\w*|ombudsman|adr|deadlock|unacceptable|disgusted|fed up|sick of|appalling|terrible service|awful service|rubbish service|useless service|want (?:a|my) refund|compensation)\b/i;

export type RoutedIntent = "safety" | "handoff" | "complaint" | null;

export function routeIntent(text: string): RoutedIntent {
  if (SAFETY_RE.test(text)) return "safety";
  if (HUMAN_RE.test(text)) return "handoff";
  if (COMPLAINT_RE.test(text)) return "complaint";
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

  // Passwords / passcodes.
  text = text.replace(/\b(password|passcode|passwd|pwd)\b(\s*(?:is|:|=)\s*)\S+/gi, (_m, label, sep) => {
    removed.add("a password");
    return `${label}${sep}[removed]`;
  });

  // One-time codes.
  text = text.replace(
    /\b(one[- ]time (?:code|passcode|password)|otp|verification code|security code|pin)\b(\s*(?:is|:|=)?\s*)\d{4,8}\b/gi,
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
  | "linko_flow_exit";

/** Pushes privacy-minimised events to window.dataLayer when present. Never include chat text, postcodes or addresses. */
export function track(event: LinkoEvent, props: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer?.push({ event, ...props });
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
}

/** Converts a model-proposed {label, route} into a safe UI action, or null. */
export function actionFromRoute(route: string, label?: string): LinkoAction | null {
  const cleanLabel = (label ?? "").replace(/[<>[\]()*_`#]/g, "").trim().slice(0, 40);
  if (route in FLOW_ROUTES) {
    const flow = FLOW_ROUTES[route as keyof typeof FLOW_ROUTES];
    const fallback: Record<string, string> = {
      availability: "Check my address",
      handoff: "Speak to our team",
      fault: "Report a problem",
      safety: "Telecare & safety help",
      privacy: "Privacy and AI",
    };
    return { kind: "flow", flow, label: cleanLabel || fallback[flow] };
  }
  if (route in PAGES) {
    const href = PAGES[route as PageKey];
    return { kind: "link", href, label: cleanLabel || route };
  }
  return null;
}
