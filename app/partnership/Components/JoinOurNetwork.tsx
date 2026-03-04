import Link from "next/link";

const partners = [
  {
    title: "Resellers",
    desc: "White-label solutions with comprehensive support and competitive margins",
  },
  {
    title: "Referral Partners",
    desc: "Earn commissions by referring customers to our premium broadband services",
  },
  {
    title: "Channel Partners",
    desc: "Strategic collaborations for mutual growth and market expansion",
  },
];

export default function JoinOurNetwork() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="w-full bg-[#f8f9fa] py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2
          id="partners-heading"
          className="text-[#16213E] text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight"
        >
          Join Our Network of Partners
        </h2>

        {/* Description */}
        <p className="mt-6 text-base md:text-lg lg:text-xl text-[#555555] leading-relaxed md:leading-8 max-w-4xl mx-auto">
          We work with resellers, referral partners, and channel collaborators
          who share our values of trust and quality. Partnering with Zoiko
          Broadband means access to competitive packages, Tier-1 support, and
          long-term growth.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {partners.map((item, i) => (
            <article
              key={i}
              className="bg-white p-6 md:px-8 md:py-10 rounded-xl shadow-sm border-l-4 border-amber-400 hover:shadow-md transition-shadow duration-300 text-left"
            >
              <h3 className="font-semibold text-xl md:text-2xl text-[#10446C]">
                {item.title}
              </h3>

              <p className="mt-3 text-base md:text-lg text-gray-700">
                {item.desc}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="/home-broadband"
            className="inline-block bg-[#f5c241] text-[#10446C] px-12 py-3 rounded-3xl text-base md:text-lg font-semibold hover:bg-[#e6b63b] focus:outline-none focus:ring-4 focus:ring-amber-300 transition"
          >
            View Plans
          </Link>
        </div>

      </div>
    </section>
  );
}