"use client";

import Image from "next/image";
import { ArrowRight, Check, Phone, ShieldCheck } from "lucide-react";
import { EXTRAS, ROUTERS, SUMMARY_BENEFITS } from "../data/content";
import { money } from "../lib/format";
import { useJourney } from "../JourneyProvider";
import { PlanBar, SummaryCard } from "../PackageParts";
import {
  ActionButton,
  Card,
  CardTitle,
  ChoiceCard,
  CheckList,
  TwoColumn,
} from "../ui";

const EXTRA_ICONS = {
  "digital-line": Phone,
  "home-protect": ShieldCheck,
} as const;

export default function PersonaliseStep() {
  const { state, patch, go } = useJourney();

  const toggleExtra = (id: string) =>
    patch({
      extraIds: state.extraIds.includes(id)
        ? state.extraIds.filter((x) => x !== id)
        : [...state.extraIds, id],
    });

  return (
    <div className="space-y-5">
      <PlanBar />
      <TwoColumn
        main={
          <>
            <Card>
              <CardTitle n={1}>Choose your router</CardTitle>
              <p className="mt-1 text-sm text-[#5b6578]">
                A high-performance router is included with your plan. You can
                upgrade if you need more coverage.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {ROUTERS.map((router, i) => (
                  <ChoiceCard
                    key={router.id}
                    name="router"
                    checked={state.routerId === router.id}
                    onChange={() => patch({ routerId: router.id })}
                    title={router.name}
                    badge={
                      <span className="rounded-full bg-[#fbb82b] px-2 py-0.5 text-sm font-bold text-[#0b2a5b]">
                        {router.price ? `+${money(router.price)}` : "Included"}
                      </span>
                    }
                  >
                    <span className="relative mt-3 block h-[90px] w-full">
                      <Image
                        src={router.src}
                        alt={router.name}
                        fill
                        sizes="200px"
                        className="object-contain"
                        priority={i === 0}
                      />
                    </span>
                    <span className="mt-3 block">
                      <CheckList items={router.features} />
                    </span>
                  </ChoiceCard>
                ))}
              </div>
            </Card>

            <Card>
              <CardTitle n={2}>
                Add optional services{" "}
                <span className="text-sm font-normal text-[#2a5bd7]">
                  (see if you need them)
                </span>
              </CardTitle>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {EXTRAS.map((extra) => {
                  const Icon = EXTRA_ICONS[extra.id];
                  return (
                    <ChoiceCard
                      key={extra.id}
                      type="checkbox"
                      checked={state.extraIds.includes(extra.id)}
                      onChange={() => toggleExtra(extra.id)}
                      title={extra.name}
                      description={extra.text}
                      badge={
                        <span className="text-sm font-bold text-[#0b2a5b]">
                          +{money(extra.price)} / month
                        </span>
                      }
                    >
                      <Icon
                        className="mt-2 h-5 w-5 text-[#5b3fc4]"
                        aria-hidden="true"
                      />
                    </ChoiceCard>
                  );
                })}
              </div>
            </Card>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <ActionButton variant="outline" onClick={() => go("plans")}>
                ← Back to Compare Plans
              </ActionButton>
              <ActionButton onClick={() => go("switching")}>
                Continue to Switching &amp; Installation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ActionButton>
            </div>
          </>
        }
        aside={
          <>
            <SummaryCard title="Your package summary" />
            <div className="rounded-xl border border-[#cfe0fb] bg-[#e8f0fd] p-5">
              <h3 className="text-base font-bold text-[#0b2a5b]">
                What you get with Zoiko Broadband
              </h3>
              <div className="mt-3">
                <CheckList items={SUMMARY_BENEFITS} />
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}
