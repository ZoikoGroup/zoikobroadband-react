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

/* ─────────────────────────── Actions & flows ─────────────────────────── */

export type FlowId =
  | "welcome"
  | "clarify"
  | "availability"
  | "plans"
  | "business"
  | "businessSingle"
  | "businessMulti"
  | "switching"
  | "moving"
  | "track"
  | "fault"
  | "faultType"
  | "billing"
  | "complaint"
  | "safety"
  | "handoff"
  | "privacy"
  | "end";

export type LinkoAction =
  /** Run a deterministic guided step (no AI call). */
  | { kind: "flow"; label: string; flow: FlowId; primary?: boolean }
  /** Send a question to the AI as if the user typed it. */
  | { kind: "ask"; label: string; text: string; primary?: boolean }
  /** Navigate to an allow-listed destination. */
  | { kind: "link"; label: string; href: string; primary?: boolean }
  /** Widget commands. */
  | { kind: "command"; label: string; command: "retry" | "restart" | "close" | "copySummary"; primary?: boolean };

export type MessageTone = "default" | "safety" | "error" | "notice";
export type MessageWidget = "postcode" | "summary" | "planCard" | "secureCard";

export interface FlowStep {
  /** Doc07 screen title shown in the header ("Linko / …"). */
  screen?: string;
  /** Human label used in the end-of-chat summary. */
  topic?: string;
  text: string;
  tone?: MessageTone;
  widget?: MessageWidget;
  actions: LinkoAction[];
}

const speakToPerson: LinkoAction = { kind: "flow", label: "Speak to a person", flow: "handoff" };

/** Emergency copy (Doc06 / Doc09 CW-07). */
export const EMERGENCY_LINE =
  "If there is an immediate emergency, use 999 or 112 from a working connection or another person's phone. Linko is not an emergency service.";

export const COPY = {
  // LK-WF-01 wireframe copy.
  welcome: "Hello. I can help you check availability, plans or support.",
  welcomeHint: "Choose a topic or type a question.",
  welcomeHuman: "You can speak to our team at any time.",
  trust: "I'm Linko, Zoiko Broadband's AI assistant.",
  footerDisclaimer: "AI may make mistakes. We confirm live details.",
  composerPlaceholder: "Your next message…",
  composerPlaceholderMobile: "Message Linko…",
  degraded:
    "I can't check that information just now. I haven't placed an order or changed anything. You can try again or speak to our team.",
  rateLimited:
    "You're sending messages faster than I can answer. Please wait a moment and try again, or speak to our team.",
  dlpNotice: (what: string) =>
    `For your security I removed what looked like ${what} from your message. Please don't share passwords, one-time codes, card or bank details here — Zoiko will only ask for these on secure pages.`,
  summaryIntro:
    "Here's what we covered. I've only completed an action when the relevant system has confirmed it.",
  feedbackThanks: "Thanks for your feedback.",
} as const;

