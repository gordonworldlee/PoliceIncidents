// import { obtainSingleBill } from "@/lib/fetch_legislative_data";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Department, DepartmentInstances } from "@/public/data/DepartmentData";
import { DepartmentCard } from "@/components/DepartmentCard";
import { fetchApi } from "@/app/utils/apifetch";
import IncidentCard from "@/components/ViolenceCard";
import { Violence } from "@/types/important";

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

interface LegislationInstancePageProps {
  params: Promise<{ legislationId: string }>;
}

// const chamber_translation = {
//   H: "House",
//   S: "Senate",
// };

// const party_lookup = {
//   D: "Democrat",
//   R: "Republican",
//   I: "Independent",
//   L: "Libertarian",
//   G: "Green",
//   N: "Nonpartisan",
// };

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

// This is a mock data structure. In a real application, you'd fetch this data from an API or database
// const incidents: ViolenceInstance[] = [
//   {
//     id: "incident1",
//     city: "Houston",
//     state: "TX",
//     encounter_type: "Domestic Disturbance",
//     cause: "Gun",
//     date: "1/31/25",
//     agency: "Farmington Police Department",
//     image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png",
//   },
//   {
//     id: "incident2",
//     city: "Austin",
//     state: "TX",
//     encounter_type: "Mental Health/Welfare Check",
//     cause: "Taser",
//     date: "2/15/25",
//     agency: "Volusia County Sheriff's Office",
//     image: "https://dallaspolice.net/PublishingImages/badge-dpd.png",
//   },
//   {
//     id: "incident3",
//     city: "Dallas",
//     state: "TX",
//     encounter_type: "Violent Crime",
//     cause: "Aphyxsiation",
//     date: "3/1/25",
//     agency: "Douglas County Sheriff's Office",
//     image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png",
//   },
// ];

export default async function LegislationInstancePage({
  params,
}: LegislationInstancePageProps) {
  const { legislationId } = await params;
  const fetchBillData = async () => {
    const getBill = await fetchApi(`/legislation?id=${legislationId}`);
    if (!getBill.ok) {
      throw new Error("Can't fetch bill :(");
    }

    const billData = await getBill.json();
    return billData.legislation;
  };

  const fetchDepartmentConnections = async (state: string) => {
    const response = await fetchApi(`/agencies?state=${state}`);
    if (!response.ok) {
      throw new Error("Can't fetch departments :(");
    }

    const departments = await response.json();
    return departments.departments.slice(0, 3);
  };

  const getViolenceConnections = async (state: string) => {
    const response = await fetchApi(`/incidents?state=${state}`);
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    return data.incidents.slice(0, 3);
  };
  // const billData = await obtainSingleBill(parseInt(legislationId));
  const getBill = await fetchBillData();
  const billData = getBill[0];
  let departments_connections: Department[] = await fetchDepartmentConnections(
    billData.state,
  );
  if (departments_connections.length === 0) {
    console.log(DepartmentInstances);
    departments_connections = DepartmentInstances;
  }
  const violence_connections = await getViolenceConnections(billData.state);
  return (
    <div>
      <Navbar />
      <div className="p-8 pt-20">
        <div className="flex items-center space-x-4">
          <img
            src={`/flags/${stateTranslation[billData.state]}.png`}
            alt={`flag of ${billData.state}`}
            className="w-16 h-16"
          />
          <h1 className="text-3xl font-bold">{billData.title}</h1>
        </div>
        <br />
        <p className="text-xl font-bold">
          <span className="text-red-500">{billData.state}</span> |{" "}
          <span className="text-green-500">{billData.session} </span> |{" "}
          <span className="text-blue-500">{billData.bill_number}</span>
        </p>
        <br />

        <div className="mb-6">
          <h2 className="text-xl font-bold underline mb-2">Description</h2>
          <p className="text-gray-700">{billData.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold underline mb-2">Bill Status</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Last Action:</span>{" "}
            {billData.last_action}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold underline mb-2">Sponsor(s)</h2>
          <p className="text-gray-700">{billData.sponsors}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold underline mb-2">Subject Areas</h2>
          <p className="text-gray-700">{billData.subjects}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold underline mb-2">
            Session Information
          </h2>
          <p className="text-gray-700">
            <span className="font-semibold">Session:</span> {billData.session}
            <br />
            <span className="font-semibold">Session Year:</span>{" "}
            {billData.session_year}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold underline mb-2">Relevant Links</h2>
          <p>
            <a
              href={billData.url}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on LegiScan
            </a>
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold underline mb-2">
            Relevant Instances of Violence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {violence_connections.map((incident: Violence, index: number) => (
              <IncidentCard key={index} incident={incident} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold underline mb-2">
            Relevant Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departments_connections.map(
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
      </div>
    </div>
  );
}
