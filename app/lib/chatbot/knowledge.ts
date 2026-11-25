/**
 * Linko knowledge base (public, approved-for-chat content only).
 *
 * Rules from the Linko spec (Doc06 / Doc12 / Doc13):
 *  - Only PUBLIC information goes here. No account data, prices, fees,
 *    speeds, refund amounts, retention periods or opening hours unless the
 *    business has signed them off.
 *  - Website wording the spec flags as unverified or conflicting
 *    ("24/7", "unlimited", callback within 2 hours, cooling-off start,
 *    contract length, PCI/bank-grade claims, speed-code membership,
 *    automatic compensation) is deliberately NOT included.
 *  - Every item is still DRAFT pending Product / Legal approval.
 *  - Doc06 §05/§11: each item carries a source ID and review date; items past
 *    effectiveTo or reviewDue are excluded from the prompt automatically.
 */
import { COMPANY } from "./linko";

export { COMPANY };

export const KB_VERSION = "kb-2026-11-23-draft";
export const KB_STATUS = "DRAFT_NOT_APPROVED";

export interface KnowledgeItem {
  id: string;
  /** Doc13 §06.2 document version. */
  version?: string;
  /** Set when Product/Legal sign the item off (Doc13 §06.1). Unapproved items are draft. */
  approvedBy?: string;
  approvedAt?: string;
  title: string;
  /** Human-readable approved source (shown to customers under AI answers). */
  source: string;
  /** Doc06 §02 source register ID. */
  sourceId: string;
  /** ISO date; the item is withdrawn from the prompt on/after this date. */
  reviewDue: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  text: string;
}

/**
 * Doc01 LK-C11 / Doc07 C15: the Zoiko page a customer can open to read the source of an AI answer.
 * Kept apart from the items so links can change without changing the approved text (or its hash).
 */
export const KNOWLEDGE_HREF: Record<string, string> = {
  K01: "/about-us",
  K02: "/contact-us",
  K03: "/check-availability",
  K04: "/which-speed-do-i-need",
  K05: "/terms-conditions",
  K06: "/switch-to-zoiko",
  K07: "/moving-home",
  K08: "/setup-installation",
  K09: "/report-a-fault",
  K10: "/digital-lines",
  K11: "/payments-billing",
  K12: "/contact-us",
  K13: "/business-broadband",
  K14: "/privacy-notice",
  K15: "/black-friday",
  K16: "/bundles",
};

/** Date the current knowledge snapshot was written (from KB_VERSION, e.g. kb-2026-11-23-draft). */
export function knowledgeUpdatedOn(k?: KnowledgeItem): string {
  return k?.effectiveFrom ?? (/(\d{4}-\d{2}-\d{2})/.exec(KB_VERSION)?.[1] ?? "");
}

