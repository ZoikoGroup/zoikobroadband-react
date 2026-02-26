
import Image from "next/image";
const communities = [
  {
    src: "/Images/ZoikoGroup/ZG-icon8.png",
    label: "Animal Welfare",
    description: "Supporting local and national animalwelfare organizations",
  },
  {
    src: "/Images/ZoikoGroup/ZG-icon9.png",
    label: "Digital Inclusion",
    description: "Bridging the digital divide in underserved communities",
  },
  {
    src: "/Images/ZoikoGroup/ZG-icon10.png",
    label: "Veteran Support",
    description:
      "Providing opportunities and assistance to veteran communities",
  },
];

export default function Supporting() {
  return (
    <>
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
            Supporting Communities
          </h2>

          <p className="mt-6 text-base md:text-lg lg:text-xl text-[#555555] leading-relaxed md:leading-8 max-w-3xl mx-auto">
            Through Zoiko Group initiatives, we contribute to animal welfare,
            digital inclusion, and veteran support programmes — ensuring our
            growth benefits society as well as customers.
          </p>
        </div>

        {/* Cards */}
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {communities.map((item, i) => (
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
    </>
  );
}
