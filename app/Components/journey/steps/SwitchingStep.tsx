"use client";

import { ArrowRight, CalendarDays, Info, Phone } from "lucide-react";
import {
  EXPECT_POINTS,
  INSTALL_OPTIONS,
  NUMBER_OPTIONS,
  ONE_TOUCH_POINTS,
  SWITCH_BENEFITS,
  SWITCH_OPTIONS,
} from "../data/content";
import { useJourney } from "../JourneyProvider";
import { PlanBar, SummaryCard } from "../PackageParts";
import {
  ActionButton,
  Card,
  CardTitle,
  CheckList,
  ChoiceCard,
  TwoColumn,
} from "../ui";

export default function SwitchingStep() {
  const { state, patch, go } = useJourney();

  return (
    <div className="space-y-5">
      <PlanBar />
      <TwoColumn
        main={
          <>
            <Card>
              <CardTitle n={1}>
                Are you switching from another provider?
              </CardTitle>
              <p className="mt-1 text-sm text-[#5b6578]">
                We&apos;ll handle the switch for you with the One Touch Switch
                service, with no loss of service.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_1fr]">
                {SWITCH_OPTIONS.map((opt) => (
                  <ChoiceCard
                    key={opt.id}
                    name="switching"
                    checked={state.switching === opt.id}
                    onChange={() => patch({ switching: opt.id })}
                    title={opt.title}
                    description={opt.text}
                  />
                ))}
                <div className="rounded-xl bg-[#f6f8fc] p-4">
                  <h4 className="text-sm font-bold text-[#0b2a5b]">
                    One Touch Switch
                  </h4>
                  <div className="mt-2">
                    <CheckList items={ONE_TOUCH_POINTS} />
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <CardTitle n={2}>
                Do you want to keep your home phone number?
              </CardTitle>
              <p className="mt-1 text-sm text-[#5b6578]">
                If you have a landline and want to keep your number, we can
                transfer it where it&apos;s eligible.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {NUMBER_OPTIONS.map((opt) => (
                  <ChoiceCard
                    key={opt.id}
                    name="number"
                    checked={state.keepNumber === (opt.id === "keep")}
                    onChange={() => patch({ keepNumber: opt.id === "keep" })}
                    title={opt.title}
                    description={opt.text}
                  >
                    <Phone
                      className="mt-2 h-4 w-4 text-[#5b3fc4]"
                      aria-hidden="true"
                    />
                  </ChoiceCard>
                ))}
              </div>
            </Card>

            <Card>
              <CardTitle n={3}>Choose your installation preference</CardTitle>
              <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_1fr]">
                {INSTALL_OPTIONS.map((opt) => (
                  <ChoiceCard
                    key={opt.id}
                    name="install"
                    checked={state.install === opt.id}
                    onChange={() => patch({ install: opt.id })}
                    title={opt.title}
                    description={opt.text}
                  >
                    <CalendarDays
                      className="mt-2 h-4 w-4 text-[#5b3fc4]"
                      aria-hidden="true"
                    />
                  </ChoiceCard>
                ))}
                <div className="rounded-xl bg-[#f6f8fc] p-4">
                  <h4 className="text-sm font-bold text-[#0b2a5b]">
                    What to expect
                  </h4>
                  <div className="mt-2">
                    <CheckList items={EXPECT_POINTS} />
                  </div>
                </div>
              </div>
            </Card>

            <p className="flex items-start gap-3 rounded-xl border border-[#cfe0fb] bg-[#e8f0fd] p-4 text-sm leading-5 text-[#0b2a5b]">
              <Info
                className="mt-0.5 h-4 w-4 shrink-0 text-[#2a5bd7]"
                aria-hidden="true"
              />
              <span>
                <strong>Good to know:</strong> Most Full Fibre (FTTP) services
                are self-install with our easy setup guide. An engineer visit is
                only required where installation isn&apos;t at your property or
                needed.
              </span>
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <ActionButton variant="outline" onClick={() => go("personalise")}>
                ← Back to Personalise Package
              </ActionButton>
              <ActionButton onClick={() => go("details")}>
                Continue to Review &amp; Pay
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ActionButton>
            </div>
          </>
        }
        aside={
          <>
            <SummaryCard title="Your package" />
            <div className="rounded-xl border border-[#cfe0fb] bg-[#e8f0fd] p-5">
              <h3 className="text-base font-bold text-[#0b2a5b]">
                Why switch to Zoiko Broadband?
              </h3>
              <div className="mt-3">
                <CheckList items={SWITCH_BENEFITS} />
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}