/** What a customer sees about a source: link, version, date and whether it is approved or still draft (Doc07 C15 variants). */
export function sourceInfo(k: KnowledgeItem) {
  const state = approvalState(k);
  return {
    id: k.id,
    title: k.title.replace(/\s*\(.*$/, ""),
    source: k.source,
    href: KNOWLEDGE_HREF[k.id] ?? null,
    version: k.version ?? "v1",
    updated: knowledgeUpdatedOn(k),
    status: (k.approvedAt || state === "APPROVED" ? "APPROVED" : "DRAFT") as "APPROVED" | "DRAFT",
  };
}
export type SourceInfo = ReturnType<typeof sourceInfo>;

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: "K01",
    title: 'About Zoiko Broadband and Linko',
    source: "Zoiko website – About / Linko scope",
    sourceId: "S01",
    reviewDue: "2027-02-23",
    text: `- Zoiko Broadband offers UK residential and business broadband services: Full Fibre (FTTP) and Part Fibre (SOGEA), digital phone lines, bundles and multi-site business connectivity.
- Broadband and digital phone lines are separate: a phone line is optional and can be added, or taken as part of a bundle. Don't say that a broadband package includes a phone line unless the customer's quote says so.
- Linko is Zoiko Broadband's AI assistant. It can explain information and guide people to secure services or a human adviser. It is not a person and not an emergency service.`,
  },
  {
    id: "K02",
    title: 'Contact routes (no hours or response times are promised in chat)',
    source: "Zoiko website – Get help / Contact us",
    sourceId: "S06",
    reviewDue: "2027-02-23",
    text: `- Phone: ${COMPANY.phone}
- Email: ${COMPANY.supportEmail}
- Published opening hours (Contact us page): ${COMPANY.hours}. Check the Get help page for any changes; Linko can't see queue or wait times.
- Live chat with an adviser and callback requests: Get help page.
- Report a fault: Report a fault page.`,
  },
  {
    id: "K03",
    title: 'Availability, plans and prices',
    source: "Zoiko website – Check availability",
    sourceId: "S07",
    reviewDue: "2027-02-23",
    text: `- Availability depends on the exact address, not just the postcode. A postcode can cover several premises with different connections. Customers enter a postcode, then select their exact address in the availability checker.
- Eligible plans, monthly prices, set-up or installation charges, contract term, VAT basis and any scheduled price changes are shown in the approved quote for that address, before checkout. Linko never quotes prices, speeds, fees or discounts.
- Checking availability does not create an order.
- If an address isn't listed (for example a new build), our team can check it manually.
- Compare plans: after checking an address, customers can compare eligible plans side by side.`,
  },
  {
    id: "K04",
    title: 'Broadband types (plain-language glossary)',
    source: "Zoiko website – Full Fibre / Part Fibre",
    sourceId: "S03",
    reviewDue: "2027-02-23",
    text: `- Full Fibre (FTTP, Fibre to the Premises): fibre runs all the way into the property. Availability and achievable speed depend on the specific address.
- Part Fibre (SOGEA, Single Order Generic Ethernet Access): fibre to the street cabinet, copper for the last stretch. It doesn't need a traditional analogue phone line. Speeds depend on the line from the cabinet.
- Download speed = receiving data (browsing, streaming). Upload speed = sending data (video calls, backups, large files).
- Speeds depend on the address and package. Customers should use the minimum and expected speeds in their own contract information. Wi-Fi can be slower than the line because of walls, distance, interference and number of devices; a wired (Ethernet) test gives the truest reading.
- Choosing a speed: the need grows with the number of people and devices online at once, 4K/HD streaming, online gaming and large downloads. Working from home and video calls also depend on upload speed, and a wired connection helps. Linko doesn't recommend a speed figure; the "Which speed do I need?" page gives guidance, and the speeds available at an address are shown after an availability check.`,
  },
  {
    id: "K05",
    title: 'Contracts and consumer rights (general information, not a decision for a specific case)',
    source: "Ofcom – Contracts and price rises",
    sourceId: "S11",
    reviewDue: "2027-02-23",
    text: `- Before a consumer (or qualifying small business) is bound, they must receive pre-contract information and a contract summary.
- For new consumer contracts since 17 January 2025, any in-contract price rises must be shown in pounds and pence with dates, not linked to inflation or percentages.
- Many distance and off-premises consumer service contracts have a statutory 14-day cancellation period, with conditions and exceptions. Whether it applies, and any charges, must be checked against the customer's contract.
- Early-exit charges, refunds and installation-fee refunds are assessed against the specific contract by our team; Linko does not calculate them.`,
  },
  {
    id: "K06",
    title: 'Switching to Zoiko',
    source: "Ofcom – Switching broadband provider",
    sourceId: "S12",
    reviewDue: "2027-02-23",
    text: `- One Touch Switch is the Ofcom process (live since 12 September 2024) for switching home broadband and landline services between providers, including across different networks such as Openreach, full-fibre networks and Virgin Media. The new provider manages the change, so customers should not cancel their current service themselves.
- One Touch Switch is for residential (home) customers. Business lines and pay-TV services follow a different route.
- If the switch can't be matched automatically, our team helps complete it.
- The current provider can explain any early-exit charges.
- Keeping a phone number can't be promised in chat; the switching team checks it.
- Business switches and home moves follow a different route and go to a specialist.`,
  },
  {
    id: "K07",
    title: 'Moving home',
    source: "Zoiko website – Moving home",
    sourceId: "S01",
    reviewDue: "2027-02-23",
    text: `- Check availability at the new address as early as possible. Moving may need a new order, and options for the current service are shown after secure sign-in.
- Keeping the same number can't be promised until our service team checks.
- Moving can affect alarms and telecare devices: speak to our team and the device provider first.`,
  },
  {
    id: "K08",
    title: 'Installation and router',
    source: "Zoiko website – Setup and installation",
    sourceId: "S06",
    reviewDue: "2027-02-23",
    text: `- Whether an engineer visit or self-install applies is confirmed in the order. Linko cannot book, confirm or change engineer appointments; appointment details are shown after sign-in.
- ONT (Optical Network Terminal): a small powered box where the fibre enters the property; it connects to the router.
- Router placement: central, open, raised and ventilated; away from thick walls, metal objects and other electronics.
- How long installation takes, and whether anyone needs to be at home, depends on the address and the order; the order confirmation explains what will happen. Linko doesn't estimate installation times.
- The exact router and any equipment charges are shown in the customer's own approved offer.
- Using your own router: Linko can't say whether a customer-owned router can be used, will work or will be supported on Zoiko's service — never say "you can use your own router". Our team can answer this before ordering; the router supplied with the order is the one Zoiko supports.
- Router light meanings: Router LED light meanings page.
- Guides: Setup and installation, Installation and routers, Installation guide pages.`,
  },
  {
    id: "K09",
    title: 'Troubleshooting (safe steps, one at a time)',
    source: "Zoiko website – Report a fault / router guides",
    sourceId: "S08",
    reviewDue: "2027-02-23",
    text: `- First ask whether anyone relies on the line for a landline, emergency calls or a telecare alarm. If yes or unsure: do not suggest restarting or disconnecting equipment; send them to urgent human support.
- No connection: check whether there is a known issue, check cables are secure, then try a normal router restart (switch off, wait at least 30 seconds, switch on, allow a few minutes). Say first that a restart briefly disconnects the internet and any digital phone. Test with another device.
- Slow speed: test on a wired connection, close heavy apps and downloads, and compare with the contract speed. Wi-Fi tips: router placement, changing Wi-Fi channel.
- Wi-Fi drops: ask whether it affects all devices or one device.
- A factory reset removes personalised settings: try a normal restart first and only factory-reset when the approved guide or a support adviser says so.
- Never ask for router admin passwords. If problems continue, report a fault or speak to our team. Linko can't give repair times or outage causes.`,
  },
  {
    id: "K10",
    title: 'Digital voice, landlines and telecare (safety first)',
    source: "Ofcom – Future of landline calls",
    sourceId: "S16",
    reviewDue: "2027-02-23",
    text: `- Full Fibre and SOGEA don't include a traditional analogue landline. Digital phone services run over broadband and can stop working in a power cut without suitable backup.
- The UK's old analogue phone network is being switched off, with a deadline of 31 January 2027, so landline calls are moving to digital.
- Ofcom expects providers to offer a free backup solution (at least one hour) to customers who rely on their landline, such as telecare users or people without a mobile signal. Customers should tell us before switching if they rely on their line or use telecare.
- Anyone who relies on a landline for emergency calls or uses telecare, a care alarm, security alarm or lift line should speak to our team before any change, and check with the equipment provider. Don't assume a telecare alarm will work after a digital voice change.
- Immediate emergency: use 999 or 112 from a working connection or another person's phone.
- Guidance: Digital lines and Landline pages, and Ofcom's guidance on the future of landline calls.`,
  },
  {
    id: "K11",
    title: 'Billing and account',
    source: "Zoiko website – Payments & billing",
    sourceId: "S05",
    reviewDue: "2027-02-23",
    text: `- Account-specific figures (bills, balances, payments, refunds) are only shown after secure sign-in to the Zoiko account. Linko never asks for card or bank details; payments happen on secure pages only.
- Bills can be viewed and downloaded in the account's Billing & Payments area. Payment details are updated there too.
- Billing help: Payments & billing page.`,
  },
  {
    id: "K12",
    title: 'Complaints',
    source: "Ofcom – Complaints rules",
    sourceId: "S13",
    reviewDue: "2027-02-23",
    text: `- Customers can make a complaint without signing in, using the contact page or by phone.
- Eligible complaints first raised on or after 8 April 2026 that aren't resolved within six weeks, or where a deadlock letter is issued, may be referred to an independent ADR scheme. Complaints raised before 8 April 2026 follow the earlier eight-week rule. Linko doesn't decide eligibility or name a scheme; our complaints code explains it.
- Compensation depends on the service, contract and rules that apply; our team reviews each case. Linko doesn't promise payments.`,
  },
  {
    id: "K13",
    title: 'Business broadband',
    source: "Zoiko website – Business broadband",
    sourceId: "S01",
    reviewDue: "2027-02-23",
    text: `- Availability depends on the exact business premises. Static IP, support levels, response targets and any SLA are confirmed for the selected service, not in chat.
- Multiple sites: a specialist reviews each site and prepares a tailored quote.`,
  },
  {
    id: "K14",
    title: 'Privacy',
    source: "Zoiko privacy notice",
    sourceId: "S17",
    reviewDue: "2027-02-23",
    text: `- While a chat is open, a copy with sensitive details removed is held briefly on Zoiko's servers (deleted when the chat ends or after a short period without activity) and processed by an AI service provider to answer the question.
- Chats are only kept in the visitor's own browser if they turn on "Save chat history" in the Linko menu (kept for a limited time, deletable at any time). The privacy notice explains how long information is kept. Linko can't pass a chat to an adviser automatically, but the visitor can choose to share a short summary.
- Data requests and privacy questions: privacy notice and contact page. Linko can't promise immediate deletion of records held for legal reasons.`,
  },
  {
    id: "K15",
    title: 'Black Friday',
    source: "Zoiko website – Black Friday",
    sourceId: "S02",
    reviewDue: "2027-02-23",
    effectiveTo: "2026-12-01",
    text: `- A Black Friday to Cyber Monday sale runs from 20 November to 30 November 2026 on selected fibre packages. Eligible packages, discounts and terms are shown on the Black Friday page and in the approved quote; Linko doesn't quote them.`,
  },
  {
    id: "K16",
    title: 'Bundles and refer a friend',
    source: "Zoiko website – Bundles / Refer a friend",
    sourceId: "S02",
    reviewDue: "2027-02-23",
    text: `- Bundles combine fibre broadband with digital phone lines. Bundle options, terms and prices are shown on the Bundles page and in the approved quote for the address; Linko doesn't quote them.
- Zoiko runs a refer-a-friend scheme. Eligibility, the reward and when it is paid are set out on the Refer a friend page; Linko doesn't state amounts or promise a reward.`,
  },
  {
    id: "K17",
    title: 'What Linko can help with',
    source: "Linko scope (Doc02 product requirements)",
    sourceId: "S01",
    reviewDue: "2027-02-23",
    text: `- Linko helps with Zoiko Broadband's broadband (Full Fibre and Part Fibre), digital phone lines, bundles, business connectivity, availability checks, orders, installation, faults, billing questions, moving home, switching, complaints and contacting the team.
- For anything else (for example TV packages, mobile phones or SIM cards, other companies' services, or general topics such as the weather), Linko says it can't help with that here and offers what it can help with. It doesn't say whether Zoiko offers a product unless the knowledge above says so.
- A visitor who mentions their current provider (for example "I'm with Sky" or "I'm with BT") is a possible switcher asking about Zoiko: answer the Zoiko question normally and mention that switching is handled for them. Never refuse just because another company is named.
- Accounts and sign-in: forgotten passwords are reset on the secure sign-in page; Linko never asks for or resets passwords in chat.`,
  }
];

function londonToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
}

/** Items that are in date today (Doc06 "Expired/stale content excluded"). */
/**
 * Doc13 §06.1: "Draft / awaiting Legal, Product or Finance → public retrieval NO".
 * Draft items are only served when LINKO_ALLOW_DRAFT_KB=true (an explicit, logged
 * override for development and pre-approval testing).
 */
// Never in production, whatever the flag says (Doc13 §06.1, AT14-048).
export const ALLOW_DRAFT_KB =
  process.env.LINKO_ALLOW_DRAFT_KB === "true" && (process.env.LINKO_ENVIRONMENT || process.env.NODE_ENV) !== "production";

/** Instruction-like text inside knowledge is treated as an injection risk (Doc12 GF-07 indirect, Doc13 AT-56/TH-02). */
export const KB_INJECTION_RE =
  /\b(?:ignore|disregard|override|bypass)\b[^.\n]{0,40}\b(?:instructions?|rules|prompt)\b|\b(?:system|developer)\s+(?:prompt|message|mode)\b|\byou are now\b|<\/?\s*system\s*>|^\s*(?:system|assistant)\s*:/im;
export function knowledgeLooksInjected(text: string) {
  return KB_INJECTION_RE.test(text);
}
let warnedDraft = false;

/**
 * Staff approval state for an item's exact text, supplied by the database layer (Doc13 §06.1:
 * approval is tied to the content hash, so any text change needs a fresh approval).
 */
