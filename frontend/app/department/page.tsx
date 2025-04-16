"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { DepartmentCard } from "@/components/DepartmentCard";
import { Lato } from "next/font/google";
import { Department } from "@/public/data/DepartmentData";
import { fetchApi } from "@/app/utils/apifetch";
import SortButton from '@/components/SortButton';
import FilterButton from '@/components/FilterButton';

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// amount of card per page
const ITEMS_PER_PAGE = 9;

export default function DepartmentModelPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // List of states for filtering
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

  // Mapping from UI friendly names to actual API parameter names
  const sortOptions = [
    { id: 'agency_name', label: 'Department Name' },
    { id: 'calc_police_violence_score', label: 'Violence' },
    { id: 'calc_police_funding_score', label: 'Funding' },
    { id: 'calc_overall_score', label: 'Overall' },
    { id: 'total_population', label: 'Population' }
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

  useEffect(() => {
    const fetchDepartments = async () => {
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
        
        const response = await fetchApi(`/agencies?${queryString}`);

        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }

        const data = await response.json();
        setDepartments(data.departments || []);
        setTotalPages(data.total_pages || 0);
        setTotalCount(data.total_count || 0);
        setLoading(false);
        console.log(data.departments);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchDepartments();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentPage, searchQuery, sortField, sortDirection, selectedState]); // Added selectedState as dependency

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const renderPaginationControls = () => {
    const pages = [];

    // add previous button
    pages.push(
      <button
        key="prev"
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-gray-300 hover:bg-gray-400 text-black"}`}
      >
        Previous
      </button>,
    );

    // for showing page number
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    // the first page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 mx-1 rounded bg-gray-300 hover:bg-gray-400 text-black"
        >
          1
        </button>,
      );

      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2">
            ...
          </span>,
        );
      }
    }

    // page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded ${currentPage === i ? "bg-[#D63C68] text-white" : "bg-gray-300 hover:bg-gray-400 text-black"}`}
        >
          {i}
        </button>,
      );
    }

    // last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2">
            ...
          </span>,
        );
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 mx-1 rounded bg-gray-300 hover:bg-gray-400 text-black"
        >
          {totalPages}
        </button>,
      );
    }

    // next button
    pages.push(
      <button
        key="next"
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-gray-300 hover:bg-gray-400 text-black"}`}
      >
        Next
      </button>,
    );

    return pages;
  };

  return (
    <div className="min-h-screen text-black pt-20 overflow-y-auto">
      <Navbar />
      <h1
      className={`${lato.className} text-[#D63C68] text-5xl text-center font-bold mt-8`}
      >
        DEPARTMENT SCORES
      </h1>
      <p className="text-lg text-[#D63C68] font-bold mt-8 mb-4 text-center">
        Who watches the watchmen. We will.
      </p>
      {/* display the amount of instances showing */}
      <div className="flex flex-col md:flex-row md:justify-between px-4 sm:px-6 lg:px-8 mt-4 gap-4">
        <p className="text-gray-600">
          Showing{" "}
          {departments.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}{" "}
          - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount}{" "}
          departments
          {selectedState && <span> in {selectedState}</span>}
        </p>
        <div className="flex flex-col md:flex-row gap-2">
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
            placeholder="Search Department"
            className="border border-gray-300 rounded-md p-2 w-full md:w-64"
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <br />
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D63C68]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">Error: {error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((department) => (
                  <Link
                    key={department.id || department.agency_name}
                    href={`/department/${department.agency_name}`}
                  >
                    <DepartmentCard DepartmentInstance={department} searchQuery={searchQuery} />
                  </Link>
                ))}
              </div>

              {/* unable to find department */}
              {departments.length === 0 && !loading && (
                <div className="text-center p-8">
                  <p className="text-lg text-gray-600">No departments found.</p>
                </div>
              )}

              {/* pagination logic */}
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