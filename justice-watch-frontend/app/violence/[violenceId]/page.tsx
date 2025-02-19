import Link from "next/link";
import { FaNewspaper, FaClipboardList } from "react-icons/fa";
import Navbar from "../../components/Navbar";

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

const NewsLink = ({ url }: { url: string }) => (
  <Link href={url} target="_blank" rel="noopener noreferrer">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
      <FaNewspaper className="mr-2" />
      <span>Read News Article</span>
    </button>
  </Link>
);

const ScorecardLink = ({ city }: { city: string }) => (
  <Link href={`/department/${city.toLowerCase()}`} passHref>
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2">
      <FaClipboardList className="mr-2" />
      <span>View Police Scorecard</span>
    </button>
  </Link>
);

const LegiLink = ({ city }: { city: string }) => (
  <Link href={`/legislation/${city.toLowerCase()}`} passHref>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2">
      <FaClipboardList className="mr-2" />
      <span>View Related Legislation</span>
    </button>
  </Link>
);

export default async function ViolenceInstancePage({
  params,
}: ViolencePageProps) {
  const { violenceId } = await params;

  // This is a mock data structure. In a real application, you'd fetch this data from an API or database
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
      description:
        "Officers investigating a separate case on West Broadway were diverted to a reported shooting near the MTS trolley platform. According to police, Officer Daniel Gold, a two-year veteran of the San Diego Police Department assigned to Central Division, encountered Wilson near Kettner Boulevard and the Santa Fe Depot. Officer Gold shot and killed the teen.",
      news: "https://vtdigger.org/2025/01/24/federal-prosecutors-file-charges-in-probe-of-fatal-shooting-of-border-patrol-agent-in-vermont/",
    },
    incident2: {
      image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png",
      id: "incident2",
      city: "Austin",
      state: "TX",
      address: "9700 Menaul Blvd NE",
      ori: "FL0140000",
      encounter_type: "Mental Health/Welfare Check",
      agency_responsible: "Austin Police Department",
      cause: "Taser",
      date: "2/15/25",
      description:
        "Atchison Police Department responded to a call about a person with a gun and a second call of a subject breaking into an apartment. As officers arrived at 508 N 9th St. in Atchison, an officer exited his vehicle and shots were fired at him, striking his police vehicle multiple times. The officer was not struck. The man, identified as Bryson McCray, 36, of St. Joseph, Mo., then fled back into a residence. Preliminary information indicates that at around 2:30 a.m., an attempt was made to rescue the female hostage. During the rescue attempt, McCray and the hostage were separated momentarily, and a KHP trooper fired at McCray striking him.",
      news: "https://www.fox8live.com/2025/01/18/father-kills-wife-shoots-3-children-before-being-killed-by-jpso-deputies-river-ridge/",
    },
    incident3: {
      image: "https://dallaspolice.net/PublishingImages/badge-dpd.png",
      id: "incident3",
      city: "Dallas",
      state: "TX",
      address: "Slow Hand Ln and Whitesville Rd",
      ori: "KYKSP2500",
      encounter_type: "Violent Crime",
      agency_responsible: "Dallas Police Department",
      cause: "Aphyxsiation",
      date: "3/1/25",
      description:
        "Deputies shot and killed a man who had allegedly killed his father, after a standoff following a welfare check.",
      news: "https://www.fox10phoenix.com/news/phoenix-police-scene-officer-involved-shooting-laveen",
    },
  };

  const instance = violenceInstances[violenceId];

  if (!instance) {
    return <div>Instance not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Violence Instance Details</h1>
          <img 
            src={instance.image} 
            alt={`${instance.agency_responsible} logo`}
            className="w-32 h-32 mb-6 mx-auto"
          />
          <div className="mt-6 text-left bg-white shadow-md rounded-lg p-6">
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
              <strong>Agency Responsible:</strong> {instance.agency_responsible}
            </p>
            <p>
              <strong>Cause of Death:</strong> {instance.cause}
            </p>
            <p>
              <strong>Date:</strong> {instance.date}
            </p>
            <p>
              <strong>Description:</strong> {instance.description}
            </p>
            <div className="mt-4">
              <NewsLink url={instance.news} />
            </div>
            <div className="mt-2">
              <ScorecardLink city={instance.city} />
            </div>
            <div className="mt-2">
              <LegiLink city={instance.city} />
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
    </div>
  );
}
