"use client";
// import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Lato } from "next/font/google";
import PaginationControls from "@/components/PaginationControls";
import LegislationCard from "@/components/LegislationCard";
import { fetchApi } from "@/app/utils/apifetch";
import FilterButton from '@/components/FilterButton';
import SortButton from '@/components/SortButton';

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Define TypeScript interfaces
export interface Legislation {
  bill_number: string;
  connections_agencies: string[];
  connections_incidents: number[];
  description: string;
  id: number;
  last_action: string;
  session: string;
  session_year: string;
  sponsors: string;
  state: string;
  subjects: string;
  title: string;
  url: string;
}

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
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
  
  // Mapping from UI friendly names to actual API parameter names
  const sortOptions = [
    { id: 'state', label: 'State' },
    { id: 'bill_number', label: 'Bill Number' },
    { id: 'last_action', label: 'Last Action' },
    { id: 'title', label: 'Title' },
    { id: 'sponsors', label: 'Sponsors' }
  ];
  
  const handleSortChange = (option: string | null, direction: 'asc' | 'desc' | null) => {
    console.log('Sort by:', option, 'Direction:', direction);
    setSortField(option);
    setSortDirection(direction);
    setCurrentPage(1); // Reset to first page when sort changes
  };
  
  const handleFilterChange = (selectedStateOption: string | null) => {
    console.log('Selected state:', selectedStateOption);
    setSelectedState(selectedStateOption);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  //Fetch data for each page and set state variables correctly.
  useEffect(() => {
    const fetchLegislation = async () => {
      try {
        setLoading(true);
        
        // Build the query string
        const queryParams = [];
        
        // Add pagination parameters
        queryParams.push(`page=${currentPage}`);
        queryParams.push(`per_page=${ITEMS_PER_PAGE}`);
        
        // Add search parameter if present
        if (searchQuery) {
          queryParams.push(`search=${encodeURIComponent(searchQuery)}`);
        }
        
        // Add state filter if selected
        if (selectedState) {
          queryParams.push(`state=${selectedState}`);
        }
        
        // Add sort parameters if present
        if (sortField && sortDirection) {
          queryParams.push(`sort_by=${sortField}`);
          queryParams.push(`sort_order=${sortDirection}`);
        }
        
        // Join all parameters with &
        const queryString = queryParams.join('&');
        
        const response = await fetchApi(`/legislation?${queryString}`);
        
        console.log(`/legislation?${queryString}`);
        
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
    
    const timeoutId = setTimeout(() => {
      fetchLegislation();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentPage, searchQuery, sortField, sortDirection, selectedState]);

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
        <p className="text-lg text-green-700 font-bold mt-2 mb-4 text-center">
         Justice demands truth. Silence enables injustice.
        </p>
        <div className="mt-2 flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">
            Showing{" "}
            {legislationData.length > 0
              ? (currentPage - 1) * ITEMS_PER_PAGE + 1
              : 0}{" "}
            - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of{" "}
            {totalCount} Bills
            {selectedState && <span> in {selectedState}</span>}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <FilterButton 
              label="State" 
              options={states} 
              onFilterChange={handleFilterChange} 
            />
            <SortButton 
              options={sortOptions} 
              onSortChange={handleSortChange} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Legislation"
              className="w-full sm:w-64 border border-gray-300 rounded-md p-2"
            />
          </div>
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
                  <LegislationCard key={index} bill={bill} searchQuery={searchQuery} />
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