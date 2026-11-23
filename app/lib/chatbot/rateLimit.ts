/**
 * Simple in-memory rate limiter: max N chat requests per IP per window.
 * Good enough for a single server. If you run several instances
 * (e.g. serverless), move this to Redis/Upstash.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 15;

const gr = globalThis as unknown as { __linkoRate?: Map<string, number[]> };
gr.__linkoRate ??= new Map();
const hits = gr.__linkoRate;

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  // Occasionally drop stale entries so the map doesn't grow forever.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return true;
}