export type ApprovalState = "IN_REVIEW" | "APPROVED" | "WITHDRAWN" | null;
let approvalLookup: ((id: string, hash: string) => ApprovalState) | null = null;
export function registerApprovalLookup(fn: (id: string, hash: string) => ApprovalState) {
  approvalLookup = fn;
}
export function approvalState(k: KnowledgeItem): ApprovalState {
  try {
    return approvalLookup ? approvalLookup(k.id, contentHash(k.text)) : null;
  } catch {
    return null;
  }
}

/** Items that are approved (or draft-allowed) and in date today (Doc06 "Expired/stale content excluded"). */
export function activeKnowledge(today = londonToday()): KnowledgeItem[] {
  if (ALLOW_DRAFT_KB && !warnedDraft && typeof window === "undefined") {
    warnedDraft = true;
    console.warn(JSON.stringify({ event: "linko_draft_kb_in_use", kb_version: KB_VERSION, kb_status: KB_STATUS }));
  }
  return KNOWLEDGE_ITEMS.filter((k) => {
    const state = approvalState(k);
    // Withdrawn content is never served, even with the draft override (L13-QA-030).
    if (state === "WITHDRAWN") return false;
    // Instruction-like content is quarantined from the model (AT-56).
    if (knowledgeLooksInjected(k.text)) return false;
    return (
      (Boolean(k.approvedAt) || state === "APPROVED" || ALLOW_DRAFT_KB) &&
      (!k.effectiveFrom || k.effectiveFrom <= today) &&
      (!k.effectiveTo || today < k.effectiveTo) &&
      today < k.reviewDue
    );
  });
}

/** The AI may only answer when at least one usable knowledge item exists. */
export function kbReady() {
  return activeKnowledge().length > 0;
}

export function knowledgeById(id: string) {
  return KNOWLEDGE_ITEMS.find((k) => k.id === id) ?? null;
}

/** Short content fingerprint (FNV-1a) so evidence records the exact text version used (Doc13 §06.2, QA-029). */
export function contentHash(text: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function evidenceRef(id: string) {
  const k = knowledgeById(id);
  return k ? `${k.id}@${k.version ?? "v1"}#${contentHash(k.text)}` : id;
}
