import { Router, Wifi } from "lucide-react";

interface EquipmentItem {
  readonly id: string;
  readonly title: string;
  readonly iconType: "ont" | "router" | "wifi";
  readonly descriptionPrefix: string;
  readonly badgeText?: string;
  readonly descriptionSuffix?: string;
}

const EQUIPMENT_ITEMS: readonly EquipmentItem[] = [
  {
    id: "ont",
    title: "ONT",
    iconType: "ont",
    descriptionPrefix:
      "Connects the fibre entering your premises to your router.",
  },
  {
    id: "router",
    title: "Router",
    iconType: "router",
    descriptionPrefix:
      "Shares the connection with your office network. Inclusion ",
    badgeText: "[to confirm]",
    descriptionSuffix: ".",
  },
  {
    id: "wifi",
    title: "Wi-Fi",
    iconType: "wifi",
    descriptionPrefix: "Coverage depends on equipment, layout and conditions.",
  },
];

function EquipmentIcon({ type }: { type: EquipmentItem["iconType"] }) {
  if (type === "ont") {
    return (
      <svg
        className="w-[18px] h-[18px] text-[#0B2241]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="8.5" width="16" height="7" rx="2.5" />
      </svg>
    );
  }

  if (type === "router") {
    return (
      <Router
        className="w-[18px] h-[18px] text-[#0B2241]"
        strokeWidth={2.1}
        aria-hidden="true"
      />
    );
  }

  return (
    <Wifi
      className="w-[18px] h-[18px] text-[#0B2241]"
      strokeWidth={2.1}
      aria-hidden="true"
    />
  );
}

export default function OntRouterWifi() {
  return (
    <section className="w-full bg-[#DCF6EA] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-10 md:mb-11">
          <p className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
            EQUIPMENT
          </p>

          <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-3.5">
            ONT, router and Wi-Fi
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[540px]">
            Included equipment is shown per offer once confirmed. Indoor Wi-Fi
            speed can differ from your line speed.
          </p>
        </div>

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {EQUIPMENT_ITEMS.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-[18px] p-6 sm:p-7 shadow-[0_6px_20px_rgba(11,34,65,0.04)] flex flex-col"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[#FEF3C7] flex items-center justify-center mb-5 shrink-0">
                <EquipmentIcon type={item.iconType} />
              </div>

              <h3 className="text-[#0B2241] text-[17px] font-bold leading-[1.3] mb-2">
                {item.title}
              </h3>

              <p className="text-[#64748B] text-[13.5px] leading-[1.55]">
                {item.descriptionPrefix}
                {item.badgeText && (
                  <span className="inline-block bg-[#EBF1FA] text-[#334155] font-bold text-[12px] px-1.5 py-0.5 rounded-[4px] mx-0.5 align-baseline">
                    {item.badgeText}
                  </span>
                )}
                {item.descriptionSuffix}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
