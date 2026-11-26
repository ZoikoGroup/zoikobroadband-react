import { CreditCard, ShieldCheck } from "lucide-react";

interface TimingStep {
  number: string;
  title: string;
  description: string;
}

interface CostContinuityCard {
  id: string;
  title: string;
  description: string;
  icon: "card" | "router" | "shield";
}

const timingSteps: TimingStep[] = [
  {
    number: "1",
    title: "Request",
    description: "You ask us to look into keeping your number.",
  },
  {
    number: "2",
    title: "Validate",
    description: "We check the details with your current provider.",
  },
  {
    number: "3",
    title: "Confirm date",
    description: "A transfer date is agreed — not assumed.",
  },
  {
    number: "4",
    title: "Prepare & execute",
    description: "Everything is set up and the transfer is carried out.",
  },
  {
    number: "5",
    title: "Test",
    description: "We confirm the number works on your new service.",
  },
  {
    number: "6",
    title: "Keep service until then",
    description: "Your old line stays active until the transfer completes.",
  },
];

const costContinuityCards: CostContinuityCard[] = [
  {
    id: "any-charges",
    title: "Any charges",
    description:
      "We don't add a charge just to transfer a number in. Any costs for your chosen service or your old provider's contract are confirmed separately — your current provider can confirm their own charges.",
    icon: "card",
  },
  {
    id: "broadband-and-line",
    title: "Broadband & your line",
    description:
      "If your phone shares a line or service with your broadband, we check how a transfer affects both — so you don't lose one while sorting out the other.",
    icon: "router",
  },
  {
    id: "staying-reachable",
    title: "Staying reachable",
    description:
      "Around the transfer we check calls reach you — an inbound test and, where needed, a safe rollback plan. Keep your current service active until it's confirmed.",
    icon: "shield",
  },
];

export default function TimingAndCostsSection() {
  return (
    <div className="w-full bg-white text-[#0E223B] antialiased">
      {/* Section 1: Timing */}
      <section
        id="timing"
        className="w-full bg-white px-4 py-14 sm:px-6 lg:py-20"
      >
        <div className="mx-auto w-full max-w-[1300px]">
          {/* Centered Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-3">
              <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
              <span className="text-[10.5px] font-extrabold uppercase tracking-[0.15em] text-[#B78418]">
                Timing
              </span>
              <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
            </div>

            <h2 className="mt-3 text-[34px] font-extrabold leading-[1.14] tracking-[-0.025em] text-[#0E223B] sm:text-[42px]">
              What happens, and when
            </h2>

            <p className="mx-auto mt-3 max-w-[540px] text-[13.5px] leading-[1.6] text-[#5B6B7F] sm:text-[14px]">
              There&apos;s no fixed timescale — a date is only set once your
              transfer is confirmed. The steps are always the same.
            </p>
          </div>

          {/* 6-Step Vertical Sequence */}
          <ol className="mt-10 space-y-6">
            {timingSteps.map((item) => (
              <li key={item.number} className="flex flex-col">
                <span className="text-[11px] font-semibold leading-none text-[#7E8EA3]">
                  {item.number}
                </span>
                <h3 className="mt-1.5 text-[14.5px] font-bold leading-snug text-[#0E223B]">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-[12.5px] leading-[1.55] text-[#5B6B7F]">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Section 2: Costs & Continuity */}
      <section
        id="costs"
        className="w-full bg-white px-4 pb-16 pt-6 sm:px-6 lg:pb-24 lg:pt-10"
      >
        <div className="mx-auto w-full max-w-[1300px]">
          {/* Centered Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-3">
              <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
              <span className="text-[10.5px] font-extrabold uppercase tracking-[0.15em] text-[#B78418]">
                Costs &amp; continuity
              </span>
              <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
            </div>

            <h2 className="mx-auto mt-3 max-w-[760px] text-[34px] font-extrabold leading-[1.14] tracking-[-0.025em] text-[#0E223B] sm:text-[42px]">
              Charges, your broadband, and staying reachable
            </h2>

            <p className="mx-auto mt-3 max-w-[540px] text-[13.5px] leading-[1.6] text-[#5B6B7F] sm:text-[14px]">
              A few practical points that come up when a number moves — set out
              honestly, with no surprises.
            </p>
          </div>

          {/* Three-Column Practical Cards */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {costContinuityCards.map((card) => (
              <article
                key={card.id}
                className="flex flex-col rounded-2xl border border-[#E3E9F0] bg-white p-7 shadow-[0_2px_10px_rgba(14,34,59,0.02)] sm:p-8"
              >
                {/* Soft Slate-Blue Icon Tile */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2FB] text-[#1D3B5E]">
                  {card.icon === "card" && (
                    <CreditCard
                      className="h-4 w-4"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  )}

                  {card.icon === "router" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="4" y="8" width="16" height="8" rx="2" />
                      <path d="M8 16v2M16 16v2" />
                    </svg>
                  )}

                  {card.icon === "shield" && (
                    <ShieldCheck
                      className="h-4 w-4"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <h3 className="mt-5 text-[15.5px] font-bold leading-snug tracking-[-0.01em] text-[#0E223B]">
                  {card.title}
                </h3>

                <p className="mt-2.5 text-[12.5px] leading-[1.65] text-[#5B6B7F]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
