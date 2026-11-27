import { Clock } from "lucide-react";

interface PortingRoleCard {
  id: string;
  title: string;
  description: string;
  icon: "outgoing" | "incoming" | "clock";
}

const portingCards: PortingRoleCard[] = [
  {
    id: "donor-provider",
    title: "Donor (losing) provider",
    description:
      "The provider you're leaving. They release the number once the transfer is validated. Keep your account with them active until then.",
    icon: "outgoing",
  },
  {
    id: "recipient-provider",
    title: "Recipient (gaining) provider",
    description:
      "The provider you're moving to — Zoiko. We request the transfer, agree a date and carry it out once it's confirmed.",
    icon: "incoming",
  },
  {
    id: "confirmation-stages",
    title: "Confirmation stages",
    description:
      "A transfer is requested, validated with the old provider, scheduled, carried out and tested. Nothing happens to your number without those checks.",
    icon: "clock",
  },
];

export default function HowPortingWorksSection() {
  return (
    <section
      id="how-porting-works"
      className="w-full bg-white px-4 py-14 text-[#0E223B] antialiased sm:px-6 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1300px]">
        {/* Centered Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
            <span className="text-[10.5px] font-extrabold uppercase tracking-[0.15em] text-[#B78418]">
              How porting works
            </span>
            <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
          </div>

          <h2 className="mt-3 text-[34px] font-extrabold leading-[1.14] tracking-[-0.025em] text-[#0E223B] sm:text-[42px]">
            Transferring a number, in plain English
          </h2>

          <p className="mx-auto mt-3 max-w-[560px] text-[13.5px] leading-[1.6] text-[#5B6B7F] sm:text-[14px]">
            &ldquo;Porting&rdquo; means moving a phone number from one provider
            to another so you can keep it. Two providers are involved, and each
            has a role.
          </p>
        </div>

        {/* Three-Column Explanation Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {portingCards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col rounded-2xl border border-[#E3E9F0] bg-white p-7 shadow-[0_2px_10px_rgba(14,34,59,0.02)] sm:p-8"
            >
              {/* Soft Slate-Blue Icon Tile */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDF3FA] text-[#1D3B5E]">
                {card.icon === "outgoing" && (
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

                {card.icon === "incoming" && (
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
                    <path d="M19 8h-9l-4 4 4 4h9V8z" />
                  </svg>
                )}

                {card.icon === "clock" && (
                  <Clock
                    className="h-4 w-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                )}
              </div>

              <h3 className="mt-5 text-[16.5px] font-bold leading-snug tracking-[-0.01em] text-[#0E223B]">
                {card.title}
              </h3>

              <p className="mt-2.5 text-[13px] leading-[1.65] text-[#5B6B7F]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
