import Link from "next/link";
import { FaNewspaper } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { obtainBillList, obtainSingleBill } from "@/lib/fetch_legislative_data";

interface ViolenceInstance {
  image: string;
  id: string;
  city: string;
  state: string;
  address: string;
  ori: string;
  encounter_type: string;
  agency_responsible: string;
  cause: string;
  date: string;
  description: string;
  news: string;
}

interface ViolencePageProps {
  params: Promise<{
    violenceId: string;
  }>;
}

interface ScorecardLinkProps {
  agency_name: string;
  department_image: string;
  location_name: string;
  state: string;
  latitude: number;
  longitude: number;
  calc_police_violence_score: number;
  police_shooting_avg: number;
  calc_overall_score: number;
}


const NewsLink = ({ url }: { url: string }) => (
  <Link href={url} target="_blank" rel="noopener noreferrer">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
      <FaNewspaper className="mr-2" />
      <span>Read News Article</span>
    </button>
  </Link>
);

const ScorecardLink = ({
  agency_name,
  department_image,
  location_name,
  state,
  latitude,
  longitude,
  calc_police_violence_score,
  police_shooting_avg,
  calc_overall_score,
}: ScorecardLinkProps) => {
  const link = `/department/${agency_name.toLowerCase()}`;
  
  return (
    <Link href={link}>
      <div className="h-full p-6 bg-white border-2 transition-all text-center duration-300 hover:shadow-xl hover:translate-y-[-2px] rounded-lg shadow-lg flex flex-col items-center justify-center mt-2 max-w-xs mx-auto">
        <h2 className="text-xl font-bold text-blue-600">
          {agency_name.charAt(0).toUpperCase() + agency_name.slice(1)} Police Department Scorecard
        </h2>
        <div className="w-32 h-32 mb-4">
          <img
            src={department_image}
            alt={`${agency_name} Police Department`}
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-left text-sm text-gray-600 space-y-2">
          <p><strong>Agency Name:</strong> {agency_name.charAt(0).toUpperCase() + agency_name.slice(1)} Police Department</p>
          <p><strong>Location:</strong> {location_name.charAt(0).toUpperCase() + location_name.slice(1)}</p>
          <p><strong>State:</strong> {state.charAt(0).toUpperCase() + state.slice(1)}</p>
          <p><strong>Coordinates:</strong> {latitude}, {longitude}</p>
          <p><strong>Police Violence Score:</strong> {calc_police_violence_score}/100</p>
          <p><strong>Police Shooting Average:</strong> {police_shooting_avg}</p>
          <p><strong>Overall Score:</strong> {calc_overall_score}/100</p>
        </div>
      </div>
    </Link>
  );
};

const LegislationCard = ({ bill }: { bill: any }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-center items-center text-center space-y-4 min-h-[250px] w-full sm:w-[350px]">
    <Link href={`/legislation/${bill.bill_id}`} className="w-full">
      <h2 className="text-xl font-bold text-blue-600">{bill.title}</h2>
    </Link>
    <img
      src="/texas-state-outline.png"
      alt="Outline of Texas State"
      className="w-24 h-24"
    />
    <div className="text-gray-700 space-y-1">
      <p className="text-sm"><strong>State:</strong> {bill.state}</p>
      <p className="text-sm"><strong>Bill Number:</strong> {bill.bill_number}</p>
      <p className="text-sm"><strong>Date Filed:</strong> {bill.history[0].date}</p>
      <p className="text-sm"><strong>First Sponsor:</strong> {bill.sponsors[0].name}</p>
    </div>
  </div>
);

