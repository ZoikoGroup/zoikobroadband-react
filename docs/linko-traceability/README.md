# Linko requirements traceability (Docs 01–14)

Every requirement-bearing line in the 14 Linko specification documents — each ID'd row (wireframes,
FR/AC/AT/QA tests, data-model items, controls) and each un-ID'd *must / should / never / always* sentence —
traced to the code that implements it.

Statuses: **MET** (behaviour exists, with evidence) · **PARTIAL** · **GAP** · **OUT-OF-SCOPE** (needs a system this
repo doesn't have — BT qualification, CRM, live-chat/agent platform, telephony, MyZoiko customer sign-in,
status feed, price catalogue — or an organisational action such as a sign-off).

## Baseline matrices

The per-document matrices in this folder were produced by an independent line-by-line review **before the
fix pass below**. They show every row with its evidence. Rows fixed afterwards are listed in the fix log.

| Doc | Title | Rows | Met | Partial | Gap | Out of scope | Matrix |
|---|---|---|---|---|---|---|---|
| 01 | Engineering conversation wireframes | 322 | 233 | 36 | 0 | 53 | [Doc01-02](Doc01-02.md) |
| 02 | Product requirements | 208 | 147 | 22 | 1 | 38 | [Doc01-02](Doc01-02.md) |
| 03 | Functional requirements | 595 | 418 | 72 | 5 | 100 | [Doc03](Doc03.md) |
| 04 | API & integration contract | 176 | 107 | 24 | 3 | 42 | [Doc04-05](Doc04-05.md) |
| 05 | Database schema & ERD | 221 | 82 | 56 | 29 | 54 | [Doc04-05](Doc04-05.md) |
| 06 | Knowledge base & content governance | 324 | 215 | 65 | 9 | 35 | [Doc06-07](Doc06-07.md) |
| 07 | UI/UX handoff | 327 | 224 | 63 | 5 | 35 | [Doc06-07](Doc06-07.md) |
| 08 | Technical architecture & deployment | 294 | 135 | 79 | 7 | 73 | [Doc08-09](Doc08-09.md) |
| 09 | Customer workflows | 315 | 223 | 33 | 0 | 59 | [Doc08-09](Doc08-09.md) |
| 10 | Support & human escalation | 255 | 130 | 45 | 5 | 75 | [Doc10-11](Doc10-11.md) |
| 11 | Authentication & verification | 219 | 74 | 3 | 0 | 142 | [Doc10-11](Doc10-11.md) |
| 12 | Prompt engineering & guardrails | 295 | 156 | 99 | 4 | 36 | [Doc12-14](Doc12-14.md) |
| 13 | RBAC, RAG, privacy & evaluation | 352 | 170 | 98 | 23 | 61 | [Doc12-14](Doc12-14.md) |
| 14 | Claude service, keys & budget | 271 | 124 | 80 | 22 | 45 | [Doc12-14](Doc12-14.md) |
| **Total** | | **4,174** | **2,438** | **775** | **113** | **848** | |

## Fix pass after the baseline (by root cause)

**Database (Doc05, Doc04)**
- Versioned forward-only migrations (v1–v3), `npm run linko:migrate`, optional `LINKO_DB_AUTO_MIGRATE=false`.
- New tables populated by the chat: `availability_enquiry`, `address_candidate`, `service_qualification` (encrypted, short TTL, same-enquiry trigger — T-12), `switch_guidance_ref`, `answer_citation`; `privacy_preference` on every session; `chat_slot` for the safety flag with purge on intent change (T-38); `tool_invocation` from PUB-03/04/08/09/10; `chat_event.screen_ref` filled.
- Data-rights cases (`data_rights_request`) opened from PUB-13 with a case reference; DPO queue at `/staff/privacy` records verification and runs erasure per data class with proof hashes and legal holds (`erasure_job`, T-39–T-42).
- Visitor transcript opt-out (`TRANSCRIPT_OPT_OUT`) deletes stored text and stops further storage.
- Retention fails closed: a missing rule means immediate expiry; production stores no chat text until every rule is DPO-approved (T-54).
- Encryption key ring with key ids for rotation; audit salt required in production; `assistant_config` immutable; audit rows carry a correlation id; durable idempotency survives restarts (T-47).

