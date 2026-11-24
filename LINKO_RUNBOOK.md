# Linko operations runbook

How to run, check and protect the Linko chatbot. Configuration names are listed in `.env.example`.

## Keys and environments (Doc14 PLAT-03/05, LK-AI14-011)

- Use a **separate Groq API key** for development and for production. Keys live only in server environment variables (`GROQ_API_KEY`); they are never prefixed with `NEXT_PUBLIC_` and never reach the browser.
- The AI is off unless `LINKO_AI_ENABLED=true`. With it off, Linko still runs every guided step (safety, complaints, handoff, address checks) and shows a "can't check that just now" message for free-text questions.
- Draft knowledge is only used when `LINKO_ALLOW_DRAFT_KB=true`. Leave this off in production until Product/Legal set `approvedBy` / `approvedAt` on each item in `app/lib/chatbot/knowledge.ts`.

## Rotating the key

1. Create a new key in the Groq console.
2. Set it as `GROQ_API_KEY` in the deployment environment.
3. Redeploy.
4. Smoke-test: `GET /v1/linko/health` with the `x-linko-health-token` header should show `"aiEnabled": true` and `"latched": null`, then ask Linko one question.
5. Revoke the old key in the Groq console.

## If a key is exposed (RUN-01)

1. Turn the AI off: set `LINKO_AI_ENABLED=false` and redeploy (guided steps keep working).
2. Revoke the key in the Groq console immediately.
3. Check provider usage for unexpected calls and note the time window.
4. Create a new key and follow "Rotating the key".
5. Record the incident and remove the key from wherever it leaked (commit history, logs, tickets).

## Automatic protections

- **Auth or spend-cap errors** (401, 403, 402, or a quota/billing error) latch the provider off until the server restarts, and log `linko_provider_auth_failure` (severity critical). Fix the cause, then restart.
- **Provider rate limits** open a circuit breaker for the provider's retry-after time (30s default, 300s max).
- **Budgets**: daily (`LINKO_DAILY_TOKEN_BUDGET`) and monthly (`LINKO_MONTHLY_TOKEN_BUDGET`) token caps. Each call reserves its worst case first, so concurrent requests can't overspend. `linko_budget_warning` is logged at 80% of the daily budget.
- **Health**: `GET /v1/linko/health` returns only `{status, checkedAt}` publicly; detail needs `x-linko-health-token` = `LINKO_HEALTH_TOKEN`.

## AI provider (Doc14)

- `LINKO_AI_PROVIDER=groq` (default) or `anthropic`. Claude uses `ANTHROPIC_API_KEY` and `CLAUDE_MODEL` (default `claude-opus-5-5`), which must be in `CLAUDE_MODEL_ALLOWLIST`.
- There is no automatic fallback between providers or models; switching is a reviewed config change followed by `npm run eval:linko -- --with-model`.
- Claude requests: input counted first with `count_tokens`, JSON enforced with structured outputs, low effort, prompt caching off until assessed.

## Database (Doc05)

- SQLite file at `LINKO_DB_PATH` (default `.data/linko.db`). Back it up with the server stopped, or with `sqlite3 .data/linko.db ".backup backup.db"`.
- Chat text and staff notes are stored only as AES-256-GCM ciphertext using `LINKO_DATA_KEY`. Keep that key in the secret store, never in the repo. Losing it makes stored text unreadable (by design).
- Retention rules live in the `retention_rule` table and are applied at most once a minute. The seeded values are proposals until the DPO approves them (`approved_by_ref`).
- `audit_event` is append-only (database triggers) and hash-chained; the staff Audit page verifies the chain.

## Staff console (Doc10 / Doc13)

- URL: `/staff`. Roles: Support agent, Support supervisor, Privacy/DPO analyst, Knowledge publisher, Security auditor, Platform admin.
- Create the first admin (password is read from the environment, never the command line):

```
LINKO_STAFF_PASSWORD='<temporary password>' npm run linko:staff -- --email admin@example.com --role PLATFORM_ADMIN --name "Ops admin"
```

- Sensitive actions need step-up (re-enter the password): turning the AI off, approving knowledge, admin changes, evidence-only audit or transcript access.
- "Activate fallback" (Incident page) turns AI answers off for a set time; another person must review it.
- Knowledge approval needs a different publisher from the one who submitted it, and applies to the exact text version.

## Logs (no message text is ever logged)

- `linko_turn` — one per chat turn: intent, source, status, redaction kinds, knowledge evidence refs.
- `linko_model_call` — model, tokens, latency, outcome, provider request id, optional cost estimate.
- `linko_injection_suspected`, `linko_budget_refused`, `linko_model_rate_limited`, `linko_model_error`.

## Evaluation (Doc13 §11, Doc14 AT14)