export default async function ViolenceInstancePage({
  params,
}: ViolencePageProps) {
  const { violenceId } = await params;

  // Mock data for violence instances (use actual API data here)
  const violenceInstances: Record<string, ViolenceInstance> = {
    incident1: {
      image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png",
      id: "incident1",
      city: "Houston",
      state: "TX",
      address: "300 Buffalo Branch Rd",
      ori: "KYKSP2500",
      encounter_type: "Domestic Disturbance",
      agency_responsible: "Houston Police Department",
      cause: "Gun",
      date: "1/31/25",
      description: "Officers investigating a separate case on West Broadway were diverted to a reported shooting near the MTS trolley platform. According to police, Officer Daniel Gold, a two-year veteran of the San Diego Police Department assigned to Central Division, encountered Wilson near Kettner Boulevard and the Santa Fe Depot. Officer Gold shot and killed the teen.",
      news: "https://vtdigger.org/2025/01/24/federal-prosecutors-file-charges-in-probe-of-fatal-shooting-of-border-patrol-agent-in-vermont/",
    },
    incident2: {
      image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png",
      id: "incident2",
      city: "Austin",
      state: "TX",
      address: "1203 Main Blvd",
      ori: "AUSTIN123",
      encounter_type: "Suspicious Activity",
      agency_responsible: "Austin Police Department",
      cause: "Unknown",
      date: "2/02/25",
      description: "Atchison Police Department responded to a call about a person with a gun and a second call of a subject breaking into an apartment. As officers arrived at 508 N 9th St. in Atchison, an officer exited his vehicle and shots were fired at him, striking his police vehicle multiple times. The officer was not struck. The man, identified as Bryson McCray, 36, of St. Joseph, Mo., then fled back into a residence. Preliminary information indicates that at around 2:30 a.m., an attempt was made to rescue the female hostage. During the rescue attempt, McCray and the hostage were separated momentarily, and a KHP trooper fired at McCray striking him.",
      news: "https://www.fox8live.com/2025/01/18/father-kills-wife-shoots-3-children-before-being-killed-by-jpso-deputies-river-ridge/",
    },
    incident3: {
      image: "https://dallaspolice.net/PublishingImages/badge-dpd.png",
      id: "incident3",
      city: "Dallas",
      state: "TX",
      address: "450 Elm St",
      ori: "DALLSP1234",
      encounter_type: "Traffic Stop",
      agency_responsible: "Dallas Police Department",
      cause: "Traffic Violations",
      date: "2/01/25",
      description: "Deputies shot and killed a man who had allegedly killed his father, after a standoff following a welfare check.",
      news: "https://www.fox10phoenix.com/news/phoenix-police-scene-officer-involved-shooting-laveen",
    },
  };

  const instance = violenceInstances[violenceId];

  // Fetching legislation data for all violence instances
  const bill_data = await Promise.all(
    (await obtainBillList()).map((bill_id) => obtainSingleBill(bill_id))
  );

  if (!instance) {
    return <div>Instance not found</div>;
  }

  const departmentDetails: Record<string, ScorecardLinkProps> = {
    "Houston Police Department": {
      agency_name: "Houston",
      location_name: "Houston",
      state: "Texas",
      latitude: 29.7604,
      longitude: -95.3698,
      calc_police_violence_score: 42,
      police_shooting_avg: 3.8,
      calc_overall_score: 47,
      department_image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png",
    },
    "Austin Police Department": {
      agency_name: "Austin",
      location_name: "Austin",
      state: "Texas",
      latitude: 30.26993,
      longitude: -97.74315,
      calc_police_violence_score: 40,
      police_shooting_avg: 3.5,
      calc_overall_score: 32,
      department_image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png",
    },
    "Dallas Police Department": {
      agency_name: "Dallas",
      location_name: "Dallas",
      state: "Texas",
      latitude: 32.76778,
      longitude: -96.79468,
      calc_police_violence_score: 48,
      police_shooting_avg: 4.3,
      calc_overall_score: 46,
      department_image: "https://dallaspolice.net/PublishingImages/badge-dpd.png",
    },
  };

  const departmentInfo = departmentDetails[instance.agency_responsible];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 m-0 overflow-x-hidden">
      <Navbar />
      <div className="flex-grow w-full max-w-full p-6 bg-white shadow-md rounded-lg min-h-full">
        <h1 className="text-3xl font-bold text-center mb-4">Violence Instance Details</h1>
        <img
          src={instance.image}
          alt={`${instance.agency_responsible} logo`}
          className="w-32 h-32 mb-6 mx-auto"
        />
        <div className="mt-4 text-left space-y-2">
          <p><strong>City:</strong> {instance.city}</p>
          <p><strong>State:</strong> {instance.state}</p>
          <p><strong>Address:</strong> {instance.address}</p>
          <p><strong>ID:</strong> {instance.ori}</p>
          <p><strong>Encounter Type:</strong> {instance.encounter_type}</p>
          <p><strong>Agency Responsible:</strong> {instance.agency_responsible}</p>
          <p><strong>Cause of Death:</strong> {instance.cause}</p>
          <p><strong>Date:</strong> {instance.date}</p>
          <p><strong>Description:</strong> {instance.description}</p>
          <NewsLink url={instance.news} />
          <div className="mt-6">
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
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Related Legislation</h2>
            <div className="flex gap-4 mt-4 justify-center">
              {bill_data.map((bill) => (
                <LegislationCard key={bill.bill_id} bill={bill} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link
            className="text-blue-500 hover:text-blue-700 underline"
            href="/violence"
          >
            Back to Violence Model Page
          </Link>
        </div>
      </div>
    </div>
  );
}
