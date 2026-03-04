"use client";

import { useState, useMemo } from "react";
import { jobs } from "../data/Jobs";

export default function CurrentOpenings() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");

  // FILTER LOGIC (optimized with useMemo)
  const filteredJobs = useMemo(() => {
    return jobs.filter((job: { title: string; skills: any[]; department: string; location: string; type: string; }) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.skills.join(" ").toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        department === "All" || job.department === department;

      const matchesLocation =
        location === "All" || job.location === location;

      const matchesType =
        type === "All" || job.type === type;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLocation &&
        matchesType
      );
    });
  }, [search, department, location, type]);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-2xl md:text-4xl font-bold text-[#10446C] text-center">
          Current Openings
        </h2>

        <p className="text-gray-500 mt-2 mb-12 text-center">
          Find your next opportunity with our smart search and filtering
        </p>
        {/* Search Panel */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
          <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
            <input
              type="text"
              placeholder="Search for jobs, skills, or departments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 outline-none"
            />
            <button className="bg-[#10446C] text-white px-5 py-3">
              🔍
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            <select
              onChange={(e) => setDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
            </select>

            <select
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="All">All Locations</option>
              <option value="London">London</option>
              <option value="Manchester">Manchester</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="All">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.length === 0 && (
            <p className="text-gray-500">No jobs found.</p>
          )}

          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`p-6 rounded-2xl shadow-sm border hover:bg-[#FFF4D8] hover:border-amber-200 transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row md:justify-between">
                <h3 className="text-xl font-bold text-[#10446C]">
                  {job.title}
                </h3>
                <span className="font-semibold text-[#10446C]">
                  {job.salary}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                <span>📍 {job.location}</span>
                <span>🕒 {job.type}</span>
                <span>💼 {job.department}</span>
              </div>

              <p className="mt-3 text-gray-700">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button className="mt-5 bg-[#F5C241] text-[#10446C] px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}