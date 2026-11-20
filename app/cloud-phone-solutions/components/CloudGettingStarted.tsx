import React from "react";

const GETTING_STARTED_DATA = {
  badge: "GETTING STARTED",
  headingLine1: "From first conversation to",
  headingLine2: "go-live.",
  subheading:
    "Every step is confirmed with you. We never set cutover dates until your number transfer is approved.",
  image: {
    src: "/Images/cloud/8.png",
    alt: "Twilight skyline view with modern glass tower and historic spires",
    badgeText: "One site or many: assessed site by site",
  },
  steps: [
    {
      step: "1",
      title: "Discovery call",
      description: "We talk through your team, sites and calls.",
      isFinalHighlight: false,
      hasConnector: true,
    },
    {
      step: "2",
      title: "Site survey",
      description: "We check broadband, network, power and connected devices.",
      isFinalHighlight: false,
      hasConnector: true,
    },
    {
      step: "3",
      title: "Design & quote",
      description: "You get a written proposal with every cost itemised.",
      isFinalHighlight: false,
      hasConnector: true,
    },
    {
      step: "4",
      title: "Number transfer review",
      description:
        "We check which numbers can move. No dates promised until approved.",
      isFinalHighlight: false,
      hasConnector: true,
    },
    {
      step: "5",
      title: "Set up & test",
      description: "Your system is configured and tested with you.",
      isFinalHighlight: false,
      hasConnector: true,
    },
    {
      step: "6",
      title: "Go live",
      description: "Switch over once everything is confirmed working.",
      isFinalHighlight: true,
      hasConnector: false,
    },
  ],
} as const;

export default function CloudGettingStarted() {
  return (
    <section
      id="getting-started"
      aria-labelledby="cloud-getting-started-heading"
      className="w-full bg-white py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Top Row: Left Badge + Heading + Subheading | Right Rounded Skyline Banner */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
              <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
                {GETTING_STARTED_DATA.badge}
              </span>
            </div>

            <h2
              id="cloud-getting-started-heading"
              className="mt-3 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[40px] lg:text-[42px]"
            >
              <span className="block">{GETTING_STARTED_DATA.headingLine1}</span>
              <span className="block">{GETTING_STARTED_DATA.headingLine2}</span>
            </h2>

            <p className="mt-3 max-w-[540px] text-[13px] leading-[1.52] font-normal text-[#475569] sm:text-[13.5px]">
              {GETTING_STARTED_DATA.subheading}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-[156px] w-full overflow-hidden rounded-[12px] border border-[#E6ECF2] bg-[#1E1B3A] shadow-[0_6px_18px_rgba(8,28,46,0.06)] sm:h-[172px]">
              <img
                src={GETTING_STARTED_DATA.image.src}
                alt={GETTING_STARTED_DATA.image.alt}
                className="h-full w-full object-cover object-center"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081C2E]/55 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 inline-flex items-center rounded-[5px] bg-[#081C2E]/85 px-2.5 py-1 backdrop-blur-[2px]">
                <span className="text-[10.5px] leading-none font-semibold text-white">
                  {GETTING_STARTED_DATA.image.badgeText}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 6-Step Horizontal Timeline */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {GETTING_STARTED_DATA.steps.map((item) => (
            <div key={item.step} className="flex flex-col">
              {/* Step Circle + Yellow Horizontal Connector Line */}
              <div className="flex items-center">
                <span
                  className={
                    item.isFinalHighlight
                      ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFD100] text-[12px] font-extrabold text-[#081C2E] shadow-[0_2px_6px_rgba(255,209,0,0.28)]"
                      : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#061A2E] text-[12px] font-extrabold text-white"
                  }
                >
                  {item.step}
                </span>

                {item.hasConnector && (
                  <div
                    aria-hidden="true"
                    className="ml-2.5 hidden h-[1.5px] flex-1 bg-[#F5D033] lg:block"
                  />
                )}
              </div>

              {/* Step Title */}
              <h3 className="mt-3.5 text-[12.5px] leading-[1.3] font-bold text-[#081C2E]">
                {item.title}
              </h3>

              {/* Step Description */}
              <p className="mt-1.5 max-w-[185px] text-[11px] leading-[1.45] font-normal text-[#5A6A7E]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
