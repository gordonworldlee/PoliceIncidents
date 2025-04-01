"use client";
// import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Lato } from "next/font/google";
import PaginationControls from "@/components/PaginationControls";
import LegislationCard from "@/components/LegislationCard";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Define TypeScript interfaces
export interface Legislation {
  id: number;
  bill_number: string;
  description: string;
  last_action: string;
  session: string;
  session_year: string;
  sponsors: string;
  state: string;
  subjects: string;
  title: string;
  url: string;
}

// interface ApiResponse {
//   current_page: number;
//   legislation: Legislation[];
//   total_pages?: number;
//   total_items?: number;
// }

// Number of items to display per page
const ITEMS_PER_PAGE = 9; // 3x3 grid

export default function LegislationModelPage() {
  const [legislationData, setLegislationData] = useState<Legislation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  //Fetch data for each page and set state variables correctly.
  useEffect(() => {
    const fetchLegislation = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://justicewatch.me/api/legislation?page=${currentPage}&per_page=${ITEMS_PER_PAGE}&search=${searchQuery}`,
        );
        console.log(
          `https://justicewatch.me/api/legislation?page=${currentPage}&per_page=${ITEMS_PER_PAGE}`,
        );
        if (!response.ok) {
          throw new Error(`Can't fetch legislation :(`);
        }
        const data = await response.json();
        console.log(data);
        setLegislationData(data.legislation || []);

        if (data.current_page) {
          setCurrentPage(data.current_page);
        }

        if (data.total_pages) {
          setTotalPages(data.total_pages);
        } else if (data.total_items) {
          setTotalPages(Math.ceil(data.total_count / ITEMS_PER_PAGE));
        }

        setTotalCount(
          data.total_count || (data.total_pages || 1) * ITEMS_PER_PAGE,
        );
        setLoading(false);
      } catch (err) {
        console.error("Error fetching legislation data:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load legislation data",
        );
        setLoading(false);
      }
    };
    // fetchLegislation();
    const timeoutId = setTimeout(() => {
      fetchLegislation();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentPage, searchQuery]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // scroll to top
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 pt-20">
        <h1
          className={`${lato.className} text-green-700 text-5xl text-center font-bold mt-8`}
        >
          LEGISLATION
        </h1>
        <p className="text-lg text-green-700 font-bold mt-2 mb-4">
          Various pieces of legislation are being introduced to improve police
          accountability and prevent excessive use of force. Our platform
          provides a comprehensive database of these laws, empowering users to
          stay informed and take action in support of meaningful reform.
        </p>
        <div className="mt-2 flex justify-between px-4 sm:px-6 lg:px-8 mt-4">
          <p className="text-gray-600 ">
            Showing{" "}
            {legislationData.length > 0
              ? (currentPage - 1) * ITEMS_PER_PAGE + 1
              : 0}{" "}
            - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of{" "}
            {totalCount} Bills
          </p>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Legislation"
            className="w-1/2 max-w-md border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="my-2">
          <br />
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D63C68]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">Error: {error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {legislationData.map((bill, index) => (
                  <LegislationCard key={index} bill={bill} />
                ))}
              </div>

              {/* No legislation found message */}
              {legislationData.length === 0 && !loading && (
                <div className="text-center p-8">
                  <p className="text-lg text-gray-600">No legislation found.</p>
                </div>
              )}
            </>
          )}
          <br />
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
