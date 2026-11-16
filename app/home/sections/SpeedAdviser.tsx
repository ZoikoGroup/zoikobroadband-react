"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import { Container, Eyebrow } from "./ui";

/*
 * Same data source and recommendation logic as the previous home "Find your plan"
 * (previous FindYourPlan component, see git history): GET /api/v1/plans/, household + activity
 * score → required speed → first active plan at or above that speed.
 */

interface Plan {
  id: number;
  name: string;
  slug: string;
  bt_plan_name: string;
  is_active: boolean;
  category: { id: number; name: string; slug: string };
  variations: { id: number; duration_value: number; price: string; is_active: boolean }[];
  downloadSpeed?: number;
  uploadSpeed?: number;
}
interface PlansResponse {
  count: number;
  results: Plan[];
}

function parsePlanSpeed(btPlanName: string) {
  const match = btPlanName.match(/(\d+(?:\.\d+)?)_(\d+(?:\.\d+)?)M/i);
  if (!match) return { downloadSpeed: 0, uploadSpeed: 0 };
  return { downloadSpeed: Number(match[1]), uploadSpeed: Number(match[2]) };
}

const HOUSEHOLD_SCORE: Record<string, number> = { "1-2": 1, "3-4": 2, "5+": 3, skip: 1 };
const ACTIVITY_SCORE: Record<string, number> = { basic: 0, streaming: 1, gaming: 2, work: 1, devices: 1 };
const SCORE_TO_SPEED = [
  { maxScore: 1, speed: 40 },
  { maxScore: 2, speed: 80 },
  { maxScore: 3, speed: 115 },
  { maxScore: 4, speed: 160 },
  { maxScore: 5, speed: 220 },
  { maxScore: 6, speed: 330 },
  { maxScore: Infinity, speed: 550 },
];

const PEOPLE = [
  { id: "1-2", label: "1–2" },
  { id: "3-4", label: "3–4" },
  { id: "5+", label: "5+" },
  { id: "skip", label: "Skip", muted: true },
];
const USES = [
  { id: "basic", label: "Browsing", text: "everyday browsing" },
  { id: "streaming", label: "Streaming", text: "HD & 4K streaming" },
  { id: "work", label: "Home working", text: "working from home" },
  { id: "gaming", label: "Gaming", text: "online gaming" },
  { id: "devices", label: "Multiple high-use devices", text: "lots of connected devices" },
];
const PREFS = [
  { id: "cost", label: "Lowest monthly cost" },
  { id: "headroom", label: "More speed headroom" },
];

