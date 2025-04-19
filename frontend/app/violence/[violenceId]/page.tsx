import Link from "next/link";
import { FaNewspaper } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { Map } from "@/app/components/Map";
import { fetchApi } from "@/app/utils/apifetch";
import { DepartmentCard } from "@/components/DepartmentCard";
import LegislationCard from "@/components/LegislationCard";
import { Department, DepartmentInstances } from "@/public/data/DepartmentData";
import { Legislation } from "@/app/legislation/page";

interface ViolencePageProps {
  params: Promise<{
    violenceId: string;
  }>;
}

// interface ScorecardLinkProps {
//   agency_name: string;
//   department_image: string;
//   location_name: string;
//   state: string;
//   latitude: number;
//   longitude: number;
//   calc_police_violence_score: number;
//   police_shooting_avg: number;
//   calc_overall_score: number;
// }

const NewsLink = ({ url }: { url: string }) => (
  <Link href={url} target="_blank" rel="noopener noreferrer">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
      <FaNewspaper className="mr-2" />
      <span>Read News Article</span>
    </button>
  </Link>
);

// const ScorecardLink = ({
//   agency_name,
//   department_image,
//   location_name,
//   state,
//   latitude,
//   longitude,
//   calc_police_violence_score,
//   police_shooting_avg,
//   calc_overall_score,
// }: ScorecardLinkProps) => {
//   const link = `/department/${agency_name}`;

//   return (
//     <Link href={link}>
//       <div className="h-full p-6 bg-white border-2 transition-all text-center duration-300 hover:shadow-xl hover:translate-y-[-2px] rounded-lg shadow-lg flex flex-col items-center justify-center mt-2 max-w-xs mx-auto">
//         <h2 className="text-xl font-bold text-blue-600">
//           {agency_name.charAt(0).toUpperCase() + agency_name.slice(1)} Police Department Scorecard
//         </h2>
//         <div className="w-32 h-32 mb-4">
//           <img
//             src={department_image}
//             alt={`${agency_name} Police Department`}
//             width={200}
//             height={200}
//             className="w-full h-full object-contain"
//           />
//         </div>
//         <div className="text-left text-sm text-gray-600 space-y-2">
//           <p><strong>Agency Name:</strong> {agency_name.charAt(0).toUpperCase() + agency_name.slice(1)} Police Department</p>
//           <p><strong>Location:</strong> {location_name.charAt(0).toUpperCase() + location_name.slice(1)}</p>
//           <p><strong>State:</strong> {state.charAt(0).toUpperCase() + state.slice(1)}</p>
//           <p><strong>Coordinates:</strong> {latitude}, {longitude}</p>
//           <p><strong>Police Violence Score:</strong> {calc_police_violence_score}/100</p>
//           <p><strong>Police Shooting Average:</strong> {police_shooting_avg}</p>
//           <p><strong>Overall Score:</strong> {calc_overall_score}/100</p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// const LegislationCard = ({ bill }: { bill: any }) => (
//   <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-center items-center text-center space-y-4 min-h-[250px] w-full sm:w-[350px]">
//     <Link href={`/legislation/${bill.bill_id}`} className="w-full">
//       <h2 className="text-xl font-bold text-blue-600">{bill.title}</h2>
//     </Link>
//     <img
//       src="/texas-state-outline.png"
//       alt="Outline of Texas State"
//       className="w-24 h-24"
//     />
//     <div className="text-gray-700 space-y-1">
//       <p className="text-sm"><strong>State:</strong> {bill.state}</p>
//       <p className="text-sm"><strong>Bill Number:</strong> {bill.bill_number}</p>
//       <p className="text-sm"><strong>Date Filed:</strong> {bill.history[0].date}</p>
//       <p className="text-sm"><strong>First Sponsor:</strong> {bill.sponsors[0].name}</p>
//     </div>
//   </div>
// );

async function fetchViolenceById(violenceId: string) {
  const response = await fetchApi(`/incidents/${violenceId}`);
  const data = await response.json();
  return data;
}

// Add new fetch functions for connections
async function getDepartmentConnections(ori_identifier: string) {
  const response = await fetchApi(`/agencies?ori_identifier=${ori_identifier}`);
  if (!response.ok) {
    throw new Error("Failed to fetch departments");
  }
  const data = await response.json();
  return data.departments;
}

async function getLegislationConnections(state: string) {
  const response = await fetchApi(`/legislation?state=${state}`);
  if (!response.ok) {
    throw new Error("Failed to fetch legislation");
  }
  const data = await response.json();
  return data.legislation.slice(0, 3); // Get first 3 related bills
}

export default async function ViolenceInstancePage({
  params,
}: ViolencePageProps) {
  const { violenceId } = await params;
  const instance = await fetchViolenceById(violenceId);

  if (!instance) {
    return <div>Instance not found</div>;
  }

  let related_departments = await getDepartmentConnections(instance.ori_identifier);
  if (related_departments.length === 0) {
    related_departments = DepartmentInstances;
  }
  const related_legislation = await getLegislationConnections(instance.state);

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
                {related_departments.map((department: Department, index: number) => (
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
                {related_legislation.map((legislation: Legislation, index: number) => (
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
