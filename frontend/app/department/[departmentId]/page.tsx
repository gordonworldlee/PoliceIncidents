"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Map } from "@/app/components/Map";
import { capitalize } from "@/components/DepartmentCard";
import { Lato } from "next/font/google";
import { Violence } from "@/types/important";
import IncidentCard from "@/components/ViolenceCard";
import { fetchApi } from "@/app/utils/apifetch";
import LegislationCard from "@/components/LegislationCard";
import { Legislation } from "@/app/legislation/page";
import { historyService } from "@/services/historyService";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const stateTranslation: { [key: string]: string } = {
  TEXAS: "TX",
};

export default function DepartmentPage() {
  const params = useParams();
  const departmentId = params?.departmentId as string;

  const [departmentInstance, setDepartmentInstance] = useState<any>(null);
  const [relatedViolence, setRelatedViolence] = useState<Violence[]>([]);
  const [relatedLegislation, setRelatedLegislation] = useState<Legislation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchApi(`/agencies?agency_name=${departmentId}`);
        if (!res.ok) throw new Error("Failed to fetch departments");
        const data = await res.json();
        const department = data.departments?.[0];
        if (!department) throw new Error("Department not found");

        setDepartmentInstance(department);

        const [violenceRes, legislationRes] = await Promise.all([
          fetchApi(`/incidents?state=${department.state}`),
          fetchApi(`/legislation?state=${department.state}`),
        ]);

        const violenceData = await violenceRes.json();
        const legislationData = await legislationRes.json();

        setRelatedViolence(violenceData.incidents.slice(0, 3));
        setRelatedLegislation(legislationData.legislation.slice(0, 3));

        historyService.addToHistory(
          'department', 
          capitalize(department.agency_name.toLowerCase(), " ") + " Police Department",
          `/department/${department.agency_name}`,
          "/police_pic.jpg"
        );
      } catch (err: any) {
        setError(err.message);
      }

      
    };

    if (departmentId) fetchData();
  }, [departmentId]);

  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!departmentInstance) return <div className="p-6">Loading...</div>;

  const departmentName = capitalize(departmentInstance.agency_name.toLowerCase(), " ");

  return (
    <div>
      <Navbar />
      <div className="pt-20 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6 border-l-4 border-blue-600">
            <h1 className={`${lato.className} text-3xl font-bold text-gray-900 mb-2`}>
              {departmentName} Police Department
            </h1>
            <p className="text-blue-600">
              {capitalize(departmentInstance.location_name.toLowerCase(), " ")},{" "}
              {departmentInstance.state}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              ["Overall Score", departmentInstance.calc_overall_score],
              ["Police Funding Score", departmentInstance.calc_police_funding_score],
              ["Accountability Score", departmentInstance.calc_police_accountability_score],
              ["Total Population", departmentInstance.total_population.toLocaleString()],
            ].map(([label, value], idx) => (
              <div
                key={idx}
                className="bg-blue-600 rounded-lg shadow-sm p-6 text-white transform hover:scale-105 transition-all"
              >
                <div className="text-blue-100 mb-1">{label}</div>
                <div className="text-3xl font-semibold">{value}</div>
              </div>
            ))}
          </div>

          {/* Department Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:border-blue-400 transition-all hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Department Information</h2>
              <div className="space-y-4">
                <InfoRow label="Agency Type" value={capitalize(departmentInstance.agency_type.toLowerCase(), "-")} />
                <InfoRow label="ORI Identifier" value={departmentInstance.ori_identifier} />
                <InfoRow
                  label="Location"
                  value={`${departmentInstance.latitude}, ${departmentInstance.longitude}`}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:border-blue-400 transition-all hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Performance Metrics</h2>
              <div className="space-y-4">
                <InfoRow
                  label="Police Shootings (2021)"
                  value={departmentInstance.police_shootings_2021}
                />
                <InfoRow
                  label="Use of Force Reports"
                  value={departmentInstance.use_of_force_complaints_reported}
                />
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Department Location</h2>
            <Map
              latitude={parseFloat(departmentInstance.latitude)}
              longitude={parseFloat(departmentInstance.longitude)}
            />
          </div>

          {/* Related Info */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-6 text-blue-700">Related Information</h2>

            <Section title={`Recent Incidents in ${stateTranslation[departmentInstance.state]}`}>
              {relatedViolence.map((incident, index) => (
                <IncidentCard key={index} incident={incident} />
              ))}
            </Section>

            <Section title={`Related Legislation in ${stateTranslation[departmentInstance.state]}`}>
              {relatedLegislation.map((legislation, index) => (
                <LegislationCard key={index} bill={legislation} />
              ))}
            </Section>
          </div>

          <div className="text-center pb-8">
            <Link
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-md"
              href="/department"
            >
              <span className="mr-2">←</span>
              Back to Department List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-blue-900">{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h3 className="text-lg font-medium mb-4 text-blue-900">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">{children}</div>
    </>
  );
}
