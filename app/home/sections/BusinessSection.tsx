import Image from "next/image";
import { CreditCard, Cctv, Cloud, Network, Video } from "lucide-react";
import BusinessQuoteForm from "./BusinessQuoteForm";
import { Container, Eyebrow } from "./ui";

const useCases = [
  { icon: Cloud, label: "Cloud apps" },
  { icon: Video, label: "Video calls" },
  { icon: CreditCard, label: "Point of sale" },
  { icon: Cctv, label: "Security camera upload" },
  { icon: Network, label: "Multi-site consistency" },
];

export default function BusinessSection() {
  return (
    <section id="business" aria-labelledby="business-heading" className="bg-white py-16 dark:bg-gray-950 sm:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="relative pb-10 pr-6 sm:pb-12 sm:pr-10">
              <div className="relative aspect-[587/375] overflow-hidden rounded-3xl">
                <Image
                  src="/Images/home/business-office-corridor.webp"
                  alt="A modern open-plan office corridor"
                  fill
                  sizes="(min-width: 1024px) 590px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[45%] max-w-[270px] overflow-hidden rounded-2xl border-4 border-white shadow-xl dark:border-gray-900">
                <div className="relative aspect-[260/188]">
                  <Image
                    src="/Images/home/business-team-office.webp"
                    alt="A team collaborating at desks in a busy office"
                    fill
                    sizes="270px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <Eyebrow className="mt-8">Business Broadband</Eyebrow>
            <h2 id="business-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B2F5B] dark:text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
              Broadband that keeps your business connected.
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Explore connection options for offices, retail, hospitality and multi-site organisations. Get a tailored recommendation based on
              your premises and operational needs.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {useCases.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-[#E6F0FB] px-4 py-2 text-sm font-semibold text-[#0B2F5B] dark:bg-gray-800 dark:text-white"
                >
                  <Icon aria-hidden className="h-4 w-4" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <BusinessQuoteForm />
        </div>
      </Container>
    </section>
  );
}
