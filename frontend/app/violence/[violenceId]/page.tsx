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

  // Fetch related data
  console.log(instance);
  let related_departments = await getDepartmentConnections(
    instance.ori_identifier,
  );
  if (related_departments.length === 0) {
    related_departments = DepartmentInstances;
  }
  const related_legislation = await getLegislationConnections(instance.state);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 m-0 overflow-x-hidden">
      <Navbar />
      <div className="flex-grow w-full max-w-full p-6 bg-white shadow-md rounded-lg min-h-full pt-20">
        <h1 className="text-3xl font-bold text-center mb-4">
          Violence Instance Details
        </h1>
        <img
          src={instance.image_url}
          alt={`${instance.agency_responsible} logo`}
          className="w-32 h-32 mb-6 mx-auto"
        />
        <div className="mt-4 text-left space-y-2">
          <div className="flex flex-row">
            <div className="w-1/2">
              <p>
                <strong>City:</strong> {instance.city}
              </p>
              <p>
                <strong>State:</strong> {instance.state}
              </p>
              <p>
                <strong>Address:</strong> {instance.address}
              </p>
              <p>
                <strong>ID:</strong> {instance.ori}
              </p>
              <p>
                <strong>Encounter Type:</strong> {instance.encounter_type}
              </p>
              <p>
                <strong>Agency Responsible:</strong>{" "}
                {instance.agency_responsible}
              </p>
              <p>
                <strong>Cause of Death:</strong> {instance.cause}
              </p>
              <p>
                <strong>Date:</strong> {instance.date}
              </p>
            </div>
            <div className="w-1/2">
              <Map latitude={30.26993} longitude={-97.74315} />
            </div>
          </div>
          <p>
            <strong>Description:</strong> {instance.description}
          </p>
          <NewsLink url={instance.news_link} />
          {/* <div className="mt-6">
            <ScorecardLink
              agency_name={departmentInfo.agency_name}
              department_image={departmentInfo.department_image}
              location_name={departmentInfo.location_name}
              state={departmentInfo.state}
              latitude={departmentInfo.latitude}
              longitude={departmentInfo.longitude}
              calc_police_violence_score={departmentInfo.calc_police_violence_score}
              police_shooting_avg={departmentInfo.police_shooting_avg}
              calc_overall_score={departmentInfo.calc_overall_score}
            />
          </div> */}
        </div>

        {/* Add connections sections */}
        <div className="mt-8">
          <h2 className="text-xl font-bold underline mb-4">
            Related Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related_departments.map(
              (department: Department, index: number) => (
                <Link
                  className="w-full"
                  key={index}
                  href={`/department/${department.agency_name}`}
                >
                  <DepartmentCard {...department} />
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold underline mb-4">
            Related Legislation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related_legislation.map(
              (legislation: Legislation, index: number) => (
                <LegislationCard key={index} bill={legislation} />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
