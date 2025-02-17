import Link from "next/link";
import { FaNewspaper } from "react-icons/fa";

interface ViolenceInstance {
  id: string;
  city: string;
  state: string;
  encounter_type: string;
  agency_responsible: string;
  date: string;
  news: string;
}

interface ViolencePageProps {
  params: {
    violenceId: string;
  };
}

const NewsLink = ({ url }: { url: string }) => (
  <Link href={url} target="_blank" rel="noopener noreferrer">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
      <FaNewspaper className="mr-2" />
      <span>Read News Article</span>
    </button>
  </Link>
);

export default function ViolenceInstancePage({ params }: ViolencePageProps) {
  const { violenceId } = params;

  // This is a mock data structure. In a real application, you'd fetch this data from an API or database
  const violenceInstances: Record<string, ViolenceInstance> = {
    incident1: {
      id: "incident1",
      city: "Grainfield",
      state: "TX",
      encounter_type: "Domestic Disturbance",
      agency_responsible: "Gove County Sheriff's Office",
      date: "1/31/25",
      news: "https://vtdigger.org/2025/01/24/federal-prosecutors-file-charges-in-probe-of-fatal-shooting-of-border-patrol-agent-in-vermont/"
    },
    incident2: {
      id: "incident2",
      city: "Austin",
      state: "TX",
      encounter_type: "Mental Health/Welfare Check",
      agency_responsible: "Austin Police Department",
      date: "2/15/25",
      news: "https://www.fox8live.com/2025/01/18/father-kills-wife-shoots-3-children-before-being-killed-by-jpso-deputies-river-ridge/"
    },
    incident3: {
      id: "incident3",
      city: "Dallas",
      state: "TX",
      encounter_type: "Violent Crime",
      agency_responsible: "Dallas Police Department",
      date: "3/1/25",
      news: "https://www.fox10phoenix.com/news/phoenix-police-scene-officer-involved-shooting-laveen"
    }
  };

  const instance = violenceInstances[violenceId];

  if (!instance) {
    return <div>Instance not found</div>;
  }

  return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-3xl font-bold">Violence Instance Details</h1>
      <div className="mt-6 text-left bg-white shadow-md rounded-lg p-6">
        <p><strong>City:</strong> {instance.city}</p>
        <p><strong>State:</strong> {instance.state}</p>
        <p><strong>Encounter Type:</strong> {instance.encounter_type}</p>
        <p><strong>Agency Responsible:</strong> {instance.agency_responsible}</p>
        <p><strong>Date:</strong> {instance.date}</p>
        <div className="mt-4">
          <NewsLink url={instance.news} />
        </div>
      </div>
      <div className="mt-6">
        <Link className="text-blue-500 hover:text-blue-700 underline" href="/violence">
          Back to Violence Model Page
        </Link>
      </div>
    </div>
  </div>
  );
}
