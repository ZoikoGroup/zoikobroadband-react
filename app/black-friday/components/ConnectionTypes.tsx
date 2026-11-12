import type { ReactElement } from "react";

type Line = "fibre" | "copper";

type Node = {
  label: string;
  kind: "exchange" | "cabinet";
};

type Connection = {
  title: string;
  badge: string;
  badgeBg: string;
  text: string;
  nodes: readonly Node[];
  segments: readonly Line[];
  endDot: boolean;
  strikeCabinet: boolean;
  href: string;
};

const connections: readonly Connection[] = [
  {
    title: "Full Fibre",
    badge: "FTTP",
    badgeBg: "bg-[#12A150]",
    text: "Fibre runs all the way from the exchange to your home, for the fastest packages.",
    nodes: [
      { label: "EXCHANGE", kind: "exchange" },
      { label: "CABINET", kind: "cabinet" },
    ],
    segments: ["fibre", "fibre"],
    endDot: true,
    strikeCabinet: false,
    href: "#",
  },
  {
    title: "SoGEA",
    badge: "FIBRE + COPPER",
    badgeBg: "bg-[#12436F]",
    text: "Fibre to the street cabinet, then copper to your home — no landline needed.",
    nodes: [
      { label: "EXCHANGE", kind: "exchange" },
      { label: "CABINET", kind: "cabinet" },
    ],
    segments: ["fibre", "copper"],
    endDot: false,
    strikeCabinet: false,
    href: "#",
  },
  {
    title: "ADSL",
    badge: "COPPER",
    badgeBg: "bg-[#8A5A00]",
    text: "A copper line from the exchange to your home, for addresses where fibre isn't yet available.",
    nodes: [
      { label: "EXCHANGE", kind: "exchange" },
      { label: "CABINET", kind: "cabinet" },
    ],
    segments: ["copper", "copper"],
    endDot: false,
    strikeCabinet: true,
    href: "#",
  },
] as const;

const lineClass = (type: Line): string =>
  type === "fibre"
    ? "h-[3px] flex-1 bg-[#FFC800]"
    : "h-0 flex-1 border-t-[3px] border-dotted border-[#E0672B]";

function HouseIcon(): ReactElement {
  return (
    <svg
      viewBox="0 0 64 60"
      className="h-[46px] w-[50px] shrink-0 drop-shadow-[0_3px_4px_rgba(15,42,74,0.25)]"
      aria-hidden="true"
    >
      {/* Chimney */}
      <rect x="44" y="6" width="8" height="16" rx="1" fill="#E0A800" />
      <rect x="42.5" y="4" width="11" height="4" rx="1" fill="#C99200" />

      {/* House body */}
      <path
        d="M8 28 L32 8 L56 28 V54 a3 3 0 0 1 -3 3 H11 a3 3 0 0 1 -3 -3 Z"
        fill="#FFC800"
      />

      {/* Body shading (right side) */}
      <path d="M32 8 L56 28 V54 a3 3 0 0 1 -3 3 H32 Z" fill="#F2B700" />

      {/* Roof */}
      <path
        d="M2 30 L32 4 L62 30"
        fill="none"
        stroke="#0F2A4A"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 30 L32 4 L62 30"
        fill="none"
        stroke="#1A4F82"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0 -0.5)"
      />

      {/* Attic window */}
      <circle cx="32" cy="24" r="5" fill="#0F2A4A" />
      <circle cx="32" cy="24" r="3.2" fill="#BFE3FF" />
      <path
        d="M32 20.8 V27.2 M28.8 24 H35.2"
        stroke="#0F2A4A"
        strokeWidth="0.8"
      />

      {/* Door */}
      <rect x="25" y="36" width="14" height="21" rx="2" fill="#0F2A4A" />
      <circle cx="35.5" cy="47" r="1.1" fill="#FFC800" />

      {/* Windows */}
      <rect
        x="11"
        y="36"
        width="9"
        height="9"
        rx="1"
        fill="#BFE3FF"
        stroke="#0F2A4A"
        strokeWidth="1.5"
      />
      <path d="M15.5 36 V45 M11 40.5 H20" stroke="#0F2A4A" strokeWidth="1" />
      <rect
        x="44"
        y="36"
        width="9"
        height="9"
        rx="1"
        fill="#BFE3FF"
        stroke="#0F2A4A"
        strokeWidth="1.5"
      />
      <path d="M48.5 36 V45 M44 40.5 H53" stroke="#0F2A4A" strokeWidth="1" />

      {/* Ground line */}
      <rect x="4" y="56" width="56" height="3" rx="1.5" fill="#0F2A4A" />
    </svg>
  );
}

export default function ConnectionTypes() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F1F5F9] px-4 pb-16 pt-14 sm:px-8 lg:px-[70px]">
      {/* Corner ribbon */}
      <span className="pointer-events-none absolute -left-[42px] top-[18px] hidden w-[160px] -rotate-45 bg-[#C8102E] py-[5px] text-center text-[9px] font-extrabold uppercase tracking-[0.15em] text-white shadow-md md:block">
        Black Friday
      </span>

      {/* Heading */}
      <div className="mx-auto flex max-w-[1100px] flex-col items-center">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#12436F] sm:text-3xl lg:text-4xl">
          Which connection reaches your home?
        </h2>
        <span className="mt-3 block h-[3px] w-[44px] rounded-full bg-gradient-to-r from-[#C8102E] to-[#FFC800]" />
        <p className="mt-4 text-center text-sm text-[#4B5D75]">
          Your postcode decides which technology you can get. Here&apos;s how
          each one reaches your door.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-9 grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-3">
        {connections.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="flex flex-col rounded-xl bg-white p-5 shadow-[0_6px_20px_rgba(15,42,74,0.10)] transition-shadow hover:shadow-[0_10px_26px_rgba(15,42,74,0.16)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#0F2A4A]">
                {c.title}
              </h3>
              <span
                className={`rounded-full px-3 py-[3px] text-[10px] font-extrabold tracking-wider text-white ${c.badgeBg}`}
              >
                {c.badge}
              </span>
            </div>

            {/* Diagram */}
            <div className="mt-6 flex items-center">
              <span className="flex h-[26px] w-[44px] shrink-0 items-center justify-center rounded-[4px] bg-[#0F2A4A] text-[6px] font-extrabold tracking-wide text-white">
                {c.nodes[0].label}
              </span>

              <span className={lineClass(c.segments[0])} />

              <span className="relative flex h-[22px] w-[28px] shrink-0 items-center justify-center rounded-[4px] bg-[#5C6B80] text-[5px] font-extrabold tracking-wide text-white">
                {c.nodes[1].label}
                {c.strikeCabinet ? (
                  <span className="absolute left-[-4px] right-[-4px] top-1/2 h-0 border-t-[2px] border-dotted border-[#E0672B]" />
                ) : null}
              </span>

              <span className={lineClass(c.segments[1])} />

              {c.endDot ? (
                <span className="mr-1 h-[9px] w-[9px] shrink-0 rounded-full border-2 border-[#FFC800] bg-white" />
              ) : null}

              <HouseIcon />
            </div>

            <p className="mt-5 text-xs leading-[18px] text-[#4B5D75] sm:text-[13px]">
              {c.text}
            </p>
          </a>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#4B5D75]">
        <span className="flex items-center gap-2">
          <span className="block h-[3px] w-[18px] rounded-full bg-[#FFC800]" />
          Fibre
        </span>
        <span className="flex items-center gap-2">
          <span className="block h-0 w-[18px] border-t-[3px] border-dotted border-[#E0672B]" />
          Copper
        </span>
      </div>
    </section>
  );
}
