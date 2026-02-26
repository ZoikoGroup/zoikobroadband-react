import Image from "next/image";

const pathways = [
  {
    title: "Engineering & Tech",
    desc: "Build cutting-edge infrastructure and innovative solutions",
    positions: "24 Open Positions",
    salary: "£45K - £85K",
    icon: "/Images/Careers/gear.png",
    tags: ["Software Engineer", "Network Engineer", "DevOps Specialist", "Data Analyst"],
  },
  {
    title: "Sales & Marketing",
    desc: "Drive growth and connect with customers across all channels",
    positions: "12 Open Positions",
    salary: "£28K - £65K + Commission",
    icon: "/Images/Careers/briefcase.png",
    tags: ["Account Manager", "Digital Marketing", "Sales Executive", "Brand Manager"],
  },
  {
    title: "Customer Care",
    desc: "Deliver exceptional service and support to our customers",
    positions: "18 Open Positions",
    salary: "£22K - £35K",
    icon: "/Images/Careers/headset.png",
    tags: ["Customer Advisor", "Technical Support", "Team Leader", "Training Specialist"],
  },
  {
    title: "Corporate Services",
    desc: "Support business operations across finance, HR, and strategy",
    positions: "8 Open Positions",
    salary: "£32K - £70K",
    icon: "/Images/Careers/building.png",
    tags: ["Finance Analyst", "HR Business Partner", "Operations Manager", "Legal Counsel"],
  },
  {
    title: "Apprenticeships",
    desc: "Start your career with structured learning and development",
    positions: "15 Open Positions",
    salary: "£18K - £25K + Training",
    icon: "/Images/Careers/graduate.png",
    tags: ["Tech Apprentice", "Customer Service", "Engineering Trainee", "Business Admin"],
  },
];

export default function CareerPathways() {
  return (
    <section className="py-16 px-4 bg-[#F4F8FC]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-[#10446C]">
          Career Pathways
        </h2>

        <p className="text-gray-500 mt-2 mb-12">
          Explore opportunities across our diverse teams and find your perfect fit
        </p>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pathways.map((item, i) => (
            <div
              key={i}
              className={`
              rounded-2xl p-8 flex flex-col justify-between text-left
              hover:border-2 hover:border-amber-400 hover:bg-white
              transition-all duration-300
              `}
            >
              {/* TOP */}
              <div >
                <div className="mb-5 flex justify-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-xl font-bold text-[#10446C]">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {item.desc}
                </p>

                {/* meta */}
                <div className="flex justify-between text-sm text-gray-500 mt-4">
                  <span>{item.positions}</span>
                  <span>{item.salary}</span>
                </div>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-6">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 px-3 py-1 rounded-full text-[#10446C]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}