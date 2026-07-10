import type { ReactNode } from "react";

/**
 * Zoiko Broadband — Router setup, Wi-Fi & troubleshooting
 * Single-file, drop-in support/setup guide page.
 * Static content (anchor navigation only) — no client-side state required.
 */

// ---- Brand tokens (inline) -------------------------------------------------
const brand = {
  navy: "#0f3a5c", // headings, number circles
  navyDeep: "#0b2b45", // hero / CTA gradient end
  navyMid: "#134d78", // hero / CTA gradient start
  amber: "#f5c451", // accent dot, callout icon, primary CTA
  ink: "#334155", // body text
  inkMuted: "#64748b", // secondary text
  surface: "#f4f7fb", // card / row surface
  border: "#e2e8f0",
} as const;

// ---- Page data -------------------------------------------------------------
const tocItems = [
  { id: "box", label: "What's in the box" },
  { id: "connect", label: "Connecting your router" },
  { id: "wifi", label: "Connecting to Wi-Fi" },
  { id: "lights", label: "Understanding the lights" },
  { id: "troubleshooting", label: "Quick troubleshooting" },
  { id: "help", label: "Getting more help" },
];

const boxContents = [
  "Your Zoiko router",
  "Power adaptor",
  "1 × Ethernet (network) cable",
  "1 × broadband/phone cable (Standard Fibre / FTTC only)",
  "Quick start card",
];

const lightRows: { color: string; label: string; meaning: string }[] = [
  { color: "#16a34a", label: "Solid white/green", meaning: "Everything is working normally" },
  { color: "#cbd5e1", label: "Flashing white", meaning: "Starting up — please wait" },
  { color: "#dc2626", label: "Solid red", meaning: "No connection detected — check your cables" },
  { color: "#eab308", label: "Flashing amber", meaning: "Connecting — this can take a few minutes" },
];

// ---- Small presentational helpers ------------------------------------------
function SectionHeading({ n, id, children }: { n: number; id: string; children: ReactNode }) {
  return (
    <div id={id} className="flex scroll-mt-24 items-center gap-3">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: brand.navy }}
      >
        {n}
      </span>
      <h2 className="text-2xl font-bold tracking-tight" style={{ color: brand.navy }}>
        {children}
      </h2>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      className="rounded-xl border p-6"
      style={{ backgroundColor: brand.surface, borderColor: brand.border }}
    >
      <h3 className="mb-3 text-base font-bold" style={{ color: brand.navy }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: brand.ink }}>
        {children}
      </p>
    </div>
  );
}

