/**
 * Deterministic, approved-content rules used by the public Linko API.
 *  - PUB-10 fault triage (Doc01 WF-11/12/15, Doc04 LK-WF-11/12/15)
 *  - PUB-07 switching guidance (Doc01 WF-06, CF-03)
 * No model is involved: these are fixed steps from the approved knowledge base.
 */

export const RULES_VERSION = "linko-rules-2026-11-23";

export type Symptom = "NO_CONNECTION" | "SLOW_SPEED" | "SLOW_WIFI" | "WIFI_DROPS" | "PHONE_LINE" | "OTHER";
export const SYMPTOMS: Symptom[] = ["NO_CONNECTION", "SLOW_SPEED", "SLOW_WIFI", "WIFI_DROPS", "PHONE_LINE", "OTHER"];

export interface TriageStep {
  id: string;
  text: string;
  /** Optional allow-listed help page for this step. */
  href?: string;
  linkLabel?: string;
}

/** Approved safety wording returned with every escalation (Doc04 LK-WF-15: clear limits, no 999 continuity promise). */
export const SAFETY_NOTICE =
  "Digital phone and telecare services may not work in a power cut or broadband outage. In an emergency, call 999 or 112 from a mobile or another working phone, and tell your alarm or telecare provider. Please don't restart or disconnect equipment the line depends on until you've spoken to us.";

export interface TriageResult {
  safetyEscalation: boolean;
  safetyNotice?: string;
  priority: "URGENT_SAFETY" | "NORMAL";
  /** "connection" = whole line, "wifi" = coverage on some devices. */
  category: "connection" | "wifi" | "voice" | "other";
  steps: TriageStep[]; // max 3 (Doc01 WF-12: stop after 3 steps → human)
  maxSteps: number;
}

const CONNECTION_STEPS: TriageStep[] = [
  {
    id: "cables",
    text: "Check the router and any fibre box (ONT) are switched on, and that all cables are pushed in firmly.",
    href: "/led-light-meanings",
    linkLabel: "What the router lights mean",
  },
  {
    id: "restart",
    text: "This briefly disconnects your internet and any digital phone. Do a normal restart: switch the router off at the wall, wait at least 30 seconds, switch it back on and allow a few minutes to reconnect. Please don't use the reset pinhole — a factory reset removes your settings.",
  },
  {
    id: "other-device",
    text: "Try a different device, ideally connected to the router with an Ethernet cable, to see whether the connection itself is working.",
    href: "/wired-a-wireless-speed",
    linkLabel: "Wired vs wireless speed",
  },
];

const SLOW_STEPS: TriageStep[] = [
  {
    id: "wired-test",
    text: "Run a speed test on a device connected by Ethernet cable — that shows the true line speed without Wi-Fi effects.",
    href: "/wired-a-wireless-speed",
    linkLabel: "Wired vs wireless speed",
  },
  {
    id: "close-apps",
    text: "Pause large downloads, cloud backups, streaming and game updates on other devices, then test again.",
  },
  {
    id: "compare",
    text: "Compare the result with the minimum and expected speeds in your own contract information. If it's consistently below the minimum, report a fault so we can investigate.",
    href: "/which-speed-do-i-need",
    linkLabel: "Which speed do I need?",
  },
];

const WIFI_STEPS: TriageStep[] = [
  {
    id: "placement",
    text: "Move closer to the router, or move the router somewhere central, open and raised — away from thick walls, metal objects and other electronics.",
  },
  {
    id: "rejoin",
    text: "On the affected device, turn Wi-Fi off and on again (or forget the network and rejoin using the Wi-Fi name and password on the back of the router).",
  },
  {
    id: "channel",
    text: "If nearby networks may be interfering, try changing the Wi-Fi channel using our step-by-step guide.",
    href: "/change-wi-fi-channel",
    linkLabel: "Change Wi-Fi channel",
  },
];

export function triage(input: {
  symptom: Symptom;
  allDevices?: boolean | null;
  digitalVoice?: boolean;
  telecareOrAlarm?: boolean;
}): TriageResult {
  // Safety takes precedence over every other rule (Doc04 LK-WF-11/15, SEQ-05).
  if (input.telecareOrAlarm || input.digitalVoice || input.symptom === "PHONE_LINE") {
    return { safetyEscalation: true, safetyNotice: SAFETY_NOTICE, priority: "URGENT_SAFETY", category: "voice", steps: [], maxSteps: 0 };
  }
  if (input.symptom === "NO_CONNECTION") return { safetyEscalation: false, priority: "NORMAL", category: "connection", steps: CONNECTION_STEPS, maxSteps: 3 };
  if (input.symptom === "SLOW_SPEED") return { safetyEscalation: false, priority: "NORMAL", category: "connection", steps: SLOW_STEPS, maxSteps: 3 };
  if (input.symptom === "SLOW_WIFI" || input.symptom === "WIFI_DROPS") {
    // All devices affected → more likely the connection than Wi-Fi coverage (Doc01 WF-12).
    return input.allDevices
      ? { safetyEscalation: false, priority: "NORMAL", category: "connection", steps: CONNECTION_STEPS, maxSteps: 3 }
      : { safetyEscalation: false, priority: "NORMAL", category: "wifi", steps: WIFI_STEPS, maxSteps: 3 };
  }
  return { safetyEscalation: false, priority: "NORMAL", category: "other", steps: [], maxSteps: 0 };
}

/* ───────────────────────────── PUB-07 switching ───────────────────────────── */

export type CustomerType = "RESIDENTIAL" | "BUSINESS";

export interface SwitchGuidance {
  route: "RESIDENTIAL_OTS" | "HOME_MOVE" | "BUSINESS_SPECIALIST" | "SAFETY_REVIEW";
  outcome: "INFO_ONLY" | "HANDOFF";
  steps: string[];
  caveats: string[];
}

export function switchingGuidance(input: {
  customerType: CustomerType;
  sameAddress: boolean;
  hasLandlineOrTelecare?: boolean;
}): SwitchGuidance {
  if (input.hasLandlineOrTelecare) {
    return {
      route: "SAFETY_REVIEW",
      outcome: "HANDOFF",
      steps: ["Speak to our team before any change so we can arrange the safest route for your line."],
      caveats: ["Digital phone services may not work during a power cut without suitable backup."],
    };
  }
  if (input.customerType === "BUSINESS") {
    return {
      route: "BUSINESS_SPECIALIST",
      outcome: "HANDOFF",
      steps: ["A business specialist confirms the switching route, options and any SLA for your premises."],
      caveats: ["Residential One Touch Switch rules don't automatically apply to business lines."],
    };
  }
  if (!input.sameAddress) {
    return {
      route: "HOME_MOVE",
      outcome: "INFO_ONLY",
      steps: ["Check broadband options at your new address.", "Existing customers sign in to review moving options."],
      caveats: ["Moving may need a new order; your move date is a preference until confirmed."],
    };
  }
  return {
    route: "RESIDENTIAL_OTS",
    outcome: "INFO_ONLY",
    steps: [
      "Check your new connection at your exact address.",
      "Choose your plan and review the contract information in secure checkout.",
      "Zoiko, as your new provider, arranges the switch through One Touch Switch.",
    ],
    caveats: [
      "Don't cancel your current service yourself.",
      "Your current provider can tell you about any early-exit charges.",
      "Some services (for example some bundles or landline-dependent equipment) need our team to review first.",
    ],
  };
}
