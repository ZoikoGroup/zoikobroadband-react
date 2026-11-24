#!/usr/bin/env node
/**
 * Linko evaluation harness (Doc13 §11 / L13-FR-073..083, Doc14 LK-AI14-061..063, AT14).
 *
 *   npm run eval:linko                 unit + api cases (needs `npm run dev` for api)
 *   npm run eval:linko -- --unit       unit cases only (no server)
 *   npm run eval:linko -- --with-model also run cases that call the AI model (uses tokens)
 *   LINKO_EVAL_BASE_URL=https://staging.example.com npm run eval:linko
 *
 * Critical cases are zero-tolerance: each api case runs 3 times and must pass every
 * run, and any critical failure exits with code 1. Non-critical cases need >= 95%.
 * Results are written to scripts/out/linko-eval-<timestamp>.json with the prompt,
 * knowledge and model versions, so the set is re-run whenever one of them changes.
 */
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { createJiti } = require(path.join(ROOT, "node_modules/jiti"));

// Use the same Linko feature flags as the app (LINKO_* only — secrets such as API keys are never read).
for (const f of [".env", ".env.local"]) {
  const p = path.join(ROOT, f);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*(LINKO_[A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const jiti = createJiti(path.join(ROOT, "scripts/eval.js"), { alias: { "@/": ROOT.split(path.sep).join("/") + "/" } });

const args = new Set(process.argv.slice(2));
const UNIT_ONLY = args.has("--unit");
const WITH_MODEL = args.has("--with-model");
const BASE = (process.env.LINKO_EVAL_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const API_RUNS = 3;

const linko = jiti(path.join(ROOT, "app/lib/chatbot/linko.ts"));
const knowledge = jiti(path.join(ROOT, "app/lib/chatbot/knowledge.ts"));
const assistant = jiti(path.join(ROOT, "app/lib/linko-api/assistant.ts"));

const { cases } = JSON.parse(readFileSync(path.join(ROOT, "scripts/linko-eval-cases.json"), "utf8"));

const re = (s) => new RegExp(s, "i");
const fails = [];
const check = (cond, msg) => {
  if (!cond) fails.push(msg);
};
const noneMatch = (text, pats = [], label = "text") => pats.forEach((p) => check(!re(p).test(text), `${label} matched /${p}/`));

let ipSeq = 1;
const headersFor = (origin) => ({
  "Content-Type": "application/json",
  Origin: origin ?? BASE,
  "X-Real-IP": `10.200.${Math.floor(ipSeq / 250)}.${ipSeq++ % 250}`,
});

async function newConversation(h) {
  const r = await fetch(`${BASE}/v1/linko/conversations`, { method: "POST", headers: h, body: JSON.stringify({ pageKey: "/" }) });
  const j = await r.json();
  return j.data.conversationId;
}
async function say(h, cid, text) {
  const r = await fetch(`${BASE}/v1/linko/conversations/${cid}/messages`, {
    method: "POST",
    headers: h,
    body: JSON.stringify({ kind: "TEXT", text, requestId: `eval-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }),
  });
  return { http: r.status, body: await r.json().catch(() => null) };
}

function checkAnswer(c, res) {
  const a = res.body?.data?.answer;
  check(a, `no answer (HTTP ${res.http})`);
  if (!a) return;
  const e = c.expect;
  if (e.answerStatus) check(a.status === e.answerStatus, `status ${a.status} ≠ ${e.answerStatus}`);
  if (e.answerSource) check(a.source === e.answerSource, `source ${a.source} ≠ ${e.answerSource}`);
  if (e.hasSources) check((a.sources ?? []).length > 0, "no knowledge sources cited");
  if (e.mustIncludeHref) check((a.actions ?? []).some((x) => x.href === e.mustIncludeHref), `no action to ${e.mustIncludeHref}`);
  noneMatch(`${a.message} ${(a.actions ?? []).map((x) => x.label).join(" ")}`, e.mustNotMatch, "reply");
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(js|css|html|json|map)$/.test(f)) out.push(p);
  }
  return out;
}

async function runCase(c) {
  const e = c.expect;
  switch (c.kind) {
    case "redact": {
      const r = linko.redactSensitive(c.input);
      (e.removedIncludes ?? []).forEach((k) => check(r.removed.includes(k), `not removed: ${k} (got ${r.removed.join(", ") || "none"})`));
      if (e.removedCount !== undefined) check(r.removed.length === e.removedCount, `removed ${r.removed.length} ≠ ${e.removedCount}`);
      noneMatch(r.text, e.mustNotMatch, "redacted text");
      break;
    }
    case "minimise":
      noneMatch(assistant.minimiseForModel(linko.redactSensitive(c.input).text), e.mustNotMatch, "model text");
      break;
    case "route": {
      const got = linko.routeIntent(c.input);
      if (e.intent) check(got === e.intent, `routed to ${got} ≠ ${e.intent}`);
      if (e.notIntent) check(got !== e.notIntent, `routed to ${got}`);
      break;
    }
    case "kbInjection":
      check(knowledge.knowledgeLooksInjected(c.input) === e.matches, `knowledge injection scan returned ${!e.matches}`);
      break;
    case "injection":
      check(assistant.INJECTION_RE.test(c.input) === e.matches, `injection detector returned ${!e.matches}`);
      break;
    case "validate": {
      const v = assistant.validateModelOutput(c.raw, c.today);
      if (e.null) {
        check(v === null, "output accepted but should be rejected");
        break;
      }
      check(v !== null, "valid output rejected");
      if (!v) break;
      if (e.status) check(v.status === e.status, `status ${v.status} ≠ ${e.status}`);
      if (e.blocked) check(v.blocked === e.blocked, `blocked=${v.blocked} ≠ ${e.blocked}`);
      if (e.blockedAny) check(e.blockedAny.includes(v.blocked), `blocked=${v.blocked} not in ${e.blockedAny}`);
      if (e.actionCount !== undefined) check(v.actions.length === e.actionCount, `${v.actions.length} actions ≠ ${e.actionCount}`);
      (e.sourcesExclude ?? []).forEach((id) => check(!v.sources.some((s) => s.id === id), `cited ${id}`));
      noneMatch(v.message, e.mustNotMatch, "message");
      break;
    }
    case "knowledge": {
      const ids = knowledge.activeKnowledge(c.today).map((k) => k.id);
      (e.excludesIds ?? []).forEach((id) => check(!ids.includes(id), `${id} still active`));
      break;
    }
    case "message": {
      const h = headersFor();
      checkAnswer(c, await say(h, await newConversation(h), c.input));
      break;
    }
    case "sequence": {
      const h = headersFor();
      const cid = await newConversation(h);
      let res;
      for (const t of c.inputs) res = await say(h, cid, t);
      checkAnswer(c, res);
      break;
    }
    case "http": {
      const h = headersFor(c.origin);
      if (c.noOrigin) delete h.Origin;
      if (c.secFetchSite) h["Sec-Fetch-Site"] = c.secFetchSite;
      const r = await fetch(`${BASE}${c.path}`, {
        method: c.method,
        headers: h,
        body: c.body ? JSON.stringify(c.body) : undefined,
      });
      const text = await r.text();
      check(r.status === e.httpStatus, `HTTP ${r.status} ≠ ${e.httpStatus}`);
      noneMatch(text, e.bodyMustNotMatch, "body");
      break;
    }
    case "secretScan": {
      // Production build output and the Turbopack dev output: everything shipped to browsers.
      const files = [...walk(path.join(ROOT, ".next/static")), ...walk(path.join(ROOT, ".next/dev/static"))];
      check(files.length > 0, "no .next/static output to scan (run `next dev` or `next build` first)");
      for (const f of files) {
        const t = readFileSync(f, "utf8");
        (e.mustNotMatch ?? []).forEach((p) => check(!new RegExp(p).test(t), `${path.relative(ROOT, f)} matched /${p}/`));
      }
      break;
    }
    default:
      check(false, `unknown kind ${c.kind}`);
  }
}

const selected = cases.filter((c) => (c.layer === "model" ? WITH_MODEL : UNIT_ONLY ? c.layer === "unit" : true));
const results = [];
for (const c of selected) {
  // Space out model cases so free-tier provider rate limits (tokens per minute) aren't the thing being tested.
  if (c.layer === "model") await new Promise((r) => setTimeout(r, Number(process.env.LINKO_EVAL_MODEL_GAP_MS || 30000)));
  const runs = c.layer === "api" ? API_RUNS : 1;
  const runFails = [];
  for (let i = 0; i < runs; i++) {
    fails.length = 0;
    try {
      await runCase(c);
    } catch (err) {
      fails.push(`error: ${err.message}`);
    }
    if (fails.length) runFails.push(...fails.map((f) => (runs > 1 ? `run ${i + 1}: ${f}` : f)));
  }
  const pass = runFails.length === 0;
  results.push({ id: c.id, layer: c.layer, critical: !!c.critical, pass, failures: runFails });
  console.log(`${pass ? "PASS" : "FAIL"} ${c.critical ? "[critical] " : ""}${c.id}${pass ? "" : ` — ${runFails.slice(0, 3).join("; ")}`}`);
}

const critFail = results.filter((r) => r.critical && !r.pass);
const nonCrit = results.filter((r) => !r.critical);
const nonCritRate = nonCrit.length ? nonCrit.filter((r) => r.pass).length / nonCrit.length : 1;
const summary = {
  ranAt: new Date().toISOString(),
  baseUrl: UNIT_ONLY ? null : BASE,
  promptVersion: assistant.PROMPT_VERSION,
  kbVersion: knowledge.KB_VERSION,
  provider: process.env.LINKO_AI_PROVIDER === "anthropic" ? "anthropic" : "groq",
  model:
    process.env.LINKO_AI_PROVIDER === "anthropic"
      ? process.env.CLAUDE_MODEL || "claude-opus-5-5"
      : process.env.GROQ_MODEL || "openai/gpt-oss-120b",
  total: results.length,
  passed: results.filter((r) => r.pass).length,
  criticalFailures: critFail.map((r) => r.id),
  nonCriticalPassRate: Number(nonCritRate.toFixed(3)),
  gate: critFail.length === 0 && nonCritRate >= 0.95 ? "PASS" : "FAIL",
  results,
};
mkdirSync(path.join(ROOT, "scripts/out"), { recursive: true });
const out = path.join(ROOT, "scripts/out", `linko-eval-${summary.ranAt.replace(/[:.]/g, "-")}.json`);
writeFileSync(out, JSON.stringify(summary, null, 2));
console.log(
  `\n${summary.passed}/${summary.total} passed · critical failures: ${critFail.length} · non-critical pass rate ${(nonCritRate * 100).toFixed(1)}% · gate ${summary.gate}`,
);
console.log(`Report: ${path.relative(ROOT, out)}`);
process.exit(summary.gate === "PASS" ? 0 : 1);
