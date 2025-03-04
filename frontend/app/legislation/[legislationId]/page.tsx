import { obtainSingleBill } from "@/lib/fetch_legislative_data";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { DepartmentInstances } from "@/public/data/DepartmentData";
import { DepartmentCard } from "@/components/DepartmentCard";

interface LegislationInstancePageProps {
  params: Promise<{
    legislationId: string;
  }>;
}

const chamber_translation = {
  H: "House",
  S: "Senate",
};

const party_lookup = {
  D: "Democrat",
  R: "Republican",
  I: "Independent",
  L: "Libertarian",
  G: "Green",
  N: "Nonpartisan",
};

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
  const billData = await obtainSingleBill(parseInt(legislationId));
  return (
    <div>
      <Navbar />
      <div className="p-8">
      <div className="flex items-center space-x-4">
    <img
      src="/texas-state-outline.png"
      alt="Outline of Texas State"
      className="w-16 h-16"
    />
    <h1 className="text-3xl font-bold">{billData.title}</h1>
  </div>
        <br />
        <p className="text-xl font-bold">
          <span className="text-red-500"> {billData.state}</span> |{" "}
          <span className="text-green-500">
            {billData.session.session_name}{" "}
          </span>{" "}
          | <span className="text-blue-500">{billData.bill_number}</span>
        </p>
        <br />
        <h2 className="text-xl font-bold underline">Bill History</h2>
        <ol>
          {billData.history.map((item: any, index: number) => (
            <li key={index}>
              This bill was <span className="font-bold">{item.action}</span> in
              the{" "}
              <span className="font-bold">
                {chamber_translation[item.chamber as "H" | "S"]}
              </span>{" "}
              on <span className="font-bold">{item.date}</span>.
            </li>
          ))}
        </ol>
        <br />
        <h2 className="text-xl font-bold underline">Sponsor(s)</h2>
        <ol>
          {billData.sponsors.map((item: any, index: number) => (
            <li key={index}>
              <span className="font-bold">{item.name}</span> (
              <span className="font-bold">
                {party_lookup[item.party as "D" | "R" | "I" | "L" | "G" | "N"]}
              </span>
              ) from district <span className="font-bold">{item.district}</span>
            </li>
          ))}
        </ol>
        <br />
        <h2 className="text-xl font-bold underline">Relevant Links</h2>
        <p>
          <a href={billData.state_link} className="text-blue-500 underline">
            {billData.state_link}
          </a>
        </p>

        <br />
        <h2 className="text-xl font-bold underline">Relevant Instances of Violence</h2>
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

          <br />
          <h2 className="text-xl font-bold underline">Relevant Departments</h2>

          <div className="flex flex-col md:flex-row gap-4  mt-2 h-full">
            {Object.values(DepartmentInstances).map((department) => {
              return <DepartmentCard key={department.agency_name} {...department} />;
            })}
            ;
          </div>
      </div>
    </div>
  );
}
