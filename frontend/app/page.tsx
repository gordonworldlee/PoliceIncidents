import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black overflow-y-auto">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-3xl mx-auto mt-16 text-left px-4">
        <h1 className="text-3xl font-bold ">
          Uphold police accountability, one{" "}
          <span className="text-[#D92552]">agency</span>, piece of{" "}
          <span className="text-[#D92552]">legislation</span>, and{" "}
          <span className="text-[#D92552]">incident</span> at a time.
        </h1>
        <p className="mt-4 text-center mt-14">
          Search across thousands of U.S. records, or visit your city&apos;s
          scorecard, <span className="font-bold">here &gt;</span>
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex items-center justify-center">
          <input
            type="text"
            placeholder="City, state, incident, bill name..."
            className="w-3/4 p-3 border border-gray-400 focus:outline-none"
          />
          <button className="bg-[#D92552] text-white px-8 py-3">&gt;</button>
        </div>
      </div>

      {/* History Section */}
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

      {/* Make it scrollable */}
      <div className="max-w-3xl mx-auto mt-12 px-4 pb-32">
        <h2 className="text-lg font-semibold mb-4"></h2>
        {[...Array(20)].map((_, i) => (
          <div key={i} className="bg-white p-4 mb-2 rounded"></div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="max-w-3xl mx-auto mt-16 text-left px-4 py-8">
        <Link
          className="block text-lg font-semibold mb-2"
          href="/department/austin"
        >
          POLICE SCORECARD FOR AUSTIN, TX &gt;
        </Link>
      </div>
    </div>
  );
}
