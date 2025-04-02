"use client";
import { ViolenceAPIResponse } from "@/types/important";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import IncidentCard from "./ViolenceCard";
import { fetchApi } from "@/app/utils/apifetch";

interface ViolenceQueryCardGridProps {
  api_query: string;
  violenceData: ViolenceAPIResponse | undefined;
  setViolenceData: Dispatch<SetStateAction<ViolenceAPIResponse | undefined>>;
}

export default function ViolenceQueryCardGrid({
  api_query,
  violenceData,
  setViolenceData,
}: ViolenceQueryCardGridProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchViolence = async () => {
      try {
        setLoading(true);
        const response = await fetchApi(`/incidents?${api_query}`);
        console.log(response);
        if (!response.ok) {
          throw new Error(`Response is NOT ok. Can't fetch Violence Data :(`);
        }
        const data = await response.json();
        setViolenceData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching violence data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load violence data",
        );
        setLoading(false);
      }
    };
    fetchViolence();
  }, [api_query]);

  return (
    <div className="my-2">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D63C68]" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4">Error: {error}</div>
      ) : (
        <>
          {violenceData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {violenceData.incidents.map((incident, index) => (
                <IncidentCard key={index} incident={incident} />
              ))}
            </div>
          )}

          {/* No legislation found message */}

          {violenceData && violenceData.incidents.length === 0 && (
            <div className="text-center p-8">
              <p className="text-lg text-gray-600">No violence found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
