"use client"

import { useEffect, useState } from "react";
import PaginationControls from "./PaginationControls";
import ViolenceQueryCardGrid from "./ViolenceQueryCardGrid";
import {ViolenceAPIResponse } from "@/types/important"

const ITEMS_PER_PAGE = 9; 

export default function ViolenceCardGrid() {
    const [violenceData, setViolenceData] = useState<ViolenceAPIResponse>();
    const [apiQuery, setApiQuery] = useState<string>(`page=1&per_page=${ITEMS_PER_PAGE}`);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    //Fetch data for each page and set state variables correctly.

    useEffect(()=> {
        if (violenceData) {
            setCurrentPage(violenceData.current_page);
            setTotalPages(violenceData.total_pages);
            setTotalCount(violenceData.total_count);
        }
    }, [violenceData])

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        setApiQuery(`page=${pageNumber}&per_page=${ITEMS_PER_PAGE}`)
        window.scrollTo(0, 0); // scroll to top
    };
    

    return(
        <div>
            {violenceData && 
                <p className="text-gray-600">
                    Showing {violenceData.incidents.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} incidents
                </p>
            }
            <ViolenceQueryCardGrid api_query={apiQuery} violenceData={violenceData} setViolenceData={setViolenceData} />
            <PaginationControls currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    )
    
    
}