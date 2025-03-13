"use client"

import { useEffect, useState } from "react";

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
                const response = await fetch(`http://localhost:5001/api/violence?page=${currentPage}&per_page=${ITEMS_PER_PAGE}`);
                console.log(`http://localhost:5001/api/violence?page=${currentPage}&per_page=${ITEMS_PER_PAGE}`)
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Can't fetch legislation :(`);
                }
                const data = await response.json();
                console.log(data)
                setViolenceData(data.legislation || []);

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

    return(
        <div>
            Hello, it's the violence card view.
        </div>
    )
    
    
}