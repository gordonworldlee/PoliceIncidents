"use client"

import { useEffect, useState } from "react";
import TotalIncidentMap from "./TotalIncidentMap"; // Assuming you have this component for the map
import { Violence } from "./ViolenceCardGrid";
import IncidentCard from "./ViolenceCard";

const ITEMS_TO_LOAD = 1634;

export default function ViolenceMapWrapper() {
  const [violenceData, setViolenceData] = useState<Violence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currSelection, setCurrSelection] = useState<Violence | null>(null);

  // Fetch data and set state variables correctly
  useEffect(() => {
    const fetchViolence = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/api/violence?per_page=${ITEMS_TO_LOAD}`);
        
        if (!response.ok) {
          throw new Error("Can't fetch violence data.");
        }
        const data = await response.json();
        setViolenceData(data.incidents || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching violence data:", err);
        setError(err instanceof Error ? err.message : "Failed to load violence data");
        setLoading(false);
      }
    };
    fetchViolence();
  }, []);

  return (
    <div>
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
          <div className="text-gray-600 mb-4">
            <p>Displaying {violenceData.length} incidents on the map</p>
          </div>

          {/* Render the map and pass the latitudes and longitudes of all incidents */}
          <div className="md:flex">
            <div className="w-full md:w-2/3">
                <TotalIncidentMap
                    locations={violenceData.map((incident) => ({
                    lat: parseFloat(incident.lat),
                    lng: parseFloat(incident.long),
                    incident: incident
                    }))}
                    onMarkerClick={(item) => setCurrSelection(item)}
                />
            </div>
            <div className="w-full md:w-1/3 px-4">
                
                {currSelection && <IncidentCard incident={currSelection} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
