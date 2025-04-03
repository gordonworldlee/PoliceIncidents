"use client"

import { useEffect, useState } from "react";
import PaginationControls from "./PaginationControls";
import ViolenceQueryCardGrid from "./ViolenceQueryCardGrid";
import { ViolenceAPIResponse } from "@/types/important"
import SortButton from '@/components/SortButton';

const ITEMS_PER_PAGE = 9; 

export default function ViolenceCardGrid() {
    const [violenceData, setViolenceData] = useState<ViolenceAPIResponse>();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
    const [apiQuery, setApiQuery] = useState<string>(`page=1&per_page=${ITEMS_PER_PAGE}`);

    const sortOptions = [
        { id: 'city', label: 'City' },
        { id: 'agency_responsible', label: 'Agency' },
        { id: 'cause_of_death', label: 'Cause of Death' },
        { id: 'encounter_type', label: 'Encounter Type' },
        { id: 'date', label: 'Date' }
    ];
      
    const handleSortChange = (option: string | null, direction: 'asc' | 'desc' | null) => {
        console.log('Sort by:', option, 'Direction:', direction);
        setSortField(option);
        setSortDirection(direction);
        setCurrentPage(1); // Reset to first page when sort changes
    };

    //Fetch data for each page and set state variables correctly.
    useEffect(()=> {
        if (violenceData) {
            setCurrentPage(violenceData.current_page);
            setTotalPages(violenceData.total_pages);
            setTotalCount(violenceData.total_count);
        }
    }, [violenceData])
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Build the query parameters
            let queryParams = [];
            
            // Add pagination parameters
            queryParams.push(`page=${currentPage}`);
            queryParams.push(`per_page=${ITEMS_PER_PAGE}`);
            
            // Add search parameter if present
            if (searchQuery) {
                queryParams.push(`search=${encodeURIComponent(searchQuery)}`);
            }
            
            // Add sort parameters if present
            if (sortField && sortDirection) {
                queryParams.push(`sort_by=${sortField}`);
                queryParams.push(`sort_order=${sortDirection}`);
            }
            
            // Join all parameters with &
            const queryString = queryParams.join('&');
            setApiQuery(queryString);
            
        }, 300);
    
        return () => clearTimeout(timeoutId);
    }, [searchQuery, currentPage, sortField, sortDirection]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // scroll to top
    };
    
    return(
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                {violenceData && 
                    <p className="text-gray-600">
                        Showing {violenceData.incidents.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} incidents
                    </p>
                }
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <SortButton 
                        options={sortOptions} 
                        onSortChange={handleSortChange} 
                    />
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={handleSearch} 
                        placeholder="Search Incident" 
                        className="w-full sm:w-64 border border-gray-300 rounded-md p-2" 
                    />
                </div>
            </div>
            <ViolenceQueryCardGrid 
                api_query={apiQuery} 
                violenceData={violenceData} 
                setViolenceData={setViolenceData} 
                searchQuery={searchQuery}
            />
            <PaginationControls 
                currentPage={currentPage} 
                totalPages={totalPages} 
                handlePageChange={handlePageChange} 
            />
        </div>
    )
}