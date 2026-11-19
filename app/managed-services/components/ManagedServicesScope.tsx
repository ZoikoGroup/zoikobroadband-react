import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Info,
  Laptop,
  Phone,
  Router,
  ShieldCheck,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const ACTIONS = [
  {
    label: "Request a managed-services review",
    href: "/contact",
    primary: true,
  },
  { label: "Understand managed-service scope", href: "/faqs", primary: false },
] as const;

type NodeVariant = "navy" | "router-glow" | "yellow" | "white";

/** angle in degrees, 0 = top, clockwise */
const NODES: readonly {
  label: string;
  icon: LucideIcon;
  angle: number;
  variant: NodeVariant;
}[] = [
  { label: "Broadband line", icon: Wifi, angle: 0, variant: "navy" },
  { label: "Router", icon: Router, angle: 45, variant: "router-glow" },
  { label: "Wi-Fi", icon: Wifi, angle: 90, variant: "navy" },
  { label: "Multi-site links", icon: Globe, angle: 135, variant: "white" },
  { label: "Security edge", icon: ShieldCheck, angle: 180, variant: "white" },
  { label: "Phones & voice", icon: Phone, angle: 225, variant: "white" },
  { label: "Your devices", icon: Laptop, angle: 270, variant: "yellow" },
  { label: "Other suppliers", icon: Users, angle: 315, variant: "yellow" },
] as const;

const TABS = [
  {
    n: "01",
    label: "Installation & Onboarding",
    href: "/business/installation",
    active: false,
  },
  {
    n: "02",
    label: "Business Support & SLAs",
    href: "/business/support",
    active: false,
  },
  {
    n: "03",
    label: "Cyber Security & Protection",
    href: "/business/security",
    active: false,
  },
  {
    n: "04",
    label: "Managed Services",
    href: "/business/managed-services",
    active: true,
  },
  {
    n: "05",
    label: "Request a Tailored Quote",
    href: "/contact",
    active: false,
  },
] as const;

const RADIUS = 39; // % of the diagram box

const NODE_STYLES: Record<NodeVariant, string> = {
  navy: "border-white/80 bg-[#0d274d] text-white shadow-lg",
  "router-glow":
    "border-[#ffd21f] bg-white text-[#0b1a3a] ring-4 ring-[#ffd21f]/50 shadow-[0_0_24px_rgba(255,210,31,0.75)]",
  yellow:
    "border-[#ffe566] bg-[#ffc400] text-[#0b1a3a] shadow-[0_6px_18px_rgba(255,196,0,0.35)]",
  white:
    "border-[#e4eaf2] bg-white text-[#0b1a3a] shadow-[0_8px_20px_rgba(11,26,58,0.16)]",
};

