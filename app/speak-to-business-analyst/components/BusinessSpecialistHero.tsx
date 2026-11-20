import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Headphones,
  MessageSquare,
  Phone,
  Search,
  TriangleAlert,
} from "lucide-react";

const ACTIONS = [
  { label: "Request a callback", href: "/contact", primary: true, icon: Phone },
  {
    label: "Check business availability",
    href: "/contact",
    primary: false,
    icon: Search,
  },
] as const;

const BUBBLES = [
  {
    id: "fibre",
    text: "Is full fibre available at my premises?",
    href: "/faqs",
    tone: "bg-[#ffc400]",
    position: "left-0 top-[6%] w-[44%] lg:-left-6",
  },
  {
    id: "static-ip",
    text: "Can I get a static IP address?",
    href: "/faqs",
    tone: "bg-white",
    position: "right-0 top-0 w-[38%]",
  },
  {
    id: "sites",
    text: "We've got three sites. What are our options?",
    href: "/faqs",
    tone: "bg-white",
    position: "left-[2%] top-[58%] w-[40%] lg:-left-4",
  },
  {
    id: "phones",
    text: "We need new business phone lines.",
    href: "/faqs",
    tone: "bg-[#ffc400]",
    position: "right-0 top-[48%] w-[36%]",
  },
  {
    id: "unsure",
    text: "I'm not sure what we need.",
    href: "/faqs",
    tone: "bg-[#ffc400]",
    position: "bottom-0 left-[34%] w-[38%]",
  },
] as const;

export default function BusinessSpecialistHero() {
  return (
    <section className="w-full overflow-x-hidden bg-gradient-to-br from-white via-[#f6f8fc] to-[#fdf6dc] text-[#0b1a3a]">
      <div className="mx-auto grid max-w-[1300px] items-center gap-12 px-6 py-12 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-14">
        {/* Left */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-[#0b1a3a] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.06em] text-white">
            <Headphones className="h-4 w-4 text-[#ffc400]" aria-hidden="true" />
            Business Broadband &amp; Connectivity
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[54px]">
            <span className="block">Speak to a business</span>
            <span className="block">
              <span className="bg-[#ffd21f] px-1">specialist</span>
            </span>
          </h1>

          <p className="mt-5 max-w-[470px] text-base leading-7 text-[#3b4a66]">
            Tell us what your business needs, and we&apos;ll help you explore
            suitable broadband and connectivity options for your premises. No
            obligation and no payment details required.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className={
                    action.primary
                      ? "inline-flex items-center gap-2 rounded-md bg-[#ffc400] px-6 py-3 text-sm font-bold shadow-md"
                      : "inline-flex items-center gap-2 rounded-md border-2 border-[#0b1a3a] bg-white px-6 py-3 text-sm font-bold"
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {action.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="tel:+442071646399"
            className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-md"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b1a3a] text-[#ffc400]">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm text-[#5b6578]">
                Call our UK team
              </span>
              <span className="block text-sm font-extrabold">
                +44 20 7164 6399
              </span>
            </span>
          </Link>
        </div>

        {/* Right */}
        <div className="relative mx-auto h-[440px] w-full max-w-[560px] sm:h-[480px] lg:max-w-none">
          <div className="absolute inset-x-[8%] top-[6%] bottom-[8%] overflow-hidden rounded-2xl shadow-2xl lg:inset-x-[10%]">
            <Image
              src="/Images/speak/2.png"
              alt="Smiling business specialist wearing a headset"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-center"
            />
          </div>

          {BUBBLES.map((bubble) => (
            <div
              key={bubble.id}
              className={`absolute z-10 rounded-xl p-3 shadow-xl ${bubble.tone} ${bubble.position}`}
            >
              <p className="flex items-start gap-2 text-sm font-bold leading-4">
                <MessageSquare
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                {bubble.text}
              </p>
              <Link
                href={bubble.href}
                className="mt-1 inline-flex items-center gap-1 pl-5 text-sm font-bold text-[#0b3a8a]"
              >
                Ask this
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          ))}

          {/* Small avatar photo */}
          <div className="absolute bottom-[14%] right-0 z-20 h-[18%] w-[17%] min-h-[72px] min-w-[72px] overflow-hidden rounded-2xl border-4 border-white shadow-xl">
            <Image
              src="/Images/speak/1.jpg"
              alt="Business specialist at work"
              fill
              sizes="100px"
              className="object-cover object-[50%_20%]"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#0b1a3a] text-white">
        <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-center gap-x-5 gap-y-3 px-6 py-3 text-sm sm:px-8 lg:px-10">
          <p className="flex items-center gap-2 font-bold">
            <TriangleAlert
              className="h-4 w-4 text-[#ffc400]"
              aria-hidden="true"
            />
            Already a customer with a fault, outage or billing question?
          </p>
          <Link
            href="/faqs"
            className="inline-flex items-center gap-2 rounded-md bg-[#ffc400] px-4 py-2 font-bold text-[#0b1a3a]"
          >
            Get support
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="text-white/75">
            Our sales team can&apos;t handle faults, so you&apos;ll get help
            faster there.
          </p>
        </div>
      </div>
    </section>
  );
}
