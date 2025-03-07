"use client"
import Link from "next/link"
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { DepartmentCard } from "@/components/DepartmentCard";
import { Lato } from 'next/font/google';
import { Department } from '@/public/data/DepartmentData'

const lato = Lato({
  subsets: ["latin"],
  weight: ['400', '700'],
});

// Increased number of cards per page
const ITEMS_PER_PAGE = 12; // Changed from 6 to 12

export default function DepartmentModelPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch departments from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/api/departments?page=${currentPage}&per_page=${ITEMS_PER_PAGE}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        
        const data = await response.json();
        setDepartments(data.departments || []);
        setTotalPages(data.total_pages || 0);
        setTotalCount(data.total_count || 0);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Render pagination controls with ellipsis for large page counts
  const renderPaginationControls = () => {
    const pages = [];
    
    // Add previous button
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
    
    // Logic for showing page numbers with ellipsis
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    // First page
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
    
    // Page numbers
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
    
    // Last page
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
    
    // Add next button
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
    <div className="min-h-screen text-black overflow-y-auto">
      <Navbar />
      <h1 className={`${lato.className} text-[#D63C68] text-5xl text-center font-bold mt-8`}>DEPARTMENT MODEL</h1>
      
      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <p className="text-gray-600">
          Showing {departments.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} departments
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-4">
                {departments.map((department) => (
                  <Link key={department.id || department.agency_name} href={`/department/${department.agency_name}`}>
                    <DepartmentCard {...department} />
                  </Link>
                ))}
              </div>
              
              {/* No departments message */}
              {departments.length === 0 && !loading && (
                <div className="text-center p-8">
                  <p className="text-lg text-gray-600">No departments found.</p>
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