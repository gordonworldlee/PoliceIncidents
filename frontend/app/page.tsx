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
      
      {historyLoaded && (
  <>
    {history.length > 0 && (
      <div className="max-w-3xl mx-auto mt-16 px-4">
        {/* Recently Viewed Section */}
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {history.map((item) => (
            <HistoryCard key={item.path} item={item} />
          ))}
        </div>
      </div>
    )}

    {/* Example Queries (always show) */}
    <div className="max-w-3xl mx-auto mt-16 px-4">
    <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
      <TrendingUp className="w-5 h-5 text-[#D92552]" />
      Trending
    </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {exampleQueries.map((item) => (
          <ExampleCard key={item.path} item={item} />
        ))}
      </div>
    </div>
  </>
)}

      {/* Footer spacing */}
      <div className="h-24"></div>
    </div>
  );
}