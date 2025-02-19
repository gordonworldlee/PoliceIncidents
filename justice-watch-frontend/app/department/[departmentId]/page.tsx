import Link from "next/link";
import Navbar from "../../components/Navbar";
import { FaNewspaper, FaClipboardList } from "react-icons/fa";

interface DetailedDepartmentInstance {
  agency_name: string;
  agency_type: string;
  location_name: string;
  state: string;
  ori: string;
  latitude: number;
  longtitude: number;
  total_population: number;
  calc_police_funding_score: number;
  use_of_force_reported: number;
  calc_police_violence_score: number;
  police_shooting_avg: number;
  calc_police_accountability_score: number;
  overall_score: number;
  incident_id: string;
}

type DepartmentPageProps = {
  params: Promise<{ departmentId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DepartmentPage({
  params,
  searchParams,
}: DepartmentPageProps) {
  const { departmentId } = await params;
  console.log(searchParams);
  const departmentInstances: Record<string, DetailedDepartmentInstance> = {
    dallas: {
      agency_name: "dallas",
      agency_type: "Police Department",
      location_name: "dallas",
      state: "TEXAS",
      ori: "TXDPD0000",
      latitude: 32.76778,
      longtitude: -96.79468,
      total_population: 1278608,
      calc_police_funding_score: 38,
      use_of_force_reported: 268,
      calc_police_violence_score: 48,
      police_shooting_avg: 4.3,
      calc_police_accountability_score: 49,
      overall_score: 46,
      incident_id: "incident3",
    },
    houston: {
      agency_name: "houston",
      agency_type: "Police Department",
      location_name: "houston",
      state: "TEXAS",
      ori: "TXHPD0000",
      latitude: 29.96826,
      longtitude: -95.36137,
      total_population: 2297580,
      calc_police_funding_score: 52,
      use_of_force_reported: 229,
      calc_police_violence_score: 42,
      police_shooting_avg: 3.2,
      calc_police_accountability_score: 45,
      overall_score: 47,
      incident_id: "incident1",
    },
    austin: {
      agency_name: "austin",
      agency_type: "Police Department",
      location_name: "austin",
      state: "TEXAS",
      ori: "TX2270100",
      latitude: 30.26993,
      longtitude: -97.74315,
      total_population: 943059,
      calc_police_funding_score: 41,
      use_of_force_reported: 301,
      calc_police_violence_score: 40,
      police_shooting_avg: 3.5,
      calc_police_accountability_score: 4,
      overall_score: 32,
      incident_id: "incident2",
    },
  };

  const departmentInstance = departmentInstances[departmentId];
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
      <div className="min-h-screen flex flex-col justify-center bg-gray-100">
        <h1 className="mb-8 text-center text-3xl font-bold">
          {departmentName} Police Department
        </h1>
        <div>
          <div className="text-left border-b-2 border-gray-300 rounded-lg shadow-md p-4 bg-white">
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
              {departmentInstance.longtitude}
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
              <strong>Overall Score:</strong> {departmentInstance.overall_score}
              /100
            </p>
            <div>
              <Link
                className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:shadow-lg"
                href="/legislation"
              >
                <FaClipboardList className="mr-2 mb-1 inline-block" />
                View Legislation
              </Link>
            </div>
            <div>
              <Link
                className="inline-block mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:shadow-lg"
                href={`/violence/${departmentInstance.incident_id}`}
              >
                <FaNewspaper className="mr-2 mb-1 inline-block" />
                View Incidents
              </Link>
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
