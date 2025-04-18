"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-y-auto">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-3xl mx-auto mt-16 text-left px-4 pt-20">
        <h1 className="text-3xl font-bold">
          Uphold police accountability, one{" "}
          <Link className="relative inline-block group" href="/department">
            <span className="inline-block text-[#D92552]">agency</span>
            <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-[#D92552] transition-all duration-300 ease-out group-hover:w-full transform -translate-x-1/2"></span>
          </Link>
          <span>, piece of</span>
          <Link className="relative inline-block group" href="/legislation">
            <span className="inline-block text-[#D92552]">legislation</span>
            <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-[#D92552] transition-all duration-300 ease-out group-hover:w-full transform -translate-x-1/2"></span>
          </Link>
          <span>, and </span>
          <Link href="/incident" className="relative inline-block group">
            <span className="relative z-10 text-[#D92552] transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
              {" "}
              incident{" "}
            </span>
            <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-[#D92552] transition-all duration-300 ease-out group-hover:w-full transform -translate-x-1/2"></span>
          </Link>
          <span> at a time.</span>
        </h1>
        <p className="mt-4 text-center mt-14">
          Search across thousands of U.S. records, or visit your city
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 flex items-center justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="City, state, incident, bill name..."
            className="w-3/4 p-3 border border-gray-400 focus:outline-none"
          />
          <button 
            type="submit"
            className="bg-[#D92552] text-white px-8 py-3 hover:bg-[#C01441] transition-colors"
          >
            &gt;
          </button>
        </form>
      </div>
      
      {/* History Section 
      <div className="max-w-3xl mx-auto mt-12 px-4">
        <h2 className="text-lg font-semibold mb-4">History</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/department/austin">
            <div className="bg-gray-200 p-4 rounded-lg cursor-pointer hover:bg-gray-300 flex flex-col justify-between h-full">
              Austin Police Department <br />
              <span className="text-sm text-gray-600">AGENCY</span>
            </div>
          </Link>
          <Link href="/violence/incident3">
            <div className="bg-gray-200 p-4 rounded-lg cursor-pointer hover:bg-gray-300 flex flex-col justify-between h-full">
              Violent Crime in Dallas, TX <br />
              <span className="text-sm text-gray-600">INCIDENT</span>
            </div>
          </Link>
          <Link href="/violence/incident1">
            <div className="bg-gray-200 p-4 rounded-lg cursor-pointer hover:bg-gray-300 flex flex-col justify-between h-full">
              Domestic Disturbance in Houston, TX <br />
              <span className="text-sm text-gray-600">INCIDENT</span>
            </div>
          </Link>
          <Link href="/department/houston">
            <div className="bg-gray-200 p-4 rounded-lg cursor-pointer hover:bg-gray-300 flex flex-col justify-between h-full">
              Houston Police Department <br />
              <span className="text-sm text-gray-600">AGENCY</span>
            </div>
          </Link>
        </div>
      </div>
*/}
      {/* Make it scrollable
      <div className="max-w-3xl mx-auto mt-12 px-4 pb-32">
        <h2 className="text-lg font-semibold mb-4"></h2>
        {[...Array(20)].map((_, i) => (
          <div key={i} className="bg-white p-4 mb-2 rounded"></div>
        ))}
      </div> */}

    </div>
  );
}
