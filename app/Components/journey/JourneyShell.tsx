"use client";

import Hero from "./Hero";
import { HelpStrip, JourneyBar, Stepper } from "./JourneyChrome";
import { useJourney } from "./JourneyProvider";
import { STEP_COMPONENTS } from "./steps/registry";

export default function JourneyShell() {
  const { state } = useJourney();
  const Step = STEP_COMPONENTS[state.step];
  const isJourney = state.step !== "myzoiko" && state.step !== "moving";

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Hero step={state.step} />
      <JourneyBar step={state.step} />
      <main className="mx-auto max-w-[1300px] px-6 py-8 sm:px-8 lg:px-10">
        <Stepper step={state.step} />
        <Step />
      </main>
      {isJourney && <HelpStrip />}
    </div>
  );
}
