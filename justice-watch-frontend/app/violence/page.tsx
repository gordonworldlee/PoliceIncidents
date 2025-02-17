import Link from "next/link";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

interface ViolenceInstance {
  id: string;
  city: string;
  state: string;
  encounter_type: string;
  cause: string;
  date: string;
  agency: string;
}

export default function ViolenceModelPage() {
  const incidents: ViolenceInstance[] = [
    { 
      id: "incident1", 
      city: "Houston", 
      state: "TX", 
      encounter_type: "Domestic Disturbance", 
      cause: "Gun", 
      date: "1/31/25",
      agency: "Farmington Police Department" 
    },
    { 
      id: "incident2", 
      city: "Austin", 
      state: "TX", 
      encounter_type: "Mental Health/Welfare Check", 
      cause: "Taser", 
      date: "2/15/25",
      agency: "Volusia County Sheriff's Office" 
    },
    { 
      id: "incident3", 
      city: "Dallas", 
      state: "TX", 
      encounter_type: "Violent Crime", 
      cause: "Aphyxsiation", 
      date: "3/1/25",
      agency: "Douglas County Sheriff's Office" 
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Violence Model Page</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {incidents.map((incident) => (
            <Link key={incident.id} href={`/violence/${incident.id}`} className="block">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-lg font-semibold text-blue-600 mb-2">{incident.city}, {incident.state}</h2>
                <p className="text-sm text-gray-600"><strong>Type:</strong> {incident.agency}</p>
                <p className="text-sm text-gray-600"><strong>Type:</strong> {incident.encounter_type}</p>
                <p className="text-sm text-gray-600"><strong>Cause:</strong> {incident.cause}</p>
                <p className="text-sm text-gray-600"><strong>Date:</strong> {incident.date}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to the landing page
          </Link>
        </div>
      </div>
    </div>
  );
}
