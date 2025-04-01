"use client"

import { useEffect, useState } from "react";
import IncidentCard from "./ViolenceCard";
import PaginationControls from "./PaginationControls";
import TipsBox from "@/components/TipsBox"
export interface Violence {
    id: number;
    name: string;
    street_address: string;
    city: string;
    agency_responsible: string;
    image_url: string;
    cause_of_death: string;
    description: string;
    ori_identifier: string;
    encounter_type: string;
    county: string;
    news_link: string;
    date: string;
    lat: string;
    long: string;
    state: string;
}

const ITEMS_PER_PAGE = 9; 

export default function ViolenceCardGrid() {
    const [violenceData, setViolenceData] = useState<Violence[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    //Fetch data for each page and set state variables correctly.
    useEffect(() => {
        const fetchViolence = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://127.0.0.1:5002/api/violence?page=${currentPage}&per_page=${ITEMS_PER_PAGE}`);
                
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Can't fetch legislation :(`);
                }
                const data = await response.json();
                console.log(data)
                setViolenceData(data.incidents || []);

                if (data.current_page) {
                    setCurrentPage(data.current_page);
                }

                if (data.total_pages) {
                    setTotalPages(data.total_pages);
                } else if (data.total_items) {
                    setTotalPages(Math.ceil(data.total_count / ITEMS_PER_PAGE));
                }

                setTotalCount(data.total_count || (data.total_pages || 1) * ITEMS_PER_PAGE);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching legislation data:", err);
                setError(err instanceof Error ? err.message : "Failed to load legislation data");
                setLoading(false);
            }
        }
        fetchViolence();
    }, [currentPage])

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // scroll to top
      };
    

    return(
        <div>
            <div className="mb-6">
                <TipsBox />
            </div>
            <p className="text-gray-600">
                Showing {violenceData.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} incidents
            </p>
            <div className="my-2">
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
                        {violenceData.map((incident, index) => <IncidentCard key = {index} incident = {incident}/>)}
                    </div>
                    
                    {/* No legislation found message */}
                    {violenceData.length === 0 && !loading && (
                        <div className="text-center p-8">
                        <p className="text-lg text-gray-600">No violence found.</p>
                        </div>
                    )}
                    
                    </>
                )}
                <br />
                </div>
                <PaginationControls currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    )
    
    
}