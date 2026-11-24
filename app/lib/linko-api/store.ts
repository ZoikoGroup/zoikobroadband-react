/**
 * Linko API – short-lived server state (Doc01 §6 slots, Doc05 retention rules).
 *
 * In-memory and single-instance by design for this build: conversations,
 * opaque address tokens and eligibility references all expire quickly and are
 * purged on close. For several instances, move this to Redis with the same TTLs.
 * Nothing here is written to disk or logs.
 */

export type ConvState =
  | "WELCOME"
  | "INTENT"
  | "SLOT_COLLECTION"
  | "TOOL_PENDING"
  | "RESULT"
  | "AUTH"
  | "NEXT_ACTION"
  | "HUMAN"
  | "FAILED"
  | "END";

export interface StoredMessage {
  role: "user" | "assistant";
  content: string; // already redacted
}

export interface Conversation {
  id: string;
  createdAt: number;
  lastSeen: number;
  pageKey: string;
  state: ConvState;
  intent: string | null;
  history: StoredMessage[];
  /** Consecutive turns the assistant couldn't place (Doc01 WF-02: max 2). */
  clarifyCount: number;
  /** Retries for the current failing question (Doc01 WF-19: max 2). */
  retryCount: number;
  topics: string[];
  /** All user turns ever sent (history is trimmed, so the turn cap uses this). */
  userTurns: number;
  /** Monotonic message sequence for chat_message (Doc05 DM-04). */
  msgSeq: number;
  replies: Map<string, { at: number; body: string; status: number; digest: string }>; // requestId replay
  slots: {
    preferredMoveDate?: string;
    customerType?: "RESIDENTIAL" | "BUSINESS";
    safetyFlag?: boolean;
    /** Doc10 §07.1: when dissatisfaction was first expressed — preserved, never reset. */
    complaintFirstAt?: string;
  };
}

import { persistSessionCreated, persistSessionUpdate, purgeSession } from "@/app/lib/linko-db/persist";
import { PRIVACY_NOTICE_VERSION } from "@/app/lib/chatbot/linko";

const IDLE_TTL_MS = 30 * 60 * 1000; // conversation idle expiry
const MAX_LIFETIME_MS = 4 * 60 * 60 * 1000; // absolute max life (Doc05 DM-03 / §12.2)
const MAX_CONVERSATIONS = 5000;

/* One shared instance per server process: route handlers may load this module
 * separately (and dev hot-reload re-evaluates it), so state lives on globalThis. */
const g = globalThis as unknown as {
  __linkoStore?: {
    conversations: Map<string, Conversation>;
    addresses: Map<string, AddressRecord>;
    eligibility: Map<string, EligibilityRecord>;
  };
};
g.__linkoStore ??= { conversations: new Map(), addresses: new Map(), eligibility: new Map() };
const conversations = g.__linkoStore.conversations;

function sweep() {
  const now = Date.now();
  for (const [id, c] of conversations) if (expired(c, now)) purgeConversation(id, "EXPIRE");
  for (const [k, v] of addresses) if (now > v.expiresAt) addresses.delete(k);
  for (const [k, v] of eligibility) if (now > v.expiresAt) eligibility.delete(k);
}

function expired(c: Conversation, now = Date.now()) {
  return now - c.lastSeen > IDLE_TTL_MS || now - c.createdAt > MAX_LIFETIME_MS;
}

/** Removes a conversation and every address / eligibility token issued to it (Doc05 CF-08). */
function purgeConversation(id: string, reason: "CLOSE" | "EXPIRE") {
  conversations.delete(id);
  purgeSession(id, reason);
  for (const [k, v] of addresses) if (v.conversationId === id) addresses.delete(k);
  for (const [k, v] of eligibility) if (v.conversationId === id) eligibility.delete(k);
}

function opaqueId(prefix: string) {
  const rnd = crypto.randomUUID().replace(/-/g, "");
  return `${prefix}_${rnd}`;
}

