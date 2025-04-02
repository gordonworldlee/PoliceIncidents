import Link from "next/link";
import Navbar from "../../components/Navbar";
// import { FaNewspaper } from "react-icons/fa";
// import { obtainSingleBill } from "@/lib/fetch_legislative_data";
import { Map } from "@/app/components/Map";
// import { DepartmentInstances} from "@/public/data/DepartmentData";
import { capitalize } from "@/components/DepartmentCard";
import { Lato } from "next/font/google";
import { Violence } from "@/types/important";
import IncidentCard from "@/components/ViolenceCard";
import { fetchApi } from "@/app/utils/apifetch";
// import LegislationCard from "@/components/LegislationCard";
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// interface ViolenceInstance {
//   id: string;
//   city: string;
//   state: string;
//   encounter_type: string;
//   cause: string;
//   date: string;
//   agency: string;
//   image: string;
// }

// // This is a mock data structure. In a real application, you'd fetch this data from an API or database
// const incidents: ViolenceInstance[] = [
//   {
//     id: "incident1",
//     city: "Houston",
//     state: "TX",
//     encounter_type: "Domestic Disturbance",
//     cause: "Gun",
//     date: "1/31/25",
//     agency: "Farmington Police Department",
//     image: "/houstonPD.png",
//   },
//   {
//     id: "incident2",
//     city: "Austin",
//     state: "TX",
//     encounter_type: "Mental Health/Welfare Check",
//     cause: "Taser",
//     date: "2/15/25",
//     agency: "Volusia County Sheriff's Office",
//     image: "/austinPD.jpeg",
//   },
//   {
//     id: "incident3",
//     city: "Dallas",
//     state: "TX",
//     encounter_type: "Violent Crime",
//     cause: "Aphyxsiation",
//     date: "3/1/25",
//     agency: "Douglas County Sheriff's Office",
//     image: "/dallasPD.png",
//   },
// ];

