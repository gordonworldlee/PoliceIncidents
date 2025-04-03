"use client";
import { useState, useEffect } from "react";
import { fetchApi } from "@/app/utils/apifetch";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { DepartmentCard } from "@/components/DepartmentCard";
import IncidentCard from "@/components/ViolenceCard";
import LegislationCard from "@/components/LegislationCard";
import { Lato } from "next/font/google";
import { Department } from "@/public/data/DepartmentData";
import { Legislation } from "../legislation/page";
import { Violence } from "@/types/important";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [departments, setDepartments] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [legislation, setLegislation] = useState([]);

  // Add this to handle initial query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery) {
      setSearchQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      // Make parallel requests for better performance
      const [deptResponse, incidentResponse, legResponse] = await Promise.all([
        fetchApi(`/agencies?search=${query}`),
        fetchApi(`/incidents?search=${query}`),
        fetchApi(`/legislation?search=${query}`)
      ]);

      const deptData = await deptResponse.json();
      const incidentData = await incidentResponse.json();
      const legData = await legResponse.json();

      setDepartments(deptData.departments || []);
      setIncidents(incidentData.incidents || []);
      setLegislation(legData.legislation || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="min-h-screen text-black pt-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`${lato.className} text-[#D63C68] text-4xl text-center font-bold mt-8 mb-6`}>
          Global Search
        </h1>

        {/* Search Input */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across departments, incidents, and legislation..."
            className="w-full max-w-2xl px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D63C68]"
          />
        </div>

        {!searchQuery ? (
          <div className="space-y-8">
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Departments</h2>
              <p className="text-gray-600">Search for police departments and law enforcement agencies</p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Incidents</h2>
              <p className="text-gray-600">Find information about police incidents and reports</p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Legislation</h2>
              <p className="text-gray-600">Explore police reform bills and legislative measures</p>
            </div>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D63C68]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : (
          <div className="space-y-8">
            {/* Departments Section */}
            {departments.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Departments</h2>
                  <Link 
                    href={`/department?search=${searchQuery}`} 
                    className="text-blue-500 hover:underline"
                  >
                    View all →
                  </Link>
                </div>
                <div className="relative">
                  <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex space-x-4 min-w-min">
                      {departments.map((department: Department) => (
                        <div key={department.id || department.agency_name} className="w-80 flex-shrink-0">
                          <Link href={`/department/${department.agency_name}`}>
                            <DepartmentCard {...department} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Incidents Section */}
            {incidents.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Incidents</h2>
                  <Link 
                    href={`/violence?search=${searchQuery}`} 
                    className="text-blue-500 hover:underline"
                  >
                    View all →
                  </Link>
                </div>
                <div className="relative">
                  <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex space-x-4 min-w-min">
                      {incidents.map((incident: Violence) => (
                        <div key={incident.id} className="w-80 flex-shrink-0">
                          <IncidentCard incident={incident} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Legislation Section */}
            {legislation.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Legislation</h2>
                  <Link 
                    href={`/legislation?search=${searchQuery}`} 
                    className="text-blue-500 hover:underline"
                  >
                    View all →
                  </Link>
                </div>
                <div className="relative">
                  <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex space-x-4 min-w-min">
                      {legislation.map((bill: Legislation) => (
                        <div key={bill.id} className="w-80 flex-shrink-0">
                          <LegislationCard bill={bill} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* No Results Message */}
            {!loading && searchQuery && 
             departments.length === 0 && 
             incidents.length === 0 && 
             legislation.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}