"use client"

import { useEffect, useState } from "react";
import PaginationControls from "./PaginationControls";
import ViolenceQueryCardGrid from "./ViolenceQueryCardGrid";
import {ViolenceAPIResponse } from "@/types/important"

const ITEMS_PER_PAGE = 9; 

export default function ViolenceCardGrid() {
    const [violenceData, setViolenceData] = useState<ViolenceAPIResponse>();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [apiQuery, setApiQuery] = useState<string>(`page=1&per_page=${ITEMS_PER_PAGE}`);

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
            const searchParam = searchQuery ? `&search=${searchQuery}` : '';
            if (searchParam) {
                setApiQuery(`${searchParam}`);
            } else {
                setApiQuery(`page=${currentPage}&per_page=${ITEMS_PER_PAGE}`);
            }
        }, 300);
    
        return () => clearTimeout(timeoutId);
    }, [searchQuery, currentPage]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber: number) => {
        const searchParam = searchQuery ? `&search=${searchQuery}` : '';
        setCurrentPage(pageNumber);
        setApiQuery(`page=${pageNumber}&per_page=${ITEMS_PER_PAGE}${searchParam}`);
        window.scrollTo(0, 0); // scroll to top
    };
    

    return(
        <div>
            <div className="flex justify-between">
            {violenceData && 
                <p className="text-gray-600">
                    Showing {violenceData.incidents.length > 0 ? 1 : 0} - {violenceData.incidents.length} of {totalCount} incidents
                </p>
            }
            <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search Incident" className="w-1/2 max-w-md border border-gray-300 rounded-md p-2" />
            </div>
            <ViolenceQueryCardGrid api_query={apiQuery} violenceData={violenceData} setViolenceData={setViolenceData} searchQuery={searchQuery}/>
            <PaginationControls currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    )
    
    
}