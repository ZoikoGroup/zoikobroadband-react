import { AlignLeft, Calendar, Info, MapPin } from "lucide-react";

interface EligibilityFactor {
  id: string;
  title: string;
  description: string;
  icon: "pin" | "provider" | "calendar" | "lines";
}

const eligibilityFactors: EligibilityFactor[] = [
  {
    id: "geography",
    title: "Geography",
    description:
      "Where the number is from and where the service will be can affect whether it can transfer.",
    icon: "pin",
  },
  {
    id: "current-provider",
    title: "Current provider",
    description:
      "Transfers depend on the losing provider's processes and the status of your account with them.",
    icon: "provider",
  },
  {
    id: "account-status",
    title: "Account status",
    description:
      "The account must be in order and the request made by someone authorised to do so.",
    icon: "calendar",
  },
  {
    id: "number-type",
    title: "Number type",
    description:
      "Single numbers, several numbers or a range (DDI block) are handled differently — ranges often need specialist review.",
    icon: "lines",
  },
];

export default function EligibilitySection() {
  return (
    <section
      id="eligibility"
      className="w-full bg-[#F5F8FC] px-4 py-14 text-[#0E223B] antialiased sm:px-6 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1300px]">
        {/* Centered Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
            <span className="text-[10.5px] font-extrabold uppercase tracking-[0.15em] text-[#B78418]">
              Eligibility
            </span>
            <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
          </div>

          <h2 className="mx-auto mt-3 max-w-[540px] text-[34px] font-extrabold leading-[1.14] tracking-[-0.025em] text-[#0E223B] sm:text-[42px]">
            What affects whether a number can move
          </h2>

          <p className="mx-auto mt-3 max-w-[560px] text-[13.5px] leading-[1.6] text-[#5B6B7F] sm:text-[14px]">
            Keeping a number is common, but always{" "}
            <strong className="font-bold text-[#334155]">
              subject to verification
            </strong>
            . We can&apos;t confirm eligibility from this page — these are the
            things we check.
          </p>
        </div>

        {/* Four-Column Factor Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {eligibilityFactors.map((factor) => (
            <article
              key={factor.id}
              className="flex flex-col rounded-2xl border border-[#E3E9F0] bg-white p-6 shadow-[0_2px_10px_rgba(14,34,59,0.02)] sm:p-7"
            >
              {/* Soft Slate-Blue Icon Tile */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDF3FA] text-[#1D3B5E]">
                {factor.icon === "pin" && (
                  <MapPin
                    className="h-4 w-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                )}

                {factor.icon === "provider" && (
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
                    <path d="M5 8h9l4 4-4 4H5V8z" />
                  </svg>
                )}

                {factor.icon === "calendar" && (
                  <Calendar
                    className="h-4 w-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                )}

                {factor.icon === "lines" && (
                  <AlignLeft
                    className="h-4 w-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                )}
              </div>

              <h3 className="mt-5 text-[15.5px] font-bold leading-snug tracking-[-0.01em] text-[#0E223B]">
                {factor.title}
              </h3>

              <p className="mt-2 text-[12.5px] leading-[1.6] text-[#5B6B7F]">
                {factor.description}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom Full-Width Provisional Notice Banner */}
        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-[#DCE5F0] bg-[#F4F9FF] px-5 py-5 sm:items-center sm:px-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FB] text-[#1D3B5E]">
            <Info className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </div>

          <div>
            <h3 className="text-[14px] font-bold leading-snug text-[#0E223B]">
              Every result is provisional
            </h3>
            <p className="mt-1 text-[12.5px] leading-[1.6] text-[#5B6B7F]">
              We don&apos;t do a real-time check with your old provider here,
              and we won&apos;t show account details. Any guidance on this page
              is &ldquo;subject to verification&rdquo; until our team confirms
              it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