export default function ManagedServicesScope() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#fcf9e8] via-[#f7f9fc] to-[#eef3f9] text-[#0b1a3a]">
      {/* Subtle decorative background circles matching the screenshot */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-[340px] w-[340px] rounded-full border-[22px] border-[#ffd21f]/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full bg-[#dbe7f5]/45 blur-2xl"
      />

      <div className="relative mx-auto grid max-w-[1300px] items-center gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-12 lg:py-14">
        {/* Left Column */}
        <div className="z-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#102542] sm:text-sm">
            MANAGED SERVICES
          </p>

          <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.025em] text-[#08172e] sm:text-5xl lg:text-[56px]">
            <span className="block">Know what is</span>
            <span className="block">managed, and who</span>
            <span className="mt-1 inline-block">
              <span className="bg-[#ffc400] px-1.5 py-0.5 text-[#08172e]">
                is responsible.
              </span>
            </span>
          </h1>

          <p className="mt-5 max-w-[450px] text-[15px] leading-[1.6] text-[#475569] sm:text-base">
            Explore managed-service options for your business and request a
            review of service scope, ownership and support needs.
          </p>

          <div className="mt-6 flex flex-col items-start gap-3">
            {ACTIONS.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={
                  action.primary
                    ? "inline-flex items-center gap-2.5 rounded-[6px] bg-[#ffc400] px-5 py-3 text-sm font-bold text-[#08172e] shadow-[0_4px_12px_rgba(255,196,0,0.4)] transition hover:bg-[#f5bc00]"
                    : "inline-flex items-center rounded-[6px] border-[1.5px] border-[#0b1a3a] bg-white px-5 py-2.5 text-sm font-bold text-[#08172e] shadow-xs transition hover:bg-[#f8fafc]"
                }
              >
                {action.label}
                {action.primary && (
                  <ArrowRight
                    className="h-4 w-4 stroke-[2.25]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex max-w-[430px] items-center gap-3 rounded-lg border border-[#e2e8f0] bg-white/95 px-4 py-3 text-xs leading-[1.45] text-[#475569] shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:text-[13px]">
            <Info
              className="h-4 w-4 shrink-0 text-[#334155]"
              aria-hidden="true"
            />
            <span>
              Service options, support arrangements and pricing depend on a
              verified quote and agreement.
            </span>
          </div>
        </div>

        {/* Right Column: Radial Diagram */}
        <div className="relative mx-auto aspect-square w-full max-w-[490px]">
          {/* Outer dashed yellow ring */}
          <span
            aria-hidden="true"
            className="absolute inset-[2.5%] rounded-full border-[1.5px] border-dashed border-[#eab308]/65"
          />

          {/* Main dark navy ring */}
          <span
            aria-hidden="true"
            className="absolute inset-[11.5%] rounded-full bg-[#081b33] shadow-[0_18px_40px_rgba(8,27,51,0.22)]"
          />

          {/* Inner subtle ring */}
          <span
            aria-hidden="true"
            className="absolute inset-[24%] rounded-full border border-white/15"
          />

          {/* Connector spokes from center to each node */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {NODES.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const x1 = 50 + 17 * Math.sin(rad);
              const y1 = 50 - 17 * Math.cos(rad);
              const x2 = 50 + RADIUS * Math.sin(rad);
              const y2 = 50 - RADIUS * Math.cos(rad);
              return (
                <line
                  key={node.label}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#facc15"
                  strokeWidth="0.65"
                  strokeDasharray="1.4 1.4"
                  strokeOpacity="0.85"
                />
              );
            })}
          </svg>

          {/* Center Photo */}
          <div className="absolute left-1/2 top-1/2 z-10 h-[35%] w-[35%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-[4px] border-[#ffc400] shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
            <Image
              src="/Images/mng/1.png"
              alt="Business team collaborating around a laptop"
              fill
              priority
              sizes="180px"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081b33]/90 via-[#081b33]/65 to-transparent pb-1.5 pt-3 text-center">
              <span className="block text-[11px] font-bold tracking-tight text-white sm:text-xs">
                Your business
              </span>
            </div>
          </div>

          {/* Radial Nodes */}
          {NODES.map((node) => {
            const Icon = node.icon;
            const rad = (node.angle * Math.PI) / 180;
            const left = 50 + RADIUS * Math.sin(rad);
            const top = 50 - RADIUS * Math.cos(rad);

            return (
              <div
                key={node.label}
                style={{ left: `${left}%`, top: `${top}%` }}
                className={`absolute z-20 flex h-[17.5%] w-[17.5%] min-h-[68px] min-w-[68px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-[12px] border px-1.5 py-1 text-center transition-transform duration-200 hover:scale-105 ${NODE_STYLES[node.variant]}`}
              >
                <Icon
                  className="h-4 w-4 shrink-0 stroke-[2]"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-bold leading-[1.15] tracking-tight sm:text-[11px]">
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Tab Bar */}
      <nav aria-label="Business sections" className="w-full bg-[#09192f]">
        <ul className="mx-auto grid max-w-[1300px] grid-cols-1 gap-2 px-6 py-2.5 sm:grid-cols-2 sm:px-8 lg:grid-cols-5 lg:px-12">
          {TABS.map((tab) => (
            <li key={tab.n}>
              <Link
                href={tab.href}
                aria-current={tab.active ? "page" : undefined}
                className={`flex h-full items-center gap-2.5 rounded-[6px] px-3.5 py-2.5 text-xs font-bold leading-tight transition sm:text-[13px] ${
                  tab.active
                    ? "bg-[#ffc400] text-[#08172e] shadow-sm"
                    : "bg-white/[0.06] text-white/90 hover:bg-white/[0.11]"
                }`}
              >
                <span
                  className={`shrink-0 font-extrabold ${
                    tab.active ? "text-[#08172e]" : "text-[#ffc400]"
                  }`}
                >
                  {tab.n}
                </span>
                <span>{tab.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
