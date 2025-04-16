// import Link from "next/link";
import Navbar from "../components/Navbar";
import ToggleView from "@/components/ToggleSliderView";
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ["latin"],
  weight: ['400', '700'],
});

// import Image from "next/image";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-markercluster";

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

export default function ViolenceModelPage() {

  return (
    <div> 
      <Navbar />
      <div className="p-4 pt-20">
        <h1 className={`${lato.className} text-5xl font-bold text-red-500 text-center mt-8`}>POLICE VIOLENCE</h1>
        <p className="text-lg text-red-500 font-bold mt-2 mb-4 text-center">The truth will always be our shield against corruption</p>
        <ToggleView />
      </div>
    </div>
  )

}

// export default function ViolenceModelPage() {
//   const incidents: ViolenceInstance[] = [
//     {
//       id: "incident1",
//       city: "Houston",
//       state: "TX",
//       encounter_type: "Domestic Disturbance",
//       cause: "Gun",
//       date: "1/31/25",
//       agency: "Farmington Police Department",
//       image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png",
//     },
//     {
//       id: "incident2",
//       city: "Austin",
//       state: "TX",
//       encounter_type: "Mental Health/Welfare Check",
//       cause: "Taser",
//       date: "2/15/25",
//       agency: "Volusia County Sheriff's Office",
//       image: "https://dallaspolice.net/PublishingImages/badge-dpd.png",
//     },
//     {
//       id: "incident3",
//       city: "Dallas",
//       state: "TX",
//       encounter_type: "Violent Crime",
//       cause: "Aphyxsiation",
//       date: "3/1/25",
//       agency: "Douglas County Sheriff's Office",
//       image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white text-black overflow-y-auto">
//       <Navbar />
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold mb-6">Violence Model Page</h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {incidents.map((incident) => (
//               <Link
//                 key={incident.id}
//                 href={`/violence/${incident.id}`}
//                 className="block"
//               >
//                 <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                   <div className="flex items-center mb-4">
//                     <img
//                       width={64}
//                       height={64}
//                       src={incident.image}
//                       alt={`${incident.agency} logo`}
//                       className="w-16 h-16 mr-4"
//                     />
//                     <h2 className="text-lg font-semibold text-blue-600">
//                       {incident.city}, {incident.state}
//                     </h2>
//                   </div>
//                   <p className="text-sm text-gray-600">
//                     <strong>Agency:</strong> {incident.agency}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     <strong>Type:</strong> {incident.encounter_type}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     <strong>Cause:</strong> {incident.cause}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     <strong>Date:</strong> {incident.date}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
