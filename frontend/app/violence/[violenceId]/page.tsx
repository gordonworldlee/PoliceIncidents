  'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaNewspaper } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { Map } from "@/app/components/Map";
import { fetchApi } from "@/app/utils/apifetch";
import { DepartmentCard } from "@/components/DepartmentCard";
import LegislationCard from "@/components/LegislationCard";
import { Department, DepartmentInstances } from "@/public/data/DepartmentData";
import { Legislation } from "@/app/legislation/page";
import { useParams } from "next/navigation";
import { historyService } from "@/services/historyService";

export default function ViolenceInstancePage() {
  const params = useParams();
  const violenceId = params?.violenceId as string;

  const [instance, setInstance] = useState<any>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [legislation, setLegislation] = useState<Legislation[]>([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetchApi(`/incidents/${violenceId}`);
      const data = await res.json();
      setInstance(data);

      const depts = await fetchApi(`/agencies?ori_identifier=${data.ori_identifier}`);
      const deptData = await depts.json();
      setDepartments(deptData.departments.length > 0 ? deptData.departments : DepartmentInstances);

      const leg = await fetchApi(`/legislation?state=${data.state}`);
      const legData = await leg.json();
      setLegislation(legData.legislation.slice(0, 3));

      historyService.addToHistory(
          'violence', 
          "Death by " + data.cause_of_death + " in " + data.city + ", " + data.state,
          `/violence/${violenceId}`,
          data.image_url
      );
    }

    if (violenceId) {
      loadData();
    }
  }, [violenceId]);

  if (!instance) return <div>Loading...</div>;

  return (
    <div>
        <Navbar />
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img
                  src={instance.image_url}
                  alt={`${instance.agency_responsible} logo`}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Incident Report</h1>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {instance.city}, {instance.state}
                    </span>
                    <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      {instance.encounter_type}
                    </span>
                    <span className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                      {instance.date.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Main Information */}
              <div className="space-y-6">
                {/* Description Card */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-semibold text-blue-700 mb-4">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{instance.description}</p>
                </div>

                {/* Details Card */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-semibold text-blue-700 mb-4">Incident Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Agency Responsible</span>
                        <span className="font-medium text-gray-900">{instance.agency_responsible}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Cause of Death</span>
                        <span className="font-medium text-gray-900">{instance.cause_of_death}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">ID</span>
                        <span className="font-medium text-gray-900">{instance.ori_identifier}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Location</span>
                        <span className="font-medium text-gray-900">{instance.street_address}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Date</span>
                        <span className="font-medium text-gray-900">{instance.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* News Link Card */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-semibold text-blue-700 mb-4">Additional Information</h2>
                  <Link 
                    href={instance.news_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group"
                  >
                    <FaNewspaper className="mr-2" />
                    <span>Read Full News Article</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Map Section */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Location</h2>
                <div className="h-[400px] rounded-lg overflow-hidden">
                  <Map latitude={30.26993} longitude={-97.74315} />
                </div>
              </div>
            </div>

            {/* Related Content */}
            <div className="mt-12 space-y-8">
              {/* Related Departments */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">Related Departments</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {departments.map((department: Department, index: number) => (
                    <Link
                      className="transform hover:scale-102 transition-transform"
                      key={index}
                      href={`/department/${department.agency_name}`}
                    >
                      <DepartmentCard DepartmentInstance={department} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related Legislation */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">Related Legislation</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {legislation.map((legislation: Legislation, index: number) => (
                    <LegislationCard key={index} bill={legislation} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}