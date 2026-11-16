import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldAlert } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "./ui";

export default function DigitalPhoneLines() {
  return (
    <section
      aria-labelledby="digital-lines-heading"
      className="bg-[#0B2F5B] bg-[radial-gradient(ellipse_at_top_right,rgba(48,110,170,0.55),transparent_55%)] py-16 text-white sm:py-24"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,550px)_1fr] lg:gap-14">
          <div className="relative aspect-[551/448] overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/Images/home/digital-lines-phones.webp"
              alt="Several smartphones lying face down on a pale blue surface"
              fill
              sizes="(min-width: 1024px) 550px, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <Eyebrow tone="dark">Digital Phone Lines</Eyebrow>
            <h2 id="digital-lines-heading" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
              Keep the conversations that matter going.
            </h2>
            <p className="mt-4 leading-relaxed text-white/85 sm:text-lg">
              Explore digital phone options for home and business, including number transfer where supported. Find out what changes when your
              phone service uses broadband.
            </p>

            <div className="mt-6 rounded-2xl border border-[#F7BE2E]/40 bg-white/10 p-5 sm:p-6">
              <div className="flex gap-3">
                <ShieldAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#F7BE2E]" />
                <div className="space-y-2 text-sm leading-relaxed text-white/90 sm:text-base">
                  <p>
                    <strong className="text-white">Digital phone services rely on power and an internet connection.</strong> During a power cut
                    you may not be able to make calls, including to 999 or 112, without a backup.
                  </p>
                  <p>If you use telecare or care equipment, or depend on your landline for emergency access, talk to us before switching.</p>
                  <Link href="/digital-lines" className="inline-flex items-center gap-1.5 pt-1 font-semibold text-white underline underline-offset-4 hover:text-[#F7BE2E]">
                    Emergency calling guidance
                    <ChevronRight aria-hidden className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-6">
              <ButtonLink href="/digital-lines">Explore Digital Lines</ButtonLink>
              <Link
                href="/digital-lines"
                className="inline-flex items-center gap-2 border-b-2 border-[#F7BE2E] pb-1 font-bold hover:text-[#F7BE2E]"
              >
                Keep Your Number
                <ChevronRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