export const FLOWS: Record<FlowId, FlowStep> = {
  /* LK-WF-01 */
  welcome: {
    text: COPY.welcome,
    actions: [], // filled per page by welcomeActions()
  },

  /* LK-WF-02 */
  clarify: {
    screen: "Intent clarification and smart routing",
    topic: "Finding the right help",
    text: "I can help with a new connection, an existing order or support. Which is closest to what you need?",
    actions: [
      { kind: "flow", label: "New broadband", flow: "availability" },
      { kind: "flow", label: "Business broadband", flow: "business" },
      { kind: "flow", label: "Existing order", flow: "track" },
      { kind: "flow", label: "Technical problem", flow: "fault" },
      { kind: "flow", label: "Billing question", flow: "billing" },
      speakToPerson,
    ],
  },

  /* LK-WF-03 / CW-01 */
  availability: {
    screen: "Postcode and exact-address eligibility",
    topic: "Checking availability",
    text: "What is the postcode of the property you would like us to check? I'll then ask you to choose the full address, because different properties can have different connections.",
    widget: "postcode",
    actions: [
      { kind: "link", label: "Open the full availability checker", href: PAGES.checkAvailability },
      speakToPerson,
    ],
  },

  /* LK-WF-04 */
  plans: {
    screen: "Eligible plan comparison",
    topic: "Comparing plans",
    text: "I can show the eligible plans once your address has been checked. Prices, speeds, set-up charges and contract terms depend on the exact property, so I won't quote figures here — your approved quote will show them before checkout.",
    widget: "planCard",
    actions: [
      { kind: "flow", label: "Review full quote", flow: "availability", primary: true },
      { kind: "link", label: "View all plans", href: PAGES.allPlans },
      { kind: "link", label: "Compare plans", href: PAGES.comparePlans },
      { kind: "ask", label: "FTTP vs SOGEA?", text: "What is the difference between FTTP and SOGEA?" },
    ],
  },

  /* LK-WF-05 */
  business: {
    screen: "Business quote and specialist",
    topic: "Business broadband",
    text: "I can help with a business connection. Is this for one business site or several? A specialist can confirm options and a tailored quote.",
    actions: [
      { kind: "flow", label: "One site", flow: "businessSingle" },
      { kind: "flow", label: "Multiple sites", flow: "businessMulti" },
      { kind: "flow", label: "Not sure", flow: "businessMulti" },
    ],
  },
  businessSingle: {
    screen: "Business quote and specialist",
    topic: "Business broadband (one site)",
    text: "Availability depends on the exact business premises. You can check the business address and compare standard business options, or speak to a business specialist about your requirements. Static IP, support levels and any SLA are confirmed for the selected service — I can't promise them here.",
    actions: [
      { kind: "link", label: "Check business availability", href: PAGES.checkAvailability, primary: true },
      { kind: "link", label: "Business broadband plans", href: PAGES.businessPlans },
      { kind: "link", label: "Speak to a business specialist", href: PAGES.businessBroadband },
      speakToPerson,
    ],
  },
  businessMulti: {
    screen: "Business quote and specialist",
    topic: "Business broadband (multiple sites)",
    text: "For several premises, a specialist reviews each site separately and prepares a tailored quote. You can share your requirements through the business enquiry form — please don't send financial records or sensitive customer data in this chat.",
    actions: [
      { kind: "link", label: "Request a tailored quote", href: PAGES.businessBroadband, primary: true },
      { kind: "link", label: "Multi-site connectivity", href: PAGES.multiSite },
      speakToPerson,
    ],
  },

  /* LK-WF-06 / CW-03 */
  switching: {
    screen: "One Touch Switch guidance",
    topic: "Switching to Zoiko",
    text: "For most eligible home broadband switches, your new provider manages the change through One Touch Switch, so please don't cancel your current service yourself. Your current provider can tell you about any early-exit charges. Business switches and home moves follow a different route.\n\nDo you also have a landline, alarm or telecare device using your current service?",
    actions: [
      { kind: "flow", label: "Check my address", flow: "availability", primary: true },
      { kind: "flow", label: "Yes, I have an alarm or telecare", flow: "safety" },
      { kind: "link", label: "How switching works", href: PAGES.switching },
      speakToPerson,
    ],
  },

  /* LK-WF-10 / CW-04 */
  moving: {
    screen: "Moving home",
    topic: "Moving home",
    text: "I can check broadband options at your new address and help you understand the next steps. Moving your existing service may need a new order, and I can't promise you'll keep the same number until our team checks. To see options for your current service, please sign in securely.",
    actions: [
      { kind: "flow", label: "Check new address", flow: "availability", primary: true },
      { kind: "link", label: "Sign in securely", href: PAGES.login },
      { kind: "link", label: "Moving home guide", href: PAGES.movingHome },
      speakToPerson,
    ],
  },

  /* LK-WF-08 / WF-16 / CW-06 */
  track: {
    screen: "Track your order",
    topic: "Tracking an order",
    text: "I can help you track your order. For privacy, please sign in to your Zoiko account before any personal order or appointment details are shown. I won't ask for your password or one-time code in chat.",
    widget: "secureCard",
    actions: [
      { kind: "link", label: "Sign in securely", href: PAGES.login, primary: true },
      { kind: "flow", label: "Continue as guest", flow: "welcome" },
      speakToPerson,
    ],
  },

  /* LK-WF-11 / CW-07 – safety question comes before any troubleshooting */
  fault: {
    screen: "Service status and fault triage",
    topic: "Reporting a problem",
    text: "I'm sorry your connection is having trouble. Before troubleshooting: does anyone rely on this line for a landline, emergency calls or a telecare alarm?",
    actions: [
      { kind: "flow", label: "Yes or not sure — get urgent support", flow: "safety", primary: true },
      { kind: "flow", label: "No — continue", flow: "faultType" },
    ],
  },
  faultType: {
    screen: "Wi-Fi speed and router guidance",
    topic: "Troubleshooting",
    text: "Is the problem no connection, slow speed, Wi-Fi drop-outs or the phone line? I'll go one safe step at a time, and you can skip to support whenever you like.",
    actions: [
      { kind: "ask", label: "No connection", text: "I have no internet connection at all. What should I check?" },
      { kind: "ask", label: "Slow speed", text: "My broadband is slow. What can I check?" },
      { kind: "ask", label: "Wi-Fi drop-outs", text: "My Wi-Fi keeps dropping out. Is it affecting all devices or one?" },
      { kind: "ask", label: "Phone line", text: "My digital phone line isn't working. What should I do?" },
      { kind: "link", label: "Report a fault", href: PAGES.reportFault },
      speakToPerson,
    ],
  },

  /* LK-WF-13 */
  billing: {
    screen: "Billing and payment support",
    topic: "Billing",
    text: "I can explain general billing questions, or help you open your bill securely. For your protection, please don't enter payment-card or bank details here — account-specific figures are only shown after you sign in.",
    actions: [
      { kind: "link", label: "Sign in to view bill", href: PAGES.login, primary: true },
      { kind: "ask", label: "Explain my bill", text: "How do I read and download my bill?" },
      { kind: "link", label: "Payments & billing help", href: PAGES.paymentsBilling },
      speakToPerson,
    ],
  },

  /* LK-WF-14 */
  complaint: {
    screen: "Cancellation, refund and complaints",
    topic: "Cancellation or complaint",
    text: "I can explain the process or help you contact the right team. Any charges, refunds or cancellation dates must be checked against your contract. You can make a complaint without signing in. If an eligible complaint isn't resolved within six weeks, or you receive a deadlock letter, you may be able to take it to an independent ADR scheme.",
    actions: [
      { kind: "link", label: "Make a complaint", href: PAGES.contactUs, primary: true },
      { kind: "ask", label: "Understand cancellation", text: "How does cancelling my contract work?" },
      { kind: "link", label: "Ofcom complaints guidance", href: EXTERNAL_LINKS.ofcomComplaints },
      speakToPerson,
    ],
  },

  /* LK-WF-15 – safety overrides every other intent */
  safety: {
    screen: "Digital voice and telecare safety",
    topic: "Digital voice and telecare safety",
    tone: "safety",
    text: `Digital phone services may not work during a power cut without suitable backup. If you use telecare or depend on your landline for emergency calls, please speak with our support team before changing services or restarting equipment.\n\n${EMERGENCY_LINE}`,
    actions: [
      { kind: "link", label: `Call our team on ${COMPANY.phone}`, href: COMPANY.phoneHref, primary: true },
      { kind: "flow", label: "Other ways to contact us", flow: "handoff" },
      { kind: "link", label: "Learn about digital lines", href: PAGES.digitalLines },
      { kind: "link", label: "Ofcom: future of landline calls", href: EXTERNAL_LINKS.ofcomLandline },
    ],
  },

  /* LK-WF-17 */
  handoff: {
    screen: "Human escalation and callback",
    topic: "Speaking to our team",
    text: "I can help you contact our team. Would you like to start a live chat, request a callback or see other contact options? This chat isn't passed to an adviser, so you may need to explain your question again. Current opening hours are shown on our Get help page.",
    actions: [
      { kind: "link", label: "Chat with an adviser", href: COMPANY.liveChatUrl, primary: true },
      { kind: "link", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref },
      { kind: "link", label: "Request a callback", href: PAGES.contactUs },
      { kind: "link", label: "Email support", href: COMPANY.supportEmailHref },
      { kind: "link", label: "Opening hours & help", href: PAGES.getHelp },
      { kind: "flow", label: "Continue with Linko", flow: "welcome" },
    ],
  },

  /* LK-WF-18 */
  privacy: {
    screen: "Privacy, AI limits and transcript controls",
    topic: "Privacy and AI",
    text: "I'm an AI assistant. I'll use the information needed to answer your question, and I'll only pass details to a human team if you ask. Your chats are saved in this browser on this device so you can find them in Chat history. They aren't stored by Zoiko Broadband, and you can delete them at any time from Chat history in the menu. Please don't share passwords, one-time codes or payment-card numbers.",
    actions: [
      { kind: "link", label: "Read privacy notice", href: PAGES.privacy, primary: true },
      { kind: "link", label: "Request data help", href: PAGES.contactUs },
      speakToPerson,
      { kind: "flow", label: "End chat", flow: "end" },
    ],
  },

  /* LK-WF-20 */
  end: {
    screen: "Conversation summary and close",
    text: COPY.summaryIntro,
    widget: "summary",
    actions: [
      { kind: "command", label: "Copy summary", command: "copySummary" },
      { kind: "command", label: "Start a new enquiry", command: "restart", primary: true },
      { kind: "command", label: "Close chat", command: "close" },
    ],
  },
};

