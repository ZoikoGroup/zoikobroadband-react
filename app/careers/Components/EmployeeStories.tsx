const pathways = [
  {
    title: "James, Senior Software Engineer",
    desc: "The innovation culture here is incredible.I've grown from junior to senior in 3 years, working on projects that directly impact millions of customers.",
    positions: "3 years at Zoiko",
    salary: "Engineering",
  },
  {
    title: "Sarah, Customer Success Manager",
    desc: "The support for professional development is amazing. Zoiko invested in my MBA and promoted me to lead a team of 15 people.",
    positions: "5 years at Zoiko",
    salary: "Customer Care",
  },
  {
    title: "Marcus, Network Technician",
    desc: "Started as an apprentice and now I'm training the next generation. The career progression opportunities are genuinely life-changing.",
    positions: "7 years at Zoiko",
    salary: "Engineering",
  },
];

export default function EmployeeStories() {
  return (
    <section className="py-16 px-4 bg-[#F4F8FC]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-[#10446C]">
          Employee Stories
        </h2>

        <p className="text-gray-500 mt-2 mb-12">
          Hear from our team about their experiences working at Zoiko
        </p>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pathways.map((item, i) => (
            <div
              key={i}
              className={`
              rounded-2xl flex flex-col justify-between text-left
              transition-all duration-300
              border-2 border-gray-200 bg-white hover:shadow-lg 
              }
              `}
            >
              {/* TOP */}
              <div>
                <div className=" bg-[#10446C] w-full h-40 rounded-t-2xl flex items-center justify-center ">
                  <span className="text-white text-xl font-bold">Video</span>
                </div>

                <h3 className="text-2xl font-bold text-[#10446C] mt-4 px-7 py-3">
                  {item.title}
                </h3>

                <p className=" text-base text-[#10446C] mt-3 px-7 py-3 leading-relaxed">
                  {item.desc}
                </p>

                {/* meta */}
                <div className="flex gap-5 text-sm text-gray-500 mt-2 mb-4 px-7 py-3">
                  <span>{item.positions}</span>
                  <span>{item.salary}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
