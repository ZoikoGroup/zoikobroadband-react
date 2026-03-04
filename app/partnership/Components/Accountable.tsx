import Image from "next/image";

const complianceItems = [
  {
    src: "/Images/ZoikoGroup/ZG-icon5.png",
    label: "Ofcom Regulated",
    description: "Industry Compliance",
  },
  {
    src: "/Images/ZoikoGroup/ZG-icon6.png",
    label: "GDPR Compliant",
    description: "Data Protection",
  },
  {
    src: "/Images/ZoikoGroup/ZG-icon7.png",
    label: "PCI-DSS Certified",
    description: "Payment Security",
  },
];

export default function Accountable() {
  return (
    <section
      className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8"
      aria-labelledby="compliance-heading"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center">
        <h2
          id="compliance-heading"
          className="text-[#16213E] text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight"
        >
          Accountable. Compliant. Secure.
        </h2>

        <p className="mt-6 text-base md:text-lg lg:text-xl text-[#555555] leading-relaxed md:leading-8 max-w-3xl mx-auto">
          Fully aligned with Ofcom’s broadband commitments and certified to
          PCI-DSS and GDPR standards, Zoiko Broadband prioritises compliance
          and customer protection.
        </p>
      </div>

      {/* Cards */}
      <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {complianceItems.map((item, i) => (
          <li key={i}>
            <article
              className="bg-[#f8f9fa] rounded-2xl border border-gray-200 px-6 py-10
              flex flex-col items-center text-center
              transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon wrapper (important for layout stability) */}
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#FFE7A6]">
                <Image
                  src={item.src}
                  alt={item.label}
                  width={56}
                  height={56}
                  className="object-contain"
                  sizes="56px"
                />
              </div>

              {/* Title */}
              <h3 className="mt-5 text-lg lg:text-2xl font-bold text-[#10446C]">
                {item.label}
              </h3>

              {/* Description */}
              <p className="mt-2 text-base text-[#555555] leading-relaxed">
                {item.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}