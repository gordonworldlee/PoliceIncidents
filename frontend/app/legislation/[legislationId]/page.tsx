// import { obtainSingleBill } from "@/lib/fetch_legislative_data";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { DepartmentInstances } from "@/public/data/DepartmentData";
import { DepartmentCard } from "@/components/DepartmentCard";

const stateTranslation: {[key: string]: string} = {
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
  VT: "vermont"
}

interface LegislationInstancePageProps {
  params: Promise<{
    legislationId: string;
  }>;
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
    image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png",
  },
  {
    id: "incident2",
    city: "Austin",
    state: "TX",
    encounter_type: "Mental Health/Welfare Check",
    cause: "Taser",
    date: "2/15/25",
    agency: "Volusia County Sheriff's Office",
    image: "https://dallaspolice.net/PublishingImages/badge-dpd.png",
  },
  {
    id: "incident3",
    city: "Dallas",
    state: "TX",
    encounter_type: "Violent Crime",
    cause: "Aphyxsiation",
    date: "3/1/25",
    agency: "Douglas County Sheriff's Office",
    image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png",
  },
];

export default async function LegislationInstancePage({
  params,
}: LegislationInstancePageProps) {
  const { legislationId } = await params;
  const fetchBillData = async () => {
    const getBill = await fetch(`http://localhost:5001/api/legislation?id=${legislationId}`);
    if (!getBill.ok) {
      throw new Error("Can't fetch bill :(");
    }

    const billData = await getBill.json();
    return billData.legislation;
  }
  // const billData = await obtainSingleBill(parseInt(legislationId));
  const getBill = await fetchBillData();
  const billData = getBill[0];
  
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="flex items-center space-x-4">
          <img src={`/flags/${stateTranslation[billData.state]}.png`} alt={`flag of ${billData.state}`} className="w-16 h-16" />
          <h1 className="text-3xl font-bold">{billData.title}</h1>
        </div>
        <br />
        <p className="text-xl font-bold">
          <span className="text-red-500">{billData.state}</span> |{" "}
          <span className="text-green-500">
            {billData.session}{" "}
          </span>{" "}
          | <span className="text-blue-500">{billData.bill_number}</span>
        </p>
        <br />
        
        <div className="mb-6">
          <h2 className="text-xl font-bold underline mb-2">Description</h2>
          <p className="text-gray-700">{billData.description}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold underline mb-2">Bill Status</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Last Action:</span> {billData.last_action}
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
          <h2 className="text-xl font-bold underline mb-2">Session Information</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Session:</span> {billData.session}<br />
            <span className="font-semibold">Session Year:</span> {billData.session_year}
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold underline mb-2">Relevant Links</h2>
          <p>
            <a href={billData.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
              View on LegiScan
            </a>
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold underline mb-2">Relevant Instances of Violence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {incidents.map((incident) => (
              <Link
                key={incident.id}
                href={`/violence/${incident.id}`}
                className="block"
              >
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <img
                      width={64}
                      height={64}
                      src={incident.image}
                      alt={`${incident.agency} logo`}
                      className="w-16 h-16 mr-4"
                    />
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
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold underline mb-2">Relevant Departments</h2>
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mt-2 h-full">
            {Object.values(DepartmentInstances).map((department) => (
              <DepartmentCard key={department.agency_name} {...department} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
