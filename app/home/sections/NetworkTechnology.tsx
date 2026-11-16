import Image from "next/image";
import { ButtonLink, Container, SectionHeader } from "./ui";

const cards = [
  {
    badge: "FTTP",
    badgeClass: "bg-[#0B2F5B] text-white",
    title: "Full Fibre (FTTP)",
    text: "Fibre runs directly to your property. It can support high-speed broadband, subject to network availability and the package you choose.",
    img: "/Images/home/network-full-fibre-cables.webp",
    alt: "Blue fibre network cables plugged into a patch panel",
    cta: { label: "Check Full Fibre Availability", href: "#check-postcode", variant: "navy" as const },
  },
  {
    badge: "SOGEA",
    badgeClass: "border border-[#9cc2ea] bg-[#E6F0FB] text-[#0B2F5B]",
    title: "Part Fibre (SOGEA)",
    text: "A broadband service using fibre and an existing copper connection for the last part of the route. Actual speeds depend on the line serving your property.",
    img: "/Images/home/network-part-fibre-house.webp",
    alt: "A detached house with a porch and a large green lawn",
    cta: { label: "Compare Part Fibre Plans", href: "/fibre-packages", variant: "outline" as const },
  },
];

export default function NetworkTechnology() {
  return (
    <section aria-labelledby="network-heading" className="bg-[#F3F7FC] py-16 dark:bg-gray-900 sm:py-24">
      <Container>
        <SectionHeader
          id="network-heading"
          eyebrow="Network Technology"
          title="Full fibre and part fibre, explained"
          intro="Two ways broadband reaches your home. Which one you can get depends on your address."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <article
              key={c.title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_-26px_rgba(11,47,91,0.4)] dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="relative aspect-[626/350]">
                <Image src={c.img} alt={c.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-7">
                <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${c.badgeClass}`}>{c.badge}</span>
                <h3 className="mt-3 text-2xl font-bold text-[#0B2F5B] dark:text-white">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{c.text}</p>
                <ButtonLink href={c.cta.href} variant={c.cta.variant} className="mt-6">
                  {c.cta.label}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
