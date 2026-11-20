import React from "react";

const TEAM_ROLES_DATA = {
  badge: "TEAM ROLES",
  heading: "Clear access for every role.",
  subheadingLine1:
    "A conceptual model of who can do what. Your actual roles and",
  subheadingLine2: "permissions are confirmed when your system is designed.",
  image: {
    src: "/Images/cloud/5.png",
    alt: "Three colleagues collaborating around a laptop in a modern office",
  },
  roles: [
    {
      number: "1",
      title: "Account owner",
      description: "Approves contracts, billing and who can manage the system.",
      badgeBg: "bg-[#061A2E]",
    },
    {
      number: "2",
      title: "Administrator",
      description:
        "Adds users, numbers and call settings, if your package supports it.",
      badgeBg: "bg-[#154976]",
    },
    {
      number: "3",
      title: "Supervisor",
      description: "Views team call activity where reporting is confirmed.",
      badgeBg: "bg-[#1D5B91]",
    },
    {
      number: "4",
      title: "Team member",
      description: "Makes and takes calls. Sees only their own settings.",
      badgeBg: "bg-[#1A4E7A]",
    },
  ],
  footnoteLine1:
    "Single sign-on, multi-factor sign-in and encryption are listed only once confirmed for your",
  footnoteLine2: "package.",
} as const;

export default function CloudTeamRoles() {
  return (
    <section
      id="team-roles"
      aria-labelledby="cloud-team-roles-heading"
      className="w-full bg-[#F4F7FA] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Rounded Photo */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[12px] border border-[#E6ECF2] bg-[#E8EEF4] shadow-[0_6px_20px_rgba(8,28,46,0.05)]">
              <img
                src={TEAM_ROLES_DATA.image.src}
                alt={TEAM_ROLES_DATA.image.alt}
                className="h-[260px] w-full object-cover object-[42%_22%] sm:h-[310px] lg:h-[342px]"
              />
            </div>
          </div>

          {/* Right Column: Badge, Heading, Copy, 4 Role Cards, Footnote */}
          <div className="lg:col-span-6">
            {/* Badge */}
            <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
              <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
                {TEAM_ROLES_DATA.badge}
              </span>
            </div>

            {/* Heading */}
            <h2
              id="cloud-team-roles-heading"
              className="mt-3 text-[32px] leading-[1.1] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[38px] lg:text-[40px]"
            >
              {TEAM_ROLES_DATA.heading}
            </h2>

            {/* Subheading */}
            <p className="mt-2.5 max-w-[540px] text-[13px] leading-[1.5] font-normal text-[#475569] sm:text-[13.5px]">
              <span className="block">{TEAM_ROLES_DATA.subheadingLine1}</span>
              <span className="block">{TEAM_ROLES_DATA.subheadingLine2}</span>
            </p>

            {/* Stacked Role Cards */}
            <div className="mt-5 flex flex-col gap-2.5">
              {TEAM_ROLES_DATA.roles.map((role) => (
                <div
                  key={role.number}
                  className="flex items-center gap-3.5 rounded-[8px] border border-[#E6ECF2] bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(8,28,46,0.02)]"
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] text-[12px] font-extrabold text-white ${role.badgeBg}`}
                  >
                    {role.number}
                  </span>

                  <div className="min-w-0 leading-tight">
                    <h3 className="text-[12.5px] leading-[1.25] font-bold text-[#081C2E]">
                      {role.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-[1.35] font-normal text-[#5A6A7E]">
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footnote */}
            <p className="mt-3 text-[10px] leading-[1.4] font-normal text-[#6E7A8A]">
              <span className="block">{TEAM_ROLES_DATA.footnoteLine1}</span>
              <span className="block">{TEAM_ROLES_DATA.footnoteLine2}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
