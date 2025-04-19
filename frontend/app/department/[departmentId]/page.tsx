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

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type DepartmentPageProps = {
  params: Promise<{ departmentId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

const stateTranslation: { [key: string]: string } = {
  TEXAS: "TX",
};

export default async function DepartmentPage({
  params,
  // ,
  // searchParams,
}: DepartmentPageProps) {
  const { departmentId } = await params;

  const getDepartmentData = async () => {
    const response = await fetchApi(`/agencies?agency_name=${departmentId}`);
    console.log(departmentId);
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    // console.log(data);
    return data.departments;
  };

  const getViolenceConnections = async (state: string) => {
    const response = await fetchApi(`/incidents?state=${state}`);
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    return data.incidents.slice(0, 3);
  };

  const getLegislationConnections = async (state: string) => {
    const response = await fetchApi(`/legislation?state=${state}`);
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    return data.legislation.slice(0, 3);
  };

  let departmentInstance = await getDepartmentData();
  departmentInstance = departmentInstance[0];

  const related_legislation = await getLegislationConnections(
    departmentInstance.state,
  );

  const related_violence: Violence[] = await getViolenceConnections(
    departmentInstance.state,
  );

  const departmentName = capitalize(
    departmentInstance.agency_name.toLowerCase(),
    " ",
  );
  if (!departmentInstance) {
    return <div>Department not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="pt-20 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Department Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6 border-l-4 border-blue-600">
            <h1 className={`${lato.className} text-3xl font-bold text-gray-900 mb-2`}>
              {departmentName} Police Department
            </h1>
            <p className="text-blue-600">
              {capitalize(departmentInstance.location_name.toLowerCase(), " ")}, {departmentInstance.state}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-600 rounded-lg shadow-sm p-6 text-white transform hover:scale-105 transition-all">
              <div className="text-blue-100 mb-1">Overall Score</div>
              <div className="text-3xl font-semibold">{departmentInstance.calc_overall_score}</div>
            </div>
            <div className="bg-blue-600 rounded-lg shadow-sm p-6 text-white transform hover:scale-105 transition-all">
              <div className="text-blue-100 mb-1">Police Funding Score</div>
              <div className="text-3xl font-semibold">{departmentInstance.calc_police_funding_score}</div>
            </div>
            <div className="bg-blue-600 rounded-lg shadow-sm p-6 text-white transform hover:scale-105 transition-all">
              <div className="text-blue-100 mb-1">Accountability Score</div>
              <div className="text-3xl font-semibold">{departmentInstance.calc_police_accountability_score}</div>
            </div>
            <div className="bg-blue-600 rounded-lg shadow-sm p-6 text-white transform hover:scale-105 transition-all">
              <div className="text-blue-100 mb-1">Total Population</div>
              <div className="text-3xl font-semibold">{departmentInstance.total_population.toLocaleString()}</div>
            </div>
          </div>

          {/* Department Info and Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Department Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:border-blue-400 transition-all hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Department Information</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Agency Type</span>
                  <span className="font-medium text-blue-900">{capitalize(departmentInstance.agency_type.toLowerCase(), "-")}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">ORI Identifier</span>
                  <span className="font-medium text-blue-900">{departmentInstance.ori_identifier}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-blue-900">{departmentInstance.latitude}, {departmentInstance.longitude}</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:border-blue-400 transition-all hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Performance Metrics</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Police Shootings (2021)</span>
                  <span className="font-medium text-blue-900">{departmentInstance.police_shootings_2021}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Use of Force Reports</span>
                  <span className="font-medium text-blue-900">{departmentInstance.use_of_force_complaints_reported}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Department Location</h2>
            <Map
              latitude={parseFloat(departmentInstance.latitude)}
              longitude={parseFloat(departmentInstance.longitude)}
            />
          </div>

          {/* Related Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-6 text-blue-700">Related Information</h2>
            
            <h3 className="text-lg font-medium mb-4 text-blue-900">Recent Incidents in {stateTranslation[departmentInstance.state]}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {related_violence.map((incident, index) => (
                <IncidentCard key={index} incident={incident} />
              ))}
            </div>

            <h3 className="text-lg font-medium mb-4 text-blue-900">Related Legislation in {stateTranslation[departmentInstance.state]}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related_legislation.map((legislation: Legislation, index: number) => (
                <LegislationCard key={index} bill={legislation} />
              ))}
            </div>
          </div>

          {/* Back Link */}
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