// ---- Main component --------------------------------------------------------
export function RouterSetupGuide() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">
      {/* Hero */}
      <header
        className="px-6 py-14 text-center"
        style={{
          backgroundImage: `linear-gradient(135deg, ${brand.navyMid} 0%, ${brand.navyDeep} 100%)`,
        }}
      >
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: brand.amber }} />
          Setup Guide
        </span>
        <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Router setup, Wi-Fi &amp; troubleshooting
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
          Everything you need to get your Zoiko router connected and online — the same guide our
          support team uses, in one scrollable page.
        </p>
      </header>

      {/* Body: sticky TOC + content */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[240px_1fr]">
        {/* On this page */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <nav
            className="rounded-xl border p-5"
            style={{ backgroundColor: brand.surface, borderColor: brand.border }}
            aria-label="On this page"
          >
            <p
              className="mb-4 text-xs font-bold uppercase tracking-wider"
              style={{ color: brand.inkMuted }}
            >
              On this page
            </p>
            <ol className="space-y-3 text-sm">
              {tocItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="transition-colors hover:underline"
                    style={{ color: brand.navy }}
                  >
                    {i + 1}. {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 space-y-16">
          {/* 1. What's in the box */}
          <section className="space-y-4">
            <SectionHeading n={1} id="box">
              What&apos;s in the box
            </SectionHeading>
            <p className="text-base" style={{ color: brand.ink }}>
              Before you start, check you have everything you need:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-base" style={{ color: brand.ink }}>
              {boxContents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* 2. Connecting your router */}
          <section className="space-y-5">
            <SectionHeading n={2} id="connect">
              Connecting your router
            </SectionHeading>
            <p className="text-base leading-relaxed" style={{ color: brand.ink }}>
              How you connect depends on the type of broadband you have. If you&apos;re not sure
              which one applies to you, that&apos;s completely normal — check the box your router
              came in, or use{" "}
              <a href="#" className="font-semibold underline" style={{ color: brand.navy }}>
                Start Setup Check
              </a>{" "}
              on the main support page.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard title="Full Fibre (FTTP)">
                Connect the Ethernet cable between the <strong className="font-semibold" style={{ color: brand.navy }}>ONT</strong> — the small box already
                fitted to your wall — and the port marked{" "}
                <strong className="font-semibold" style={{ color: brand.navy }}>WAN / Internet</strong> on your router.
              </InfoCard>
              <InfoCard title="Standard Fibre (FTTC)">
                Connect the broadband cable from your{" "}
                <strong className="font-semibold" style={{ color: brand.navy }}>master wall socket</strong> to the port marked{" "}
                <strong className="font-semibold" style={{ color: brand.navy }}>DSL / Line</strong> on your router.
              </InfoCard>
            </div>

            <p className="text-base" style={{ color: brand.ink }}>
              Once connected, plug in the power adaptor and switch on at the wall.
            </p>

            {/* Callout */}
            <div
              className="flex items-start gap-4 rounded-xl border px-5 py-4"
              style={{ backgroundColor: "#fdf6e3", borderColor: "#f3e2b0" }}
            >
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: brand.amber }}
                aria-hidden="true"
              >
                !
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "#7c5a12" }}>
                Wait for the power and internet lights to turn{" "}
                <strong className="font-semibold">solid white or green</strong> — this can take up to
                5 minutes the first time.
              </p>
            </div>
          </section>

          {/* 3. Connecting to Wi-Fi */}
          <section className="space-y-4">
            <SectionHeading n={3} id="wifi">
              Connecting to Wi-Fi
            </SectionHeading>
            <p className="text-base leading-relaxed" style={{ color: brand.ink }}>
              The Wi-Fi network name (SSID) and password are printed on the label on the{" "}
              <strong className="font-semibold" style={{ color: brand.navy }}>base of your router</strong>.
            </p>
            <ol className="ml-5 list-decimal space-y-2 text-base" style={{ color: brand.ink }}>
              <li>Open Wi-Fi settings on your phone, laptop or tablet</li>
              <li>Select the network name shown on your router&apos;s label</li>
              <li>Enter the password exactly as printed — it&apos;s case-sensitive</li>
            </ol>
            <p className="text-base" style={{ color: brand.ink }}>
              Once connected, try opening a website to confirm you&apos;re online.
            </p>
          </section>

          {/* 4. Understanding your router lights */}
          <section className="space-y-5">
            <SectionHeading n={4} id="lights">
              Understanding your router lights
            </SectionHeading>
            <div
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: brand.border }}
            >
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr style={{ backgroundColor: brand.navy }}>
                    <th className="px-5 py-3 font-semibold text-white">Light</th>
                    <th className="px-5 py-3 font-semibold text-white">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {lightRows.map((row, i) => (
                    <tr
                      key={row.label}
                      style={{ backgroundColor: i % 2 === 1 ? brand.surface : "#ffffff" }}
                    >
                      <td className="px-5 py-3" style={{ color: brand.ink }}>
                        <span className="inline-flex items-center gap-2.5">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: row.color }}
                          />
                          {row.label}
                        </span>
                      </td>
                      <td className="px-5 py-3" style={{ color: brand.ink }}>
                        {row.meaning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Quick troubleshooting */}
          <section className="space-y-5">
            <SectionHeading n={5} id="troubleshooting">
              Quick troubleshooting
            </SectionHeading>
            <div
              className="rounded-xl border px-6 py-5"
              style={{ backgroundColor: brand.surface, borderColor: brand.border }}
            >
              <ul className="ml-4 list-disc space-y-3 text-base" style={{ color: brand.ink }}>
                <li>
                  <strong className="font-semibold" style={{ color: brand.navy }}>No lights at all —</strong>{" "}
                  check the power adaptor is firmly connected at both ends and the wall socket is
                  switched on.
                </li>
                <li>
                  <strong className="font-semibold" style={{ color: brand.navy }}>Solid red light —</strong>{" "}
                  check the Ethernet or broadband cable is pushed fully into the correct port at both
                  ends.
                </li>
                <li>
                  <strong className="font-semibold" style={{ color: brand.navy }}>Wi-Fi visible but no internet —</strong>{" "}
                  restart your router: switch off at the wall, wait 30 seconds, then switch back on.
                </li>
                <li>
                  <strong className="font-semibold" style={{ color: brand.navy }}>Still not working after a restart —</strong>{" "}
                  use Setup Check or request a callback below.
                </li>
              </ul>
            </div>
          </section>

          {/* 6. Getting more help */}
          <section className="space-y-5">
            <SectionHeading n={6} id="help">
              Getting more help
            </SectionHeading>
            <p className="text-base" style={{ color: brand.ink }}>
              If you&apos;ve followed this guide and you&apos;re still having trouble, we&apos;re here
              to help.
            </p>

            {/* CTA card */}
            <div
              className="rounded-2xl px-6 py-10 text-center"
              style={{
                backgroundImage: `linear-gradient(135deg, ${brand.navyMid} 0%, ${brand.navyDeep} 100%)`,
              }}
            >
              <h3 className="text-xl font-bold text-white">Still stuck? Let&apos;s sort it together</h3>
              <p className="mx-auto mt-3 max-w-lg text-sm text-white/70">
                Jump back to Setup &amp; Installation for a guided check, live support chat, or to
                request a callback.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#"
                  className="rounded-full px-6 py-2.5 text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: brand.amber, color: brand.navyDeep }}
                >
                  Back to Setup &amp; Installation
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold text-white transition-colors hover:underline"
                >
                  Request a Callback
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default RouterSetupGuide;