"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ["latin"],
  weight: ['400', '700'],
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

const stateTranslation: {[key: string]: string} = {
  AL: "alabama",
  AK: "alaska",
  AR: "arkansas",
  AZ: "arizona",
  CA: "california",
  CO: "colorado",
  CT: "connecticut",
  DE: "delaware",
  FL: "florida",
  GA: "georgia",
  HI: "hawaii",
  ID: "idaho",
  IL: "illinois",
  IN: "indiana",
  IA: "iowa",
  KS: "kansas",
  KY: "kentucky",
  LA: "louisiana",
  ME: "maine",
  MD: "maryland",
  MA: "massachusetts",
  MI: "michigan",
  MN: "minnesota",
  MS: "mississippi",
  MO: "missouri",
  MT: "montana",
  NE: "nebraska",
  NV: "nevada",
  NH: "newhampshire",
  NJ: "newjersey",
  NM: "newmexico",
  NY: "newyork",
  NC: "northcarolina",
  ND: "northdakota",
  OH: "ohio",
  OK: "oklahoma",
  OR: "oregon",
  PA: "pennsylvania",
  RI: "rhodeisland",
  SC: "southcarolina",
  SD: "southdakota",
  TN: "tennessee",
  TX: "texas",
  UT: "utah",
  VA: "virginia",
  WA: "washington",
  WI: "wisconsin",
  WY: "wyoming",
  WV: "westvirginia"
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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchLegislation = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/api/legislation?page=${currentPage}&per_page=${ITEMS_PER_PAGE}`);
        
        if (!response.ok) {
          throw new Error(`Can't fetch legislation :(`);
        }
        
        const data = await response.json();
        setLegislationData(data.legislation || []);
        
        // Set pagination data
        if (data.current_page) {
          setCurrentPage(data.current_page);
        }
        
        if (data.total_pages) {
          setTotalPages(data.total_pages);
        } else if (data.total_items) {
          setTotalPages(Math.ceil(data.total_count / ITEMS_PER_PAGE));
        }
        
        // Set total count if available, otherwise estimate
        setTotalCount(data.total_count || (data.total_pages || 1) * ITEMS_PER_PAGE);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching legislation data:", err);
        setError(err instanceof Error ? err.message : "Failed to load legislation data");
        setLoading(false);
      }
    };

    fetchLegislation();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // scroll to top
  };

  // Render pagination controls
  const renderPaginationControls = () => {
    const pages = [];
    
    // Add Previous button
    pages.push(
      <button 
        key="prev" 
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-gray-300 hover:bg-gray-400 text-black'}`}
      >
        Previous
      </button>
    );
    
    // For showing page numbers
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    // first page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 mx-1 rounded bg-gray-300 hover:bg-gray-400 text-black"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="px-2">...</span>);
      }
    }
    
    // page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded ${currentPage === i ? 'bg-[#D63C68] text-white' : 'bg-gray-300 hover:bg-gray-400 text-black'}`}
        >
          {i}
        </button>
      );
    }
    
    // last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="px-2">...</span>);
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 mx-1 rounded bg-gray-300 hover:bg-gray-400 text-black"
        >
          {totalPages}
        </button>
      );
    }
    
    // next button
    pages.push(
      <button 
        key="next" 
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-gray-300 hover:bg-gray-400 text-black'}`}
      >
        Next
      </button>
    );
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-y-auto">
      <Navbar />
      <h1 className={`${lato.className} text-[#D63C68] text-5xl text-center font-bold mt-8`}>LEGISLATION MODEL</h1>
      
      {/* Display the count of instances showing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <p className="text-gray-600">
          Showing {legislationData.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} Bills
        </p>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <br />
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D63C68]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">
              Error: {error}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {legislationData.map((bill) => (
                   <Link key={bill.id} href={`/legislation/${bill.id}`} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-center items-center text-center space-y-4 min-h-[250px] w-full">
                  <div 
                    key={bill.id}
                    className=""
                  >
                      <h2 className="text-xl font-bold text-blue-600">{bill.title}</h2>
                    
                    <img
                      src={`/flags/${stateTranslation[bill.state]}.png`}
                      alt={`flag of ${bill.state}`}
                      className="w-24 h-24"
                    />
                    
                    <div className="text-gray-700 space-y-1">
                      <p className="text-sm"><strong>State:</strong> {bill.state}</p>
                      <p className="text-sm"><strong>Bill Number:</strong> {bill.bill_number}</p>
                      <p className="text-sm"><strong>Last Action:</strong> {bill.last_action || "N/A"}</p>
                      <p className="text-sm"><strong>Sponsors:</strong> {bill.sponsors || "N/A"}</p>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
              
              {/* No legislation found message */}
              {legislationData.length === 0 && !loading && (
                <div className="text-center p-8">
                  <p className="text-lg text-gray-600">No legislation found.</p>
                </div>
              )}
              
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center my-8">
                  {renderPaginationControls()}
                </div>
              )}
            </>
          )}
          <br />
        </div>
      </div>
    </div>
  );
}