**Human escalation & consent (Doc10, Doc05 T-30)**
- Summary is previewed first; topics can be unticked; **chat sharing is a separate, unticked consent** (`SHARE_TRANSCRIPT_WITH_AGENT`); "Send nothing" and "Withdraw what I shared" (HS-T056).
- Handoff requests are idempotent (HS-T028), carry a consent reference, and use priorities P0 safety / complaint / **HIGH** (billing, order) / normal.
- Safety and contact-option screens put a case in the staff queue (HS-WF-10-03).
- Staff can read a transcript only when the visitor shared it; DPO needs an open rights case; auditor needs an open incident; QA analyst sees shared chats only.
- Agents can't open cases assigned to others; notes are redacted; complaint cases need a supervisor with step-up and are never auto-deleted; per-agent active-case limit; inbox reason filter; breach alerts (P0 > 15 min, complaints > 1 day), denial / injection counts and p95 latency on the incident page.
- New QA analyst role and quality-sample page.

**Guardrails & AI (Doc12, Doc13, Doc14)**
- Ungrounded answers are replaced by "I can't confirm that…", never shown with an invented source label.
- More blocked claims: SLA / static IP / uptime %, One Touch Switch over-claims, instructions to factory-reset, invented delivery/visit dates, any "N months" term.
- Knowledge text scanned for injected instructions (excluded from the prompt, can't be approved).
- Draft knowledge can never be served in production; kill-switch lookup fails closed; production refuses untagged keys; Claude retries only transient limits by hand and treats spend-limit 429s as hard stops.
- Health details (NHS numbers, conditions/medication stated about a person) are redacted.

**Routing & wording (Doc01, Doc03, Doc09)**
- Deterministic routes for availability, business, price questions, privacy/"are you a bot", payments, short human requests ("human please"), billing disputes (enquiry vs formal complaint), and landline-only faults (telecare question first — CF-06 A1).
- Doc01 exact copy restored where it had drifted (sign-in sentence, "Understand cancellation", WF-12 device question); failed One Touch Switch match flow; published opening hours; "Report a fault" and business page chips; "Privacy and AI" and "Sign in securely" in the menu.
- Retention periods are no longer stated to customers until approved.
- Linko dark mode restored (the outside site edit had removed its CSS variant).

**Operations (Doc02, Doc08, Doc14)**
- CI workflow (`.github/workflows/linko-ci.yml`): lint, types, audit, Linko evaluation, secret scan.
- Encrypted backup with restore check (`npm run linko:backup`).
- Runbook sections: release & rollback, alerts, Anthropic and data-key rotation, RUN-02–04, model register, backups, open decisions.
- OpenAPI 3.1 description of every route: [`docs/linko-openapi.yaml`](../linko-openapi.yaml).
- Evaluation set grown to 75 cases (72 run without the model); all pass.

## Still open (deliberate or needs a decision)

- **Needs an external system:** BT qualification, CRM, live-chat agent desktop, callbacks, MyZoiko customer sign-in, status feed, price catalogue/checkout.
- **Needs a sign-off:** knowledge approval (Product/Legal), retention periods (DPO), DPIA and processing inventory, ADR scheme naming, complaints code page, model register details (region, DPA, key owner).
- **Kept by your earlier choice:** 520×740 desktop panel, Zoiko logo in the header, Doc01 welcome chips/title where the docs conflict.
- **Deferred engineering:** enforcing the content security policy (report-only until tuned on live traffic), CSS-variable design tokens and contrast changes, tablet panel width, full conversation-state renaming, Playwright/axe UI tests, per-adapter supplier circuit breakers, alert webhooks and paging.
