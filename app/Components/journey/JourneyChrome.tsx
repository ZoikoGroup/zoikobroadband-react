import Link from "next/link";
import {
  Check,
  Headphones,
  Lock,
  MessageSquare,
  Phone,
  type LucideIcon,
} from "lucide-react";
import {
  HELP_ITEMS,
  JOURNEY_STAGES,
  STAGE_INDEX,
  STEPPER_INDEX,
  STEPPER_LABELS,
} from "./data/content";
import type { StepId } from "./types";

export function JourneyBar({ step }: { step: StepId }) {
  const current = STAGE_INDEX[step];
  if (current === undefined) return null;
  return (
    <nav
      aria-label="Your broadband journey"
      className="bg-[#08224d] text-white"
    >
      <div className="mx-auto flex max-w-[1300px] flex-wrap items-center gap-x-5 gap-y-2 px-6 py-3 sm:px-8 lg:px-10">
        <p className="text-sm font-bold">Your Broadband Journey</p>
        <ol className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {JOURNEY_STAGES.map((label, i) => {
            const done = i < current;
            const active = i === current;
            return (
              <li
                key={label}
                className={`flex items-center gap-2 text-sm ${
                  active ? "font-bold text-[#fbb82b]" : "text-white/75"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold ${
                    active
                      ? "bg-[#fbb82b] text-[#0b2a5b]"
                      : done
                        ? "bg-[#1f9d55] text-white"
                        : "bg-white/15"
                  }`}
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    i + 1
                  )}
                </span>
                {label}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

export function Stepper({ step }: { step: StepId }) {
  const current = STEPPER_INDEX[step];
  if (current === undefined) return null;
  return (
    <ol className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
      {STEPPER_LABELS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li
            key={label}
            className={`flex items-center gap-2 text-sm ${
              active ? "font-bold text-[#0b2a5b]" : "text-[#5b6578]"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold ${
                active
                  ? "bg-[#fbb82b] text-[#0b2a5b]"
                  : done
                    ? "bg-[#1f9d55] text-white"
                    : "border border-[#cfd6e2] bg-white"
              }`}
            >
              {done ? (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                i + 1
              )}
            </span>
            {label}
          </li>
        );
      })}
    </ol>
  );
}

const HELP_ICONS: Record<(typeof HELP_ITEMS)[number]["icon"], LucideIcon> = {
  headphones: Headphones,
  phone: Phone,
  chat: MessageSquare,
  lock: Lock,
};

export function HelpStrip() {
  return (
    <footer className="bg-[#0b2a5b] text-white">
      <ul className="mx-auto grid max-w-[1300px] gap-4 px-6 py-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
        {HELP_ITEMS.map((item) => {
          const Icon = HELP_ICONS[item.icon];
          return (
            <li key={item.id}>
              <Link href="/contact" className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold">{item.label}</span>
                  <span className="block text-sm text-white/75">
                    {item.text}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
