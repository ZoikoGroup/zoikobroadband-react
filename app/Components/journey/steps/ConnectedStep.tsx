"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, CircleCheck, Gauge, Headphones, Wifi } from "lucide-react";
import {
  CONNECTED_JOURNEY,
  MANAGE_POINTS,
  MORE_LINKS,
  SETUP_STEPS,
} from "../data/content";
import { addDays, fmtDate } from "../lib/format";
import { useJourney } from "../JourneyProvider";
import { ActionButton, Card, CheckList } from "../ui";

export default function ConnectedStep() {
  const { state, go } = useJourney();
  const plan = state.plan;
  const when = fmtDate(
    addDays(state.order?.createdAt ?? new Date().toISOString(), 9),
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#b7e4c7] bg-[#eaf7ee] p-5">
        <div className="flex items-center gap-4">
          <CircleCheck
            className="h-10 w-10 fill-[#1f9d55] text-white"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-xl font-bold text-[#0b2a5b]">
              You&apos;re now connected!
            </h2>
            <p className="text-sm text-[#5b6578]">
              Your Zoiko Broadband service is live and ready to use.
            </p>
          </div>
        </div>
        <dl className="flex flex-wrap gap-6 text-sm">
          <div>
            <dt className="text-[#5b6578]">Service status</dt>
            <dd className="font-bold text-[#1f9d55]">Active</dd>
          </div>
          <div>
            <dt className="text-[#5b6578]">Connected on</dt>
            <dd className="font-bold text-[#0b2a5b]">{when}</dd>
          </div>
          <div>
            <dt className="text-[#5b6578]">Plan</dt>
            <dd className="font-bold text-[#0b2a5b]">{plan?.name}</dd>
          </div>
        </dl>
        <ActionButton variant="dark" onClick={() => go("myzoiko")}>
          Manage my service →
        </ActionButton>
      </div>

      <Card>
        <h3 className="flex items-center gap-2 text-base font-bold text-[#0b2a5b]">
          <Wifi className="h-5 w-5 text-[#2a5bd7]" aria-hidden="true" />
          Your installation journey
        </h3>
        <div className="mt-5 grid items-center gap-5 lg:grid-cols-[1fr_200px]">
          <ol className="grid gap-4 sm:grid-cols-4">
            {CONNECTED_JOURNEY.map((s) => (
              <li key={s.id} className="flex flex-col items-center text-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f9d55] text-white">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-2 text-sm font-bold text-[#0b2a5b]">
                  {s.title}
                </p>
                <p className="text-sm text-[#5b6578]">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-xl bg-[#eaf7ee] p-4 text-center">
            <p className="text-base font-bold text-[#0b2a5b]">All set!</p>
            <p className="text-sm text-[#5b6578]">
              Your broadband is up and running.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr_0.7fr]">
        <Card>
          <h3 className="text-base font-bold text-[#0b2a5b]">
            Set up your home broadband
          </h3>
          <ol className="mt-4 space-y-4">
            {SETUP_STEPS.map((s, i) => (
              <li key={s.id} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ece6fb] text-sm font-bold text-[#5b3fc4]">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#0b2a5b]">
                    {s.title}
                  </span>
                  <span className="block text-sm text-[#5b6578]">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-3">
            <ActionButton variant="outline" href="/faqs">
              Watch the setup video
            </ActionButton>
            <ActionButton variant="outline" href="/faqs">
              Download setup guide (PDF)
            </ActionButton>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-bold text-[#0b2a5b]">
            Manage your service in MyZoiko
          </h3>
          <div className="mt-4 grid items-center gap-4 sm:grid-cols-2">
            <div className="relative h-[130px]">
              <Image
                src="/Images/flow/app-preview.png"
                alt="MyZoiko app on a laptop and phone"
                fill
                sizes="220px"
                className="object-contain"
              />
            </div>
            <CheckList items={MANAGE_POINTS} />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-lg bg-[#0b2a5b] px-4 py-2 text-sm font-bold text-white"
            >
              App Store
            </Link>
            <Link
              href="/"
              className="rounded-lg bg-[#0b2a5b] px-4 py-2 text-sm font-bold text-white"
            >
              Google Play
            </Link>
          </div>
        </Card>

        <div className="space-y-5">
          <div className="rounded-xl bg-[#ece6fb] p-5">
            <h3 className="flex items-center gap-2 text-base font-bold text-[#0b2a5b]">
              <Gauge className="h-5 w-5 text-[#5b3fc4]" aria-hidden="true" />
              Check your speed
            </h3>
            <p className="mt-2 text-sm text-[#5b6578]">
              Make sure you&apos;re getting the speeds you&apos;re paying for.
            </p>
            <ActionButton
              variant="outline"
              href="/bt-broadband"
              className="mt-3 w-full"
            >
              Run a speed test →
            </ActionButton>
          </div>
          <Card>
            <h3 className="flex items-center gap-2 text-base font-bold text-[#0b2a5b]">
              <Headphones
                className="h-5 w-5 text-[#5b3fc4]"
                aria-hidden="true"
              />
              Need help?
            </h3>
            <p className="mt-2 text-sm text-[#5b6578]">
              Our UK support team is here for you 7 days a week.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <ActionButton variant="outline" href="/contact">
                Live chat
              </ActionButton>
              <ActionButton variant="outline" href="tel:08003214321">
                Call 0800 321 4321
              </ActionButton>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl bg-[#e8f0fd] p-4">
        <p className="text-base font-bold text-[#0b2a5b]">
          Make more of your broadband
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {MORE_LINKS.map((l) => (
            <li key={l.id}>
              <Link
                href={l.href}
                className="text-sm font-semibold text-[#2a5bd7]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
