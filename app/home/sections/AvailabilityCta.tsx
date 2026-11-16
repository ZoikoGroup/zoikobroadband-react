import Image from "next/image";
import PostcodeForm from "./PostcodeForm";
import { Container } from "./ui";

export default function AvailabilityCta() {
  return (
    <section aria-labelledby="cta-heading" className="bg-white pb-16 dark:bg-gray-950 sm:pb-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-[#0B2F5B] text-white">
          <div className="absolute inset-0 -z-10 lg:left-[45%]">
            <Image
              src="/Images/home/cta-modern-home-pool.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[#0B2F5B]/85 lg:bg-transparent lg:bg-[linear-gradient(90deg,#0B2F5B_0%,#0B2F5B_45%,rgba(11,47,91,0.75)_58%,rgba(11,47,91,0.2)_80%,rgba(11,47,91,0.1)_100%)]"
          />
          <div className="max-w-[620px] px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F7BE2E] sm:text-sm">Ready to get connected?</p>
            <h2 id="cta-heading" className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[40px]">
              See what is available at your address
            </h2>
            <p className="mt-4 leading-relaxed text-white/85">
              Discover the broadband options available at your address. See eligible plans, speeds and charges before choosing what works for
              you.
            </p>
            <div className="mt-7">
              <PostcodeForm id="cta-postcode" placeholder="Enter your postcode" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
