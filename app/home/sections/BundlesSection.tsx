import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { ArrowLink, ButtonLink, Container, SectionHeader } from "./ui";

const bundles = [
  {
    title: "Broadband + Digital Lines",
    text: "Bring your broadband and digital phone together.",
    cta: "Explore",
    href: "/bundles",
    img: "/Images/home/bundle-digital-lines-living-room.webp",
    alt: "A bright living room with a yellow armchair",
  },
  {
    title: "Broadband + Mobile",
    text: "Explore eligible mobile benefits.",
    cta: "Explore",
    href: "/bundles",
    img: "/Images/home/bundle-broadband-mobile.webp",
    alt: "A smartphone home screen resting on a laptop",
  },
  {
    title: "Connected Home",
    text: "Products shown only where they are available and supported.",
    cta: "Check eligibility",
    href: "#check-postcode",
    img: "/Images/home/bundle-connected-home.webp",
    alt: "A hand holding a phone next to a smart door lock",
  },
  {
    title: "Zoiko Orbit",
    text: "A travel eSIM from the Zoiko family. Separate from broadband, with no bundled saving.",
    cta: "About Zoiko Orbit",
    href: "https://zoikoorbit.com",
    external: true,
    related: true,
    img: "/Images/home/bundle-zoiko-orbit-travel.webp",
    alt: "A travel map with a camera lens, notebook and backpack",
  },
];

export default function BundlesSection() {
  return (
    <section aria-labelledby="bundles-heading" className="bg-white py-16 dark:bg-gray-950 sm:py-24">
      <Container>
        <SectionHeader
          id="bundles-heading"
          eyebrow="Bundles"
          title="Bring your services together"
          intro="Every bundle is checked against your address and our current catalogue. Combined charges are shown before you order."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bundles.map((b) => (
            <article
              key={b.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_-26px_rgba(11,47,91,0.4)] dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="relative aspect-[303/195]">
                <Image src={b.img} alt={b.alt} fill sizes="(min-width: 1024px) 305px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                {b.related && (
                  <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-gray-800 dark:text-slate-200">
                    <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                    Related Zoiko product
                  </span>
                )}
                <h3 className="text-xl font-bold text-[#0B2F5B] dark:text-white">{b.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-slate-600 dark:text-slate-300">{b.text}</p>
                <ArrowLink href={b.href} external={b.external} className="mt-6">
                  {b.cta}
                </ArrowLink>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/bundles" variant="navy">
            Explore Bundles
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
