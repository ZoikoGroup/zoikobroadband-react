import { Wifi } from "lucide-react";
import { formatDownload, money } from "./lib/format";
import { useAddressLabel, useJourney, usePricing } from "./JourneyProvider";
import { Card } from "./ui";

export function PlanBar() {
  const { state, go } = useJourney();
  const address = useAddressLabel();
  const plan = state.plan;
  if (!plan) return null;
  const cells = [
    { id: "speed", label: "Up to", value: formatDownload(plan.download) },
    { id: "price", label: "£ a month", value: money(plan.price) },
    {
      id: "contract",
      label: "Contract",
      value: `${plan.contractMonths}-month`,
    },
  ] as const;
  return (
    <Card className="flex flex-wrap items-center gap-x-8 gap-y-3 !p-4">
      <div className="flex items-center gap-2 text-sm">
        <Wifi className="h-4 w-4 text-[#0b2a5b]" aria-hidden="true" />
        <span className="text-[#5b6578]">Your selected plan</span>
        <strong className="text-[#0b2a5b]">
          Zoiko {plan.name.replace(/^Zoiko\s+/i, "")}
        </strong>
        <span className="text-[#5b6578]">
          ({plan.technology === "FTTP" ? "Full Fibre (FTTP)" : "SoGEA"})
        </span>
      </div>
      {cells.map((cell) => (
        <div key={cell.id} className="text-sm">
          <p className="text-[#5b6578]">{cell.label}</p>
          <p className="font-bold text-[#0b2a5b]">{cell.value}</p>
        </div>
      ))}
      <div className="min-w-0 flex-1 text-sm">
        <p className="text-[#5b6578]">Service address</p>
        <p className="font-bold text-[#0b2a5b]">{address}</p>
      </div>
      <button
        type="button"
        onClick={() => go("availability")}
        className="text-sm font-bold text-[#2a5bd7]"
      >
        Change
      </button>
    </Card>
  );
}

export function SummaryCard({ title }: { title: string }) {
  const { state } = useJourney();
  const { router, extras, planPrice, monthly } = usePricing();
  const plan = state.plan;
  if (!plan) return null;
  const tech = plan.technology === "FTTP" ? "Full Fibre (FTTP)" : "SoGEA";
  const lines = [
    {
      id: "plan",
      label: `Zoiko ${plan.name.replace(/^Zoiko\s+/i, "")} - ${tech}`,
      value: money(planPrice),
    },
    {
      id: "router",
      label: router.name,
      value: router.price ? money(router.price) : "Included",
    },
    ...extras.map((e) => ({ id: e.id, label: e.name, value: money(e.price) })),
  ];
  const footer = [
    {
      id: "length",
      label: "Contract length",
      value: `${plan.contractMonths} months`,
    },
    { id: "oneoff", label: "One-off charges", value: money(0) },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-[#e3e8f0] bg-white shadow-sm">
      <h3 className="bg-[#0b2a5b] px-5 py-3 text-base font-bold text-white">
        {title}
      </h3>
      <div className="space-y-3 p-5 text-sm">
        {lines.map((line) => (
          <p
            key={line.id}
            className="flex justify-between gap-3 text-[#0b2a5b]"
          >
            <span>{line.label}</span>
            <span className="font-bold">{line.value}</span>
          </p>
        ))}
        <p className="flex justify-between gap-3 border-t border-[#e3e8f0] pt-3 text-base font-bold text-[#0b2a5b]">
          <span>Monthly total</span>
          <span>{money(monthly)}</span>
        </p>
        {footer.map((line) => (
          <p
            key={line.id}
            className="flex justify-between gap-3 text-[#5b6578]"
          >
            <span>{line.label}</span>
            <span className="font-bold text-[#0b2a5b]">{line.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
