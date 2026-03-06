import Link from "next/link";

const bundleServices = [
  {
    label: "Home Essentials",
    description: "Fibre + Digital Lines",
    oldprice: "£44.99",
    price: "£39.99/month",
    tags: ["Ultra Fibre" , "Digital Lines"],
  },
  {
    label: "Family Connection",
    description: "Fibre + Digital Lines",
    oldprice: "£59.99",
    price: "£54.99/month",
    tags: ["Ultra Fibre" , "Digital Lines", "TV & Entertainment"],
  },
   {
    label: "Ultimate Pack",
    description: "Fibre + Digital Lines",
    oldprice: "£69.99",
    price: "£64.99/month",
    tags: ["Ultra Fibre" , "Digital Lines", "TV & Entertainment", "Security"],
  },
    {
    label: "Zoiko Broadband",
    description: "Fibre + Digital Lines",
    oldprice: "£79.99",
    price: "£74.99/month",
    tags: ["Ultra Fibre" , "TV & Entertainment", "Security"],
  },
    {
    label: "Digital Lines",
    description: " Digital Lines",
    oldprice: "£19.99",
    price: "£14.99/month",
    tags: ["Digital Lines", "TV & Entertainment", "Security"],
  },
];

export default function BundleBuilders() {
  return (
    <>
      <section
        aria-labelledby="bundle-builder-heading"
        className="w-full py-12 px-6 sm:px-10"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2
            id="bundle-builder-heading"
            className="text-2xl sm:text-3xl font-bold text-[#10446C]"
          >
            Interactive Bundle Builder
          </h2>

          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mt-3 mb-8 max-w-xl mx-auto">
            Real-time pricing, select services, see instant savings.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bundleServices.map((item) => (
              <article
                key={item.label}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-10 md:py-14 flex flex-col items-center gap-5 hover:shadow-lg transition"
              >
                <h3 className="text-xl lg:text-2xl font-bold text-[#10446C] text-center">
                  {item.label}
                </h3>

                <p className="text-sm lg:text-base text-[#10446C] text-center">
                  {item.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs md:text-base bg-gray-100 px-3 py-1 rounded-full text-[#10446C]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xl font-bold text-[#F5C241]"><span className="text-lg text-gray-500 line-through mr-2">{item.oldprice}</span>{item.price}</p>

                <Link
                  href="/plans"
                  aria-label={`Add ${item.label} to bundle`}
                  className="bg-[#10446C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d3a5a] transition"
                >
                  Choose Bundle
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
