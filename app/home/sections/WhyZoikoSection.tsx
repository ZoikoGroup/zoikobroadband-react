import Image from "next/image";
import { Check, MapPin, ReceiptText, ShieldCheck } from "lucide-react";
import { ButtonLink, Container, Eyebrow, UnderlineLink } from "./ui";

const features = [
  { icon: MapPin, title: "Address-first", text: "We show what can be ordered at your property, not a national price that may not apply." },
  { icon: ReceiptText, title: "Clear terms", text: "Monthly prices, price rises and upfront costs are shown before you order." },
];

const points = [
  "Delivered over wholesale network infrastructure, which we do not own",
  "Complaints, ADR and support routes you can use without signing in",
  "Support for customers who need extra help",
];

export default function WhyZoikoSection() {
  return (
    <section aria-labelledby="why-heading" className="bg-[#F3F7FC] py-16 dark:bg-gray-900 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,580px)_1fr] lg:gap-16">
          {/* Image collage */}
          <div className="relative pb-16 pr-10 sm:pb-20 sm:pr-24">
            <div className="relative aspect-[452/517] overflow-hidden rounded-3xl">
              <Image
                src="/Images/home/why-zoiko-modern-home.webp"
                alt="A modern home with large windows beside a tall gum tree"
                fill
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-2 top-8 flex max-w-[260px] items-start gap-3 rounded-xl bg-[#0B2F5B] px-5 py-4 text-white shadow-xl sm:-left-3">
              <ShieldCheck aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-[#F7BE2E]" />
              <p>
                <span className="block font-bold leading-snug">Authorised BT Wholesale reseller</span>
                <span className="text-sm text-white/75">Zoiko Telecom Ltd</span>
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-[48%] max-w-[275px] overflow-hidden rounded-2xl border-4 border-white shadow-xl dark:border-gray-800">
              <div className="relative aspect-[267/234]">
                <Image
                  src="/Images/home/why-zoiko-advisor.webp"
                  alt="A smiling Zoiko customer adviser"
                  fill
                  sizes="275px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <Eyebrow>Why Zoiko</Eyebrow>
            <h2 id="why-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B2F5B] dark:text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
              Straightforward broadband, delivered through trusted wholesale connectivity.
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Zoiko Broadband is a trading name of Zoiko Telecom Ltd, an authorised BT Wholesale reseller. We help UK households and businesses
              compare connection options and understand what is available at their address.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-white text-[#0B2F5B] shadow-sm dark:bg-gray-800 dark:text-white">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-[#0B2F5B] dark:text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
                </div>
              ))}
            </div>

            <hr className="my-6 border-slate-200 dark:border-gray-700" />

            <ul className="space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 font-medium text-[#0B2F5B] dark:text-white">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F7BE2E]">
                    <Check aria-hidden className="h-3.5 w-3.5 text-[#0B2F5B]" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <ButtonLink href="/why-zoiko">Why Zoiko</ButtonLink>
              <UnderlineLink href="/contact-us">Contact Support</UnderlineLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