/** First-turn actions (LK-WF-01: Check availability, Compare plans, Track an order, Get support),
 * with the first chip adapted to the page the visitor is on (Doc02). */
export function welcomeActions(pathname: string): LinkoAction[] {
  const base: LinkoAction[] = [
    { kind: "flow", label: "Check availability", flow: "availability" },
    { kind: "flow", label: "Compare plans", flow: "plans" },
    { kind: "flow", label: "Track an order", flow: "track" },
    { kind: "flow", label: "Get support", flow: "clarify" },
  ];
  const p = pathname || "/";
  let page: LinkoAction | null = null;
  if (p.startsWith("/business") || p.startsWith("/multi-site")) page = { kind: "flow", label: "Business broadband", flow: "business" };
  else if (p.startsWith("/report-a-fault") || p.includes("led-light") || p.includes("wi-fi") || p.includes("wireless"))
    page = { kind: "flow", label: "Report a problem", flow: "fault" };
  else if (p.startsWith("/payments-billing")) page = { kind: "flow", label: "Billing question", flow: "billing" };
  else if (p.startsWith("/moving-home")) page = { kind: "flow", label: "Moving home", flow: "moving" };
  else if (p.startsWith("/switch-to-zoiko")) page = { kind: "flow", label: "Switching to Zoiko", flow: "switching" };
  else if (p.startsWith("/digital-lines") || p.startsWith("/landline")) page = { kind: "flow", label: "Digital voice & telecare", flow: "safety" };
  // Page intent replaces "Compare plans" so there are always four clear first-turn actions.
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
