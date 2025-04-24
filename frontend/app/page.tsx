"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { useState} from "react";
import { useRouter } from "next/navigation";
import HistoryCard from "@/components/HistoryCard";
import { useHistory } from "@/hooks/useHistory";
import ExampleCard from "@/components/ExampleCard";
import { History, TrendingUp } from "lucide-react";

interface exampleQueryInterface {
  type: 'department' | 'legislation' | 'violence', 
  title: string, 
  path: string, 
  imageUrl: string
}

const exampleQueries : exampleQueryInterface[] = [
  {
    type: "legislation",
    title: "Law Enforcement Officers; civil and criminal immunity expanded",
    path: "/legislation/11",
    imageUrl: "/flags/alabama.png", 
  },
  {
    type: "legislation",
    title: "Relating to a progressive disciplinary matrix for police officer misconduct in certain municipalities.",
    path: "/legislation/1926",
    imageUrl: "/flags/texas.png",
  },
  {
    type: "violence",
    title: "Death by Gunshot in San Antonio, TX",
    path: "/violence/9",
    imageUrl: "https://s.hdnux.com/photos/01/46/25/36/26826627/5/960x0.webp",
  },
  {
    type: "violence",
    title: "Death by Gunshot in Fairhaven, MA",
    path: "/violence/125",
    imageUrl: "https://fallriverreporter.com/wp-content/uploads/2023/12/Paul-N.-Coderre-Jr.jpg",
  },
  {
    type: "department",
    title: "Austin Police Department",
    path: "/department/AUSTIN",
    imageUrl: "/police_pic.jpg",
  },
];


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { history, historyLoaded, clearHistory } = useHistory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-y-auto">
      <Navbar />

      {/* Hero Section with Full-width Background */}
      <div className="w-full pt-16">
        <div className="max-w-3xl mx-auto px-4 pt-20 pb-16">
          <h1 className="text-3xl md:text-4xl font-bold">
            Uphold police accountability, one{" "}
            <Link className="relative inline-block group" href="/department">
              <span className="inline-block text-[#D92552]">agency</span>
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-[#D92552] transition-all duration-300 ease-out group-hover:w-full transform -translate-x-1/2"></span>
            </Link>
            <span>, piece of </span>
            <Link className="relative inline-block group" href="/legislation">
              <span className="inline-block text-[#D92552]">legislation</span>
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-[#D92552] transition-all duration-300 ease-out group-hover:w-full transform -translate-x-1/2"></span>
            </Link>
            <span>, and </span>
            <Link href="/violence" className="relative inline-block group">
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

          {/* Enhanced Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 flex items-center justify-center">
            <div className="w-3/4 relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="City, state, incident, bill name..."
                className="w-full p-4 border-2 border-gray-200 focus:border-[#D92552] focus:outline-none rounded-l-lg transition-all"
              />
            </div>
            <button 
              type="submit"
              className="bg-[#D92552] text-white px-8 py-4 rounded-r-lg hover:bg-[#C01441] transition-colors"
            >
              &gt;
            </button>
          </form>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="w-full pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Department Quick Access */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#D92552]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Police Departments</h3>
              </div>
              <p className="text-gray-600 mb-4">Browse and analyze department profiles across the United States</p>
              <Link href="/department" className="text-[#D92552] hover:underline flex items-center">
                View Departments <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Legislation Quick Access */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#D92552]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Legislation</h3>
              </div>
              <p className="text-gray-600 mb-4">Track police reform bills and legislative changes</p>
              <Link href="/legislation" className="text-[#D92552] hover:underline flex items-center">
                View Legislation <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Incidents Quick Access */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#D92552]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Incidents</h3>
              </div>
              <p className="text-gray-600 mb-4">Access detailed reports and documentation</p>
              <Link href="/violence" className="text-[#D92552] hover:underline flex items-center">
                View Incidents <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* History and Trending Section */}
      {historyLoaded && (
        <div className="w-full bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            {history.length > 0 && (
              <div className="mb-16">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <History className="w-5 h-5 text-[#D92552]" />
                    Recently Viewed
                  </h2>
                  <button 
                    onClick={clearHistory}
                    className="text-sm text-[#D92552] hover:underline"
                  >
                    Clear History
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {history.map((item) => (
                    <HistoryCard key={item.path} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Trending Section */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-[#D92552]" />
                Trending
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {exampleQueries.map((item) => (
                  <ExampleCard key={item.path} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-24"></div>
    </div>
  );
}