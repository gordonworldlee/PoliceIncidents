"use client";

import { useEffect, useState} from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Department, DepartmentInstances } from "@/public/data/DepartmentData";
import { DepartmentCard } from "@/components/DepartmentCard";
import { fetchApi } from "@/app/utils/apifetch";
import IncidentCard from "@/components/ViolenceCard";
import { Violence } from "@/types/important";
import { historyService } from "@/services/historyService";

// State translation object
const stateTranslation: { [key: string]: string } = {
  AL: "alabama",
  AK: "alaska",
  AR: "arkansas",
  AZ: "arizona",
  CA: "california",
  CO: "colorado",
  CT: "connecticut",
  DE: "delaware",
  FL: "florida",
  GA: "georgia",
  HI: "hawaii",
  ID: "idaho",
  IL: "illinois",
  IN: "indiana",
  IA: "iowa",
  KS: "kansas",
  KY: "kentucky",
  LA: "louisiana",
  ME: "maine",
  MD: "maryland",
  MA: "massachusetts",
  MI: "michigan",
  MN: "minnesota",
  MS: "mississippi",
  MO: "missouri",
  MT: "montana",
  NE: "nebraska",
  NV: "nevada",
  NH: "newhampshire",
  NJ: "newjersey",
  NM: "newmexico",
  NY: "newyork",
  NC: "northcarolina",
  ND: "northdakota",
  OH: "ohio",
  OK: "oklahoma",
  OR: "oregon",
  PA: "pennsylvania",
  RI: "rhodeisland",
  SC: "southcarolina",
  SD: "southdakota",
  TN: "tennessee",
  TX: "texas",
  UT: "utah",
  VA: "virginia",
  WA: "washington",
  WI: "wisconsin",
  WY: "wyoming",
  WV: "westvirginia",
  VT: "vermont",
};

// Define TypeScript interfaces
interface LegislationInstancePageProps {
  params: { legislationId: string };
}

interface BillData {
  id: string;
  title: string;
  state: string;
  session: string;
  session_year: string;
  bill_number: string;
  description: string;
  last_action: string;
  sponsors: string;
  subjects: string;
  url: string;
  [key: string]: any; // For any other properties
}

export default function LegislationInstancePage({
  params,
}: LegislationInstancePageProps) {
  const legislationId = params.legislationId;

  // State variables with proper TypeScript types
  const [billData, setBillData] = useState<BillData | null>(null);
  const [departmentsConnections, setDepartmentsConnections] = useState<Department[]>([]);
  const [violenceConnections, setViolenceConnections] = useState<Violence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data functions
  const fetchBillData = async (): Promise<any[]> => {
    const getBill = await fetchApi(`/legislation?id=${legislationId}`);
    if (!getBill.ok) {
      throw new Error("Can't fetch bill :(");
    }

    const billData = await getBill.json();
    return billData.legislation;
  };

  const fetchDepartmentConnections = async (state: string): Promise<Department[]> => {
    const response = await fetchApi(`/agencies?state=${state}`);
    if (!response.ok) {
      throw new Error("Can't fetch departments :(");
    }

    const departments = await response.json();
    return departments.departments.slice(0, 3);
  };

  const getViolenceConnections = async (state: string): Promise<Violence[]> => {
    const response = await fetchApi(`/incidents?state=${state}`);
    if (!response.ok) {
      throw new Error("Failed to fetch incidents");
    }
    const data = await response.json();
    return data.incidents.slice(0, 3);
  };

  // Load data and add to history when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const bills = await fetchBillData();
        const billItem = bills[0];
        setBillData(billItem);
        
        // Fetch related data once we have the bill
        if (billItem) {
          try {
            const departments = await fetchDepartmentConnections(billItem.state);
            setDepartmentsConnections(departments.length > 0 ? departments : DepartmentInstances);
          } catch (err) {
            console.error("Error fetching departments:", err);
            setDepartmentsConnections(DepartmentInstances);
          }
          
          try {
            const violence = await getViolenceConnections(billItem.state);
            setViolenceConnections(violence);
          } catch (err) {
            console.error("Error fetching violence incidents:", err);
            setViolenceConnections([]);
          }
          
          // Add to history
          historyService.addToHistory(
            'legislation', 
            billItem.title, 
            `/legislation/${legislationId}`,
             `/flags/${stateTranslation[billItem.state]}.png`
          );
        }
      } catch (err: any) {
        console.error("Error loading legislation data:", err);
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [legislationId]);

  if (loading) return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white pt-20 flex justify-center items-center">
        <div className="text-xl">Loading...</div>
      </div>
    </div>
  );

  if (error || !billData) return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white pt-20 flex justify-center items-center">
        <div className="text-xl text-red-600">Error loading legislation data</div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <img
                src={`/flags/${stateTranslation[billData.state]}.png`}
                alt={`flag of ${billData.state}`}
                className="w-20 h-20 object-cover rounded-lg shadow-sm"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{billData.title}</h1>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {billData.state}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {billData.session}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {billData.bill_number}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{billData.description}</p>
              </div>

              {/* Bill Status Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Bill Status</h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-gray-700">
                    <span className="font-semibold">Last Action:</span>{" "}
                    {billData.last_action}
                  </p>
                </div>
              </div>

              {/* Sponsors Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Sponsor(s)</h2>
                <p className="text-gray-700">{billData.sponsors}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Session Information Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Session Information</h2>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Session</span>
                    <span className="font-medium text-gray-900">{billData.session}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Year</span>
                    <span className="font-medium text-gray-900">{billData.session_year}</span>
                  </div>
                </div>
              </div>

              {/* Subject Areas Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Subject Areas</h2>
                <p className="text-gray-700">{billData.subjects}</p>
              </div>

              {/* Links Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Relevant Links</h2>
                <a
                  href={billData.url}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on LegiScan
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Related Content Section */}
          <div className="mt-8 space-y-8">
            {/* Violence Instances */}
            {violenceConnections.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-6">Relevant Instances of Violence</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {violenceConnections.map((incident, index) => (
                    <IncidentCard key={index} incident={incident} />
                  ))}
                </div>
              </div>
            )}

            {/* Related Departments */}
            {departmentsConnections.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-6">Relevant Departments</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {departmentsConnections.map((department, index) => (
                    <Link
                      className="block w-full transform hover:scale-102 transition-transform"
                      key={index}
                      href={`/department/${department.agency_name}`}
                    >
                      <DepartmentCard DepartmentInstance={department} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}