type DepartmentPageProps = {
  params: Promise<{ departmentId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// const RelatedIncidents = ({ incident_id }: { incident_id: string }) => {
//   const incident = incidents.find(inc => inc.id === incident_id);
//   if (!incident) {
//     return <div>Incident not found</div>
//   }
//   return (
//     <Link
//       key={incident.id}
//       href={`/violence/${incident.id}`}
//       className="block"
//     >
//       <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//         <div className="flex items-center mb-4">
//           <div className="w-32 h-32 mb-4">
//             <img
//               src={incident.image}
//               alt={`${incident.agency} logo`}
//               className="w-full h-full object-contain"
//             />
//           </div>
//           <h2 className="text-lg font-semibold text-blue-600">
//             {incident.city}, {incident.state}
//           </h2>
//         </div>
//         <p className="text-sm text-gray-600">
//           <strong>Agency:</strong> {incident.agency}
//         </p>
//         <p className="text-sm text-gray-600">
//           <strong>Type:</strong> {incident.encounter_type}
//         </p>
//         <p className="text-sm text-gray-600">
//           <strong>Cause:</strong> {incident.cause}
//         </p>
//         <p className="text-sm text-gray-600">
//           <strong>Date:</strong> {incident.date}
//         </p>
//       </div>
//     </Link>
//   )
// }

// const RelatedLegislation = async ({bill_id}: {bill_id: string}) => {
//   const billData = await obtainSingleBill(parseInt(bill_id));

//   return (
//     <Link href={`/legislation/${bill_id}`}>
//       <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-center space-y-4">
//         <img src="/texas-state-outline.png" alt="Outline of Texas State" className="w-24 h-24"/>
//         <div className="text-gray-700 space-y-1">
//           <p className="text-sm"><strong>State:</strong> {billData.state}</p>
//           <p className="text-sm"><strong>Bill Number:</strong> {billData.bill_number}</p>
//           <p className="text-sm"><strong>Date Filed:</strong> {billData.history[0].date}</p>
//           <p className="text-sm"><strong>First Sponsor:</strong> {billData.sponsors[0].name}</p>
//         </div>
//       </div>
//     </Link>
//   )
// }

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
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    // console.log(data);
    return data.departments;
  };

  const getViolenceConnections = async (ori_identifier: string) => {
    const response = await fetchApi(
      `/incidents?ori_identifier=${ori_identifier}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    return data.incidents;
  };

  let departmentInstance = await getDepartmentData();
  departmentInstance = departmentInstance[0];
  const related_violence: Violence[] = await getViolenceConnections(
    departmentInstance.ori_identifier,
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
      <div className="pt-20 min-h-screen flex flex-col justify-center bg-white">
        <h1
          className={`${lato.className} text-[#D63C68] my-8 text-center text-3xl font-bold`}
        >
          {departmentName} Police Department
        </h1>
        <div className="rounded-lg mx-4 border p-4 my-4 shadow-lg">
          <header className="border-b border-gray-300 font-bold text-xl">
            Department Information
          </header>
          <div className="flex flex-col">
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-4">
              <section className="font-bold text-gray-600">
                Agency Name:{" "}
              </section>{" "}
              <span>
                {capitalize(departmentInstance.agency_name.toLowerCase(), " ")}
              </span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Agency Type:{" "}
              </section>{" "}
              <span>
                {capitalize(departmentInstance.agency_type.toLowerCase(), "-")}
              </span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">Location: </section>{" "}
              <span>
                {capitalize(
                  departmentInstance.location_name.toLowerCase(),
                  " ",
                )}
              </span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">State: </section>{" "}
              <span>
                {capitalize(departmentInstance.state.toUpperCase(), " ")}
              </span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">ORI: </section>{" "}
              <span>{departmentInstance.ori_identifier}</span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Coordinates:{" "}
              </section>{" "}
              <span>
                {departmentInstance.latitude}, {departmentInstance.longitude}
              </span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Total Population:{" "}
              </section>{" "}
              <span>{departmentInstance.total_population}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg mx-4 border p-4 my-4 shadow-lg">
          <header className="border-b border-gray-300 font-bold text-xl">
            Performance Metric
          </header>
          <div className="flex flex-col">
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-4">
              <section className="font-bold text-gray-600">
                Overall Score:{" "}
              </section>{" "}
              <span>{departmentInstance.calc_overall_score}</span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Police Funding Score:{" "}
              </section>{" "}
              <span>{departmentInstance.calc_police_funding_score}</span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Police Accountability Score:{" "}
              </section>{" "}
              <span>{departmentInstance.calc_police_accountability_score}</span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Police Shooting Average:{" "}
              </section>{" "}
              <span>{departmentInstance.police_shootings_2021}</span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Use of Force Reported:{" "}
              </section>{" "}
              <span>{departmentInstance.use_of_force_complaints_reported}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg mx-4 border p-4 my-4 shadow-lg">
          <header className="border-b mb-4 border-gray-300 font-bold text-xl">
            Department Location:
          </header>
          <Map
            latitude={parseFloat(departmentInstance.latitude)}
            longitude={parseFloat(departmentInstance.longitude)}
          />
        </div>

        <div className="text-left border-b-2 border-gray-300 rounded-lg shadow-md p-4 bg-white">
          <p className="mt-4 text-xl font-bold underline">
            View Incidents in {stateTranslation[departmentInstance.state]}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related_violence.map((incident, index) => (
              <IncidentCard key={index} incident={incident} />
            ))}
          </div>
          <p className="mt-4 text-xl font-bold underline">
            View Legislation from {stateTranslation[departmentInstance.state]}
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link className="text-blue-500 underline" href="/department">
            Back to Department List
          </Link>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <RelatedLegislation bill_id="1891028" />
  <RelatedLegislation bill_id="1890795" />
</div> */
}