export function createConversation(pageKey: string): Conversation {
  sweep();
  if (conversations.size >= MAX_CONVERSATIONS) {
    const oldest = [...conversations.values()].sort((a, b) => a.lastSeen - b.lastSeen)[0];
    if (oldest) purgeConversation(oldest.id, "EXPIRE");
  }
  const c: Conversation = {
    id: opaqueId("conv"),
    createdAt: Date.now(),
    lastSeen: Date.now(),
    pageKey,
    state: "WELCOME",
    intent: null,
    history: [],
    clarifyCount: 0,
    retryCount: 0,
    topics: [],
    userTurns: 0,
    msgSeq: 0,
    replies: new Map(),
    slots: {},
  };
  conversations.set(c.id, c);
  persistSessionCreated(snapshot(c));
  return c;
}

export function getConversation(id: string): Conversation | null {
  const c = conversations.get(id);
  if (!c) return null;
  if (expired(c)) {
    purgeConversation(id, "EXPIRE");
    return null;
  }
  c.lastSeen = Date.now();
  return c;
}

export function closeConversation(id: string): Conversation | null {
  const c = conversations.get(id) ?? null;
  purgeConversation(id, "CLOSE"); // purge immediately on close (Doc01 WF-18 "End session → server purge")
  return c;
}

function snapshot(c: Conversation) {
  return {
    id: c.id,
    pageKey: c.pageKey,
    noticeVersion: PRIVACY_NOTICE_VERSION,
    state: c.state,
    intent: c.intent,
    topics: c.topics,
    safetyFlag: c.slots.safetyFlag === true,
    userTurns: c.userTurns,
  };
}

/** Writes the conversation's current state to the database (Doc05 DM-03). */
export function saveConversation(c: Conversation) {
  persistSessionUpdate(snapshot(c));
}

/* ───────────── Opaque address tokens (no raw wholesale IDs to the browser) ───────────── */

interface AddressRecord {
  /** Tokens belong to the conversation that searched for them (Doc05 T-12 / T-52). */
  conversationId: string;
  label: string;
  supplierId: string;
  districtCode: string;
  postcode: string;
  expiresAt: number;
}

const ADDRESS_TTL_MS = 20 * 60 * 1000;
const addresses = g.__linkoStore.addresses;

export function rememberAddress(rec: Omit<AddressRecord, "expiresAt">): string {
  sweep();
  const id = opaqueId("addr");
  addresses.set(id, { ...rec, expiresAt: Date.now() + ADDRESS_TTL_MS });
  return id;
}

export function lookupAddress(id: string, conversationId: string): AddressRecord | null {
  const rec = addresses.get(id);
  if (!rec || Date.now() > rec.expiresAt || rec.conversationId !== conversationId) return null;
  return rec;
}

/** A new address search invalidates earlier eligibility for that conversation (Doc04 AC-08). */
export function forgetEligibility(conversationId: string) {
  for (const [k, v] of eligibility) if (v.conversationId === conversationId) eligibility.delete(k);
}

/* ───────────── Eligibility references (opaque, time-limited, not reused across address change) ───────────── */

interface EligibilityRecord {
  conversationId: string;
  addressId: string;
  customerType: "RESIDENTIAL" | "BUSINESS";
  technologies: string[];
  offerCount: number;
  checkedAt: string;
  expiresAt: number;
}

const ELIGIBILITY_TTL_MS = 15 * 60 * 1000;
const eligibility = g.__linkoStore.eligibility;

export function rememberEligibility(rec: Omit<EligibilityRecord, "expiresAt">): { ref: string; expiresAt: string } {
  forgetEligibility(rec.conversationId); // only the latest premises qualification is valid
  const ref = opaqueId("elig");
  const expiresAt = Date.now() + ELIGIBILITY_TTL_MS;
  eligibility.set(ref, { ...rec, expiresAt });
  return { ref, expiresAt: new Date(expiresAt).toISOString() };
}

export function lookupEligibility(ref: string, conversationId?: string): EligibilityRecord | null {
  const rec = eligibility.get(ref);
  if (!rec || Date.now() > rec.expiresAt) return null;
  if (conversationId !== undefined && rec.conversationId !== conversationId) return null;
  return rec;
}
