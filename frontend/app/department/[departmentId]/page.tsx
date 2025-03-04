import Link from "next/link";
import Navbar from "../../components/Navbar";
import { FaNewspaper } from "react-icons/fa";
import { obtainSingleBill } from "@/lib/fetch_legislative_data";
import { Map } from "@/app/components/Map";
import { DepartmentInstances} from "@/public/data/DepartmentData";

interface ViolenceInstance {
  id: string;
  city: string;
  state: string;
  encounter_type: string;
  cause: string;
  date: string;
  agency: string;
  image: string;
}

// This is a mock data structure. In a real application, you'd fetch this data from an API or database
const incidents: ViolenceInstance[] = [
  {
    id: "incident1",
    city: "Houston",
    state: "TX",
    encounter_type: "Domestic Disturbance",
    cause: "Gun",
    date: "1/31/25",
    agency: "Farmington Police Department",
    image: "/houstonPD.png",
  },
  {
    id: "incident2",
    city: "Austin",
    state: "TX",
    encounter_type: "Mental Health/Welfare Check",
    cause: "Taser",
    date: "2/15/25",
    agency: "Volusia County Sheriff's Office",
    image: "/austinPD.jpeg",
  },
  {
    id: "incident3",
    city: "Dallas",
    state: "TX",
    encounter_type: "Violent Crime",
    cause: "Aphyxsiation",
    date: "3/1/25",
    agency: "Douglas County Sheriff's Office",
    image:"/dallasPD.png",
  },
];

type DepartmentPageProps = {
  params: Promise<{ departmentId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

const RelatedIncidents = ({incident_id }: { incident_id: string }) => {
  const incident = incidents.find(inc => inc.id === incident_id);
  if (!incident) {
    return <div>Incident not found</div>
  }
  return (
    <Link
    key={incident.id}
    href={`/violence/${incident.id}`}
    className="block"
  >
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
          <div className="w-32 h-32 mb-4">
            <img
              src={incident.image}
              alt={`${incident.agency} logo`}
              className="w-full h-full object-contain"
            />
          </div>
        <h2 className="text-lg font-semibold text-blue-600">
          {incident.city}, {incident.state}
        </h2>
      </div>
      <p className="text-sm text-gray-600">
        <strong>Agency:</strong> {incident.agency}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Type:</strong> {incident.encounter_type}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Cause:</strong> {incident.cause}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Date:</strong> {incident.date}
      </p>
    </div>
  </Link>
  )
}

const RelatedLegislation = async ({bill_id}: {bill_id: string}) => {
  const billData = await obtainSingleBill(parseInt(bill_id));
  
  return (
    <Link href={`/legislation/${bill_id}`}>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-center space-y-4">        
        <img src="/texas-state-outline.png" alt="Outline of Texas State" className="w-24 h-24"/>
        <div className="text-gray-700 space-y-1">
          <p className="text-sm"><strong>State:</strong> {billData.state}</p>
          <p className="text-sm"><strong>Bill Number:</strong> {billData.bill_number}</p>
          <p className="text-sm"><strong>Date Filed:</strong> {billData.history[0].date}</p>
          <p className="text-sm"><strong>First Sponsor:</strong> {billData.sponsors[0].name}</p>
        </div>
      </div>
    </Link>
  )
}

const stateTranslation: {[key: string]: string} = {
  "TEXAS": "TX"
}

export default async function DepartmentPage({
  params,
  searchParams,
}: DepartmentPageProps) {
  const { departmentId } = await params;
  console.log(searchParams);

  const departmentInstance = DepartmentInstances[departmentId];
  const departmentName =
    departmentInstance.agency_name.charAt(0).toUpperCase() +
    departmentInstance.agency_name.slice(1).toLowerCase();
  const location =
    departmentInstance.location_name.charAt(0).toUpperCase() +
    departmentInstance.location_name.slice(1).toLowerCase();
  if (!departmentInstance) {
    return <div>Department not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center">
        <h1 className="my-8 text-center text-3xl font-bold">
          {departmentName} Police Department
        </h1>
        <div className="flex flex-row justify-center">
          <img className="w-48 h-48 rounded-lg" src={departmentInstance.department_image} alt="outline of Texas State" />
        </div>
        <div>
          <div className="text-left border-b-2 border-gray-300 rounded-lg shadow-md p-4 bg-white">
            <div className="flex flex-row justify-between">
              <div className="w-1/2">
                <p>
                  <strong>Agency Name:</strong> {departmentName}
                </p>
                <p>
                  <strong>Agency Type:</strong> {departmentInstance.agency_type}
                </p>
                <p>
                  <strong>Location:</strong> {location}
                </p>
                <p>
                  <strong>State:</strong> {departmentInstance.state}
                </p>
                <p>
                  <strong>ORI:</strong> {departmentInstance.ori}
                </p>
                <p>
                  <strong>Coordinates:</strong> {departmentInstance.latitude},{" "}
                  {departmentInstance.longitude}
                </p>
                <p>
                  <strong>Total Population:</strong>{" "}
                  {departmentInstance.total_population.toLocaleString()}
                </p>
                <p>
                  <strong>Police Funding Score:</strong>{" "}
                  {departmentInstance.calc_police_funding_score}/100
                </p>
                <p>
                  <strong>Use of Force Reported:</strong>{" "}
                  {departmentInstance.use_of_force_reported}
                </p>
                <p>
                  <strong>Police Violence Score:</strong>{" "}
                  {departmentInstance.calc_police_violence_score}/100
                </p>
                <p>
                  <strong>Police Shooting Average:</strong>{" "}
                  {departmentInstance.police_shooting_avg}
                </p>
                <p>
                  <strong>Police Accountability Score:</strong>{" "}
                  {departmentInstance.calc_police_accountability_score}/100
                </p>
                <p>
                  <strong>Overall Score:</strong> {departmentInstance.overall_score}/100
                </p>
              </div>
              <div className="mr-4 w-1/2">
                  <Map latitude={departmentInstance.latitude} longitude={departmentInstance.longitude}/>
              </div>
            </div>
            <div>
            </div>
            <div>
              <Link
                className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:shadow-lg"
                href={departmentInstance.dept_website}
              >
                <FaNewspaper className="mr-2 mb-1 inline-block" />
                Department Website
              </Link>
            </div>
            <p className="mt-4 text-xl font-bold underline">View Incidents in {stateTranslation[departmentInstance.state]}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RelatedIncidents incident_id={departmentInstance.incident_id} />
              {Object.values(DepartmentInstances)
                .filter(dept => 
                  dept.agency_name !== departmentInstance.agency_name && 
                  dept.state === departmentInstance.state
                )
                .slice(0, 1)
                .map(dept => (
                  <RelatedIncidents key={dept.ori} incident_id={dept.incident_id} />
                ))
              }
            </div>
            <p className="mt-4 text-xl font-bold underline">View Legislation from {stateTranslation[departmentInstance.state]}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RelatedLegislation bill_id="1891028" />
              <RelatedLegislation bill_id="1890795" />
            </div>

          </div>
          <div className="mt-6 text-center">
            <Link className="text-blue-500 underline" href="/department">
              Back to Department List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
