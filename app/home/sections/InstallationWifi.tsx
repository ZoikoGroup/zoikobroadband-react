import Image from "next/image";
import { CalendarDays, KeyRound, Router, Wifi } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "./ui";

const items = [
  { icon: CalendarDays, title: "Appointments", text: "Where a visit is needed, you can choose from the available appointment times." },
  { icon: Router, title: "Router delivery", text: "If your plan includes a router, we tell you when to expect it." },
  { icon: KeyRound, title: "Site permissions", text: "Renting or in a flat? You may need permission before installation." },
  { icon: Wifi, title: "Wi-Fi help", text: "Guides to set up your router and get the best from your Wi-Fi." },
];

export default function InstallationWifi() {
  return (
    <section aria-labelledby="install-heading" className="bg-white py-16 dark:bg-gray-950 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,640px)_1fr] lg:gap-14">
          {/* Image collage */}
          <div className="relative pb-20 pr-10 sm:pb-24 sm:pr-16">
            <div className="relative aspect-[577/385] overflow-hidden rounded-3xl">
              <Image
                src="/Images/home/office-planning-desk.webp"
                alt="An installer marking up technical drawings beside a toolbox"
                fill
                sizes="(min-width: 1024px) 580px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[46%] max-w-[295px] overflow-hidden rounded-2xl border-[6px] border-white shadow-xl dark:border-gray-800">
              <div className="relative aspect-[286/192]">
                <Image
                  src="/Images/home/home-workspace-laptop.webp"
                  alt="A laptop and monitor on a desk by a bright window"
                  fill
                  sizes="295px"
                  className="object-cover"
                />
              </div>
              <div aria-hidden className="h-2.5 bg-[#0B2F5B]" />
            </div>
          </div>

          <div>
            <Eyebrow>Installation &amp; Wi-Fi</Eyebrow>
            <h2 id="install-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B2F5B] dark:text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
              Getting online, step by step
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Some services need an engineer visit and others do not. We confirm what applies to your property when you order.
            </p>

            <ul className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {items.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E6F0FB] text-[#0B2F5B] dark:bg-gray-800 dark:text-white">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-[#0B2F5B] dark:text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <ButtonLink href="/setup-installation" variant="navy" className="mt-8">
              Installation &amp; Routers
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