function Chip({ active, muted, onClick, children }: { active: boolean; muted?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-lg border px-5 py-3 text-sm font-semibold shadow-sm transition-colors sm:text-base ${
        active
          ? "border-[#0B2F5B] bg-[#0B2F5B] text-white"
          : `border-slate-300 bg-white hover:border-[#0B2F5B] dark:border-gray-700 dark:bg-gray-900 ${muted ? "text-slate-500" : "text-[#0B2F5B] dark:text-white"}`
      }`}
    >
      {children}
    </button>
  );
}

function Step({ n, title, hint }: { n: number; title: string; hint?: string }) {
  return (
    <p className="flex flex-wrap items-center gap-3 font-bold text-[#0B2F5B] dark:text-white">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0B2F5B] text-sm text-white dark:bg-[#1d4f8a]">{n}</span>
      {title}
      {hint && <span className="text-sm font-medium text-slate-500">{hint}</span>}
    </p>
  );
}

export default function SpeedAdviser() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [household, setHousehold] = useState<string | null>(null);
  const [activities, setActivities] = useState<string[]>([]);
  const [pref, setPref] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/plans/`);
        if (!response.ok) throw new Error("Failed to fetch plans");
        const data: PlansResponse = await response.json();
        const enhanced = data.results
          .map((plan) => ({ ...plan, ...parsePlanSpeed(plan.bt_plan_name) }))
          .sort((a, b) => a.downloadSpeed! - b.downloadSpeed!);
        setPlans(enhanced);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const requiredSpeed = (() => {
    if (!household) return null;
    let score = HOUSEHOLD_SCORE[household];
    activities.forEach((a) => (score += ACTIVITY_SCORE[a] ?? 0));
    return SCORE_TO_SPEED.find((s) => score <= s.maxScore)?.speed ?? 40;
  })();

  const recommended = (() => {
    if (!requiredSpeed) return null;
    const active = plans.filter((p) => p.is_active);
    const idx = active.findIndex((p) => (p.downloadSpeed ?? 0) >= requiredSpeed);
    if (idx === -1) return null;
    // "More speed headroom" steps up to the next faster plan where one exists.
    if (pref === "headroom" && idx + 1 < active.length) return active[idx + 1];
    return active[idx];
  })();

  const description = (() => {
    const msgs = USES.filter((u) => activities.includes(u.id)).map((u) => u.text);
    if (!msgs.length) return "Perfect for your selected household size.";
    return `Ideal for ${msgs.join(", ")}${msgs.length > 1 ? " and multiple connected devices." : "."}`;
  })();

  const reset = () => setSubmitted(false);

  return (
    <section aria-labelledby="speed-heading" className="bg-white py-16 dark:bg-gray-950 sm:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-14">
          <div className="relative">
            <div className="relative aspect-[520/605] overflow-hidden rounded-3xl">
              <Image
                src="/Images/home/speed-adviser-home-working.webp"
                alt="A woman working on a laptop in a busy shared office"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-5 bottom-5 flex items-start gap-3 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur dark:bg-gray-900/95">
              <Lightbulb aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#B8862B]" />
              <p>
                <span className="block font-bold text-[#0B2F5B] dark:text-white">Not sure what you need?</span>
                <span className="text-sm text-slate-600 dark:text-slate-300">Answer three quick questions.</span>
              </p>
            </div>
          </div>

          <div>
            <Eyebrow>Speed Adviser</Eyebrow>
            <h2 id="speed-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B2F5B] dark:text-white sm:text-4xl lg:text-[44px]">
              Find the right speed for your home
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Tell us how you use broadband and we will suggest a package type. This is a suggestion, not a guarantee, and it does not replace
              checking your address.
            </p>

            <div className="mt-7 space-y-6">
              <fieldset>
                <legend className="w-full">
                  <Step n={1} title="How many people regularly use broadband?" />
                </legend>
                <div className="mt-4 flex flex-wrap gap-3">
                  {PEOPLE.map((p) => (
                    <Chip key={p.id} active={household === p.id} muted={p.muted} onClick={() => { setHousehold(p.id); reset(); }}>
                      {p.label}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="w-full">
                  <Step n={2} title="What will you mainly use it for?" hint="Choose any that apply" />
                </legend>
                <div className="mt-4 flex flex-wrap gap-3">
                  {USES.map((u) => (
                    <Chip
                      key={u.id}
                      active={activities.includes(u.id)}
                      onClick={() => {
                        setActivities((prev) => (prev.includes(u.id) ? prev.filter((x) => x !== u.id) : [...prev, u.id]));
                        reset();
                      }}
                    >
                      {u.label}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="w-full">
                  <Step n={3} title="Would you prefer lowest monthly cost or more speed headroom?" />
                </legend>
                <div className="mt-4 flex flex-wrap gap-3">
                  {PREFS.map((p) => (
                    <Chip key={p.id} active={pref === p.id} onClick={() => { setPref(p.id); reset(); }}>
                      {p.label}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#F7BE2E] px-6 py-3 font-bold text-[#0B2F5B] transition-colors hover:bg-[#F2B015]"
              >
                <Sparkles aria-hidden className="h-4 w-4" />
                Find My Plan
              </button>

              <div aria-live="polite">
                {submitted && (
                  <div className="rounded-2xl border border-[#F7BE2E] bg-[#FFF8E6] p-5 dark:bg-gray-900">
                    {!household ? (
                      <p className="text-slate-700 dark:text-slate-300">Choose how many people use broadband (or Skip) to get a recommendation.</p>
                    ) : loading ? (
                      <p className="text-slate-700 dark:text-slate-300">Loading plans…</p>
                    ) : recommended ? (
                      <>
                        <p className="text-sm font-semibold uppercase tracking-wider text-[#B8862B]">Recommended</p>
                        <p className="mt-1 text-xl font-bold text-[#0B2F5B] dark:text-white">{recommended.name}</p>
                        <p className="mt-1 font-semibold text-[#0B2F5B] dark:text-slate-200">
                          {recommended.downloadSpeed} Mbps download · {recommended.uploadSpeed} Mbps upload
                        </p>
                        <p className="mt-2 text-slate-700 dark:text-slate-300">{description}</p>
                      </>
                    ) : (
                      <p className="text-slate-700 dark:text-slate-300">We couldn’t match a plan right now. Check your address to see what is available.</p>
                    )}
                    <Link
                      href="#check-postcode"
                      className="mt-3 inline-flex items-center gap-2 font-bold text-[#0B2F5B] underline underline-offset-4 dark:text-white"
                    >
                      Check Availability
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
