import Link from "next/link";

const header = {
  eyebrow: "BUSINESS BROADBAND PLANS",
  title: "Twelve plans, from everyday to gigabit",
  description:
    "Prices are monthly on a 12-month contract. Which plans you can order depends on your address, so check availability first.",
} as const;

const contractBar = {
  label: "Contract:",
  value: "12 months",
  note: "Prices as listed on the current Zoiko site. VAT basis and one-off charges:",
  tag: "[to confirm]",
} as const;

const ctaLabel = "Check availability" as const;

const groups = [
  {
    title: "Everyday",
    subtitle: "Light use, 1–4 devices",
    plans: [
      {
        speed: "400Kbps",
        price: "£24.00",
        bar: 2,
        name: "Sonic Lite",
        upload: "400Kbps",
        devices: "1–4",
        contract: "12 months",
        href: "/request-a-tailored-quote",
      },
      {
        speed: "400Kbps",
        price: "£24.00",
        bar: 2,
        name: "Zippy Essential",
        upload: "400Kbps",
        devices: "1–4",
        contract: "12 months",
        href: "/request-a-tailored-quote",
      },
      {
        speed: "38Mbps",
        price: "£37.50",
        bar: 20,
        name: "Blitz Core",
        upload: "9.5Mbps",
        devices: "1–4",
        contract: "12 months",
        href: "/request-a-tailored-quote",
      },
      {
        speed: "38Mbps",
        price: "£37.50",
        bar: 20,
        name: "Turbo Stream",
        upload: "9.5Mbps",
        devices: "1–4",
        contract: "12 months",
        href: "/request-a-tailored-quote",
      },
    ],
  },
  {
    title: "Growth",
    subtitle: "Teams and cloud tools, 5–8 devices",
    plans: [
      {
        speed: "76Mbps",
        price: "£42.99",
        bar: 28,
        name: "Streamer Pro",
        upload: "19Mbps",
        devices: "5–8",
        contract: "12 months",
        href: "/request-a-tailored-quote",
      },
      {
        speed: "76Mbps",
        price: "£42.99",
        bar: 28,
        name: "Hyper Plus",
        upload: "19Mbps",
        devices: "5–8",
        contract: "12 months",
        href: "/request-a-tailored-quote",
      },
      {
        speed: "109Mbps",
        price: "£56.68",
        bar: 34,
        name: "Quantum Boost",
        upload: "19Mbps",
        devices: "5–8",
        contract: "12 months",
        href: "/request-a-tailored-quote",
      },
      {
        speed: "152Mbps",
        price: "£46.99",
        bar: 40,
        name: "Ultra Boost",
        upload: "28Mbps",
        devices: "5–8",
        contract: "12 months",
        href: "/request-a-tailored-quote",
      },
      {
        speed: "209Mbps",
        price: "£49.99",
        bar: 47,
        name: "Rocket Pro",
        upload: "28Mbps",
        devices: "5–8",
        contract: "12 months",
        href: "/request-a-tailored-quote",
        featured: true,
      },
    ],
  },
  {
    title: "Performance",
    subtitle: "Heavy workloads, 5–8 devices",
    plans: [
      {
        speed: "313Mbps",
        price: "£53.99",
        bar: 57,
        name: "Xplosion Max",
        upload: "47Mbps",
        devices: "5–8",
        contract: "12 months",
        href: "/request-a-tailored-quote",
      },
      {
        speed: "522Mbps",
        price: "£58.99",
        bar: 74,
        name: "Elite Ultra",
        upload: "71Mbps",
        devices: "5–8",
        contract: "12 months",
        href: "/request-a-tailored-quote",
      },
      {
        speed: "950Mbps",
        price: "£63.99",
        bar: 100,
        name: "Supersonic Infinity",
        upload: "109Mbps",
        devices: "5–8",
        contract: "12 months",
        href: "/request-a-tailored-quote",
      },
    ],
  },
] as const;

type Plan = {
  readonly speed: string;
  readonly price: string;
  readonly bar: number;
  readonly name: string;
  readonly upload: string;
  readonly devices: string;
  readonly contract: string;
  readonly href: string;
  readonly featured?: boolean;
};

function PlanCard({ plan }: { plan: Plan }) {
  const rows = [
    { label: "Upload", value: plan.upload },
    { label: "Devices", value: plan.devices },
    { label: "Contract", value: plan.contract },
  ] as const;

  return (
    <article
      className={`flex flex-col rounded-3xl bg-white px-7 pb-6 pt-7 ${
        plan.featured
          ? "border border-[#2f5fd0] shadow-[0_12px_32px_rgba(47,95,208,0.18)]"
          : "border border-[#e3e8f2]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-4xl font-medium leading-none tracking-tight text-[#0c2444]">
            {plan.speed}
          </p>
          <p className="mt-3 text-sm text-[#5b6b82]">download speed</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold leading-none tracking-tight text-[#0c2444]">
            {plan.price}
          </p>
          <p className="mt-3 text-sm text-[#5b6b82]">a month</p>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#e6ebf5]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#2f5fd0] to-[#ffc61a]"
          style={{ width: `${plan.bar}%` }}
        />
      </div>

      <h4 className="mt-4 text-2xl font-semibold tracking-tight text-[#0c2444]">
        {plan.name}
      </h4>

      <dl className="mt-5 border-t border-[#e3e8f2] pt-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-1.5 text-base"
          >
            <dt className="text-[#5b6b82]">{row.label}</dt>
            <dd className="font-semibold text-[#0c2444]">{row.value}</dd>
          </div>
        ))}
      </dl>

      <Link
        href={plan.href}
        className={`mt-4 inline-flex h-12 items-center justify-center rounded-xl text-base font-semibold transition ${
          plan.featured
            ? "bg-[#ffc61a] text-[#0c2444] hover:bg-[#ffd23d]"
            : "bg-[#0c2444] text-[#0c2444] hover:bg-[#12335e] hover:text-white"
        }`}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}

export default function BusinessBroadbandPlans() {
  return (
    <section className="w-full bg-[#f2f5fb] px-6 py-16 sm:px-10 lg:py-20">
      <div className="mx-auto max-w-[1160px]">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2f5fd0]">
          {header.eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0c2444] sm:text-4xl">
          {header.title}
        </h2>
        <p className="mt-3 max-w-[720px] text-base leading-7 text-[#5b6b82] sm:text-lg">
          {header.description}
        </p>

        {/* Contract bar */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#e3e8f2] bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#0c2444]">
              {contractBar.label}
            </span>
            <span className="rounded-full bg-[#e3ebff] px-3 py-1 text-sm font-semibold text-[#1e4fc2]">
              {contractBar.value}
            </span>
          </div>
          <p className="flex flex-wrap items-center gap-2 text-sm text-[#5b6b82]">
            {contractBar.note}
            <span className="rounded-full bg-[#eef1f8] px-2.5 py-0.5 font-semibold text-[#3b4b66]">
              {contractBar.tag}
            </span>
          </p>
        </div>

        {/* Plan groups */}
        {groups.map((group) => (
          <div key={group.title} className="mt-10">
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="text-2xl font-semibold tracking-tight text-[#0c2444]">
                {group.title}
              </h3>
              <span className="text-sm text-[#5b6b82]">{group.subtitle}</span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
