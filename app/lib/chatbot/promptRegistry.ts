/**
 * Change-controlled prompt registry (Doc02 §11.2, Doc14 AT14-015 "prompt signature mismatch blocks").
 *
 * Each approved prompt version is pinned to the fingerprint of its template (the prompt without the
 * knowledge text — knowledge has its own approval in the staff console). In production the model is
 * only called when the running template matches the registered fingerprint for PROMPT_VERSION; any
 * unreviewed edit to the prompt therefore turns AI answers off (guided help keeps working) until the
 * new version is reviewed and added here.
 *
 * To register a change: bump PROMPT_VERSION in app/lib/linko-api/assistant.ts, run
 * `npm run eval:linko` (it prints the current fingerprint), get the change reviewed, then add the pair below.
 */
export const APPROVED_PROMPTS: Record<string, { hash: string; approvedOn: string; ref: string }> = {
  "linko-prompt-2026-11-23": { hash: "bb3398af", approvedOn: "2026-11-25", ref: "PR #98 (Madhu branch)" },
};

export type PromptCheck = { registered: boolean; expected: string | null; actual: string };

export function checkPrompt(version: string, actualHash: string): PromptCheck {
  const entry = APPROVED_PROMPTS[version];
  return { registered: Boolean(entry && entry.hash === actualHash), expected: entry?.hash ?? null, actual: actualHash };
}
