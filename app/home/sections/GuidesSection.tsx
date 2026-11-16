import Image from "next/image";
import { ArrowLink, Container, SectionHeader } from "./ui";

const guides = [
  {
    title: "Full fibre vs part fibre: what is the difference?",
    text: "How FTTP and SOGEA reach your home, and what that means for speed.",
    img: "/Images/home/guide-full-fibre-servers.webp",
    alt: "Network server racks with fibre cabling",
  },
  {
    title: "Choosing the right broadband speed",
    text: "Match your speed to the people, devices and apps in your home.",
    img: "/Images/home/guide-broadband-speed-tv.webp",
    alt: "A smart TV home screen showing streaming apps",
  },
  {
    title: "Internet phone lines explained",
    text: "What changes when your home phone uses broadband, including safety.",
    img: "/Images/home/guide-internet-phone-lines.webp",
    alt: "Hands pointing at a laptop screen",
  },
];

const propositions = [
  {
    title: "Zoiko Assure",
    text: "A specialist proposition for work-critical connectivity, with its own commercial journey.",
    cta: "Learn about Zoiko Assure",
    img: "/Images/home/guide-zoiko-assure-office.webp",
    alt: "An empty modern office meeting space",
  },
  {
    title: "Zoiko Community Connect",
    text: "A digital inclusion programme with its own eligibility and community partners.",
    cta: "Learn about Community Connect",
    img: "/Images/home/guide-community-connect.webp",
    alt: "A group of friends sitting together with arms around each other",
  },
];

export default function GuidesSection() {
  return (
    <section aria-labelledby="guides-heading" className="bg-[#F3F7FC] py-16 dark:bg-gray-900 sm:py-24">
      <Container>
        <SectionHeader
          id="guides-heading"
          eyebrow="Guides & Advice"
          title="Understand your options"
          intro="Plain-English guides to help you choose with confidence."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {guides.map((g) => (
            <article
              key={g.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_-26px_rgba(11,47,91,0.4)] dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="relative aspect-[410/249]">
                <Image src={g.img} alt={g.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-full bg-[#F7BE2E] px-3 py-1 text-xs font-bold text-[#0B2F5B]">Guide</span>
                <h3 className="mt-3 text-xl font-bold leading-snug text-[#0B2F5B] dark:text-white">{g.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-slate-600 dark:text-slate-300">{g.text}</p>
                <ArrowLink href="/blogs" className="mt-6">
                  Read the Guide
                </ArrowLink>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {propositions.map((p) => (
            <article
              key={p.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_-26px_rgba(11,47,91,0.4)] dark:border-gray-800 dark:bg-gray-950 sm:flex-row"
            >
              <div className="relative aspect-[16/10] sm:aspect-auto sm:w-[38%] sm:shrink-0">
                <Image src={p.img} alt={p.alt} fill sizes="(min-width: 1024px) 240px, (min-width: 640px) 38vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-gray-800 dark:text-slate-200">
                  Separate Zoiko proposition
                </span>
                <h3 className="mt-3 text-xl font-bold text-[#0B2F5B] dark:text-white">{p.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-slate-600 dark:text-slate-300">{p.text}</p>
                <ArrowLink href="/zoiko-group" className="mt-5">
                  {p.cta}
                </ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