```
npm run eval:linko -- --unit        # no server needed
npm run eval:linko                  # also API cases; start `npm run dev` first
npm run eval:linko -- --with-model  # also cases that call the AI (uses tokens)
```

Critical cases are zero-tolerance (each API case runs 3 times). Re-run whenever the prompt version, knowledge version or model changes; reports are written to `scripts/out/`.

## Release and rollback (Doc02 OPS-05, Doc08 §10)

1. Run `npm run eval:linko` (and `-- --with-model` when the prompt, knowledge or model changed). The gate must say PASS.
2. Run `npm run linko:backup`, then `npm run linko:migrate`, then deploy.
3. Smoke-test: `GET /v1/linko/health` (with the health token) shows `OK`; ask Linko one question; open `/staff`.
4. **Rollback:** set `LINKO_AI_ENABLED=false` (guided help keeps working), redeploy the previous release tag, check health, re-run `npm run eval:linko`. Migrations are forward-only and additive, so the previous release still runs on the newer schema; restore a backup only if data is damaged.
5. Record the release (tag, prompt/knowledge/model versions, eval report file) and any rollback drill in your change log.

## Alerts to configure (Doc02 OPS-04, Doc03 §15.1, Doc08 H-02)

Alert on these log events (all JSON, no message text):

| Event | Severity | Action |
|---|---|---|
| `linko_provider_auth_failure` | Critical | Key revoked/expired or spend cap — follow "If a key is exposed" or top up, then restart |
| `linko_budget_warning` | High | Daily budget at 80% — review traffic; raise the budget only with approval |
| `linko_model_error` (rate > 5/min) | High | Provider outage — consider "Activate fallback" on the Incident page |
| `linko_injection_suspected` (spike) | Medium | Possible attack — review the audit log |
| `linko_db_write_failed` | High | Database unavailable — chat keeps working but nothing is recorded |
| Breach alerts on `/staff/incident` | High | Safety cases waiting over 15 minutes, complaints over a day |

## Anthropic (Claude) keys (Doc14 RUN-01, PLAT-03)

- Use a workspace-scoped key per environment and set `ANTHROPIC_KEY_ENVIRONMENT` to match `LINKO_ENVIRONMENT` (production refuses an untagged key).
- Rotation: create the new key in the Claude Console → set `ANTHROPIC_API_KEY` → redeploy → smoke-test → revoke the old key.
- Compromise: set `LINKO_AI_ENABLED=false`, revoke the key in the Claude Console, review usage for the exposure window, rotate, re-enable, write the incident note.
- Data key (`LINKO_DATA_KEY`) rotation: add the new key to `LINKO_DATA_KEYS` as `k2:<base64>`, keep the old one as `k1:<base64>`, set `LINKO_DATA_KEY_ID=k2`. New data uses k2; existing rows still decrypt with k1. Remove k1 only after the old rows have expired.

## Provider incidents (Doc14 RUN-02 to RUN-04)

- **Spend cap reached (RUN-02):** the provider latch stops further calls automatically. Confirm in the provider console, decide whether to raise the cap (needs approval), then restart the app.
- **Provider outage (RUN-03):** the circuit breaker opens after repeated failures; guided steps, safety routes and human contact keep working. Use "Activate fallback" for longer outages.
- **Model withdrawn or behaving badly (RUN-04):** set `LINKO_AI_ENABLED=false`, pick a tested model from the allowlist, run `npm run eval:linko -- --with-model`, then re-enable.

## Model register (Doc03 §11.3, Doc14 PLAT-06)

| Provider | Model | Allowlist var | Notes |
|---|---|---|---|
| Groq (default) | `openai/gpt-oss-120b` | `GROQ_MODEL_ALLOWLIST` | JSON mode; free tier ≈ 8,000 tokens/minute |
| Anthropic | `claude-opus-5-5` | `CLAUDE_MODEL_ALLOWLIST` | Structured outputs, count_tokens preflight, caching off |

Region, data-processing agreement and key owner must be recorded here by the service owner before go-live.

## Backups (Doc08 §07.1)

`LINKO_BACKUP_KEY=<base64 32 bytes> npm run linko:backup` writes an encrypted snapshot to `.data/backups` and proves it restores. Restore with `npm run linko:backup -- --restore <file> <new .db path>`, stop the app, point `LINKO_DB_PATH` at it and start again.

## Open decisions recorded in code (Doc01 §8, Doc13 D13-xx, Doc14 D14-xx)

- Retention periods: proposals in `retention_rule` until the DPO approves; production stores no chat text until then.
- Staff session timeouts and lockout values (D13-17/18): defaults in `.env.example`.
- Staff sign-in uses Linko-managed passwords until corporate SSO is available (exception to Doc05 §01).
- Content Security Policy runs report-only until it has been tuned against live traffic (Stripe, tawk.to, analytics).
- Knowledge items are draft until Product/Legal approve them in `/staff/knowledge`.
