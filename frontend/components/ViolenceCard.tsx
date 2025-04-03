'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Violence } from "@/types/important";
import { HighlightText } from './HighlightText';
interface ViolenceCardProps {
  incident: Violence;
  searchQuery?: string;
}


const IncidentCard = ({ incident, searchQuery }: ViolenceCardProps) => (
  <Link
    key={incident.id}
    href={`/violence/${incident.id}`}
    className="block"
  >
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <Image
          width={64}
          height={64}
          src={incident.image_url}
          alt = "idk man"
          className="w-16 h-16 mr-4"
        />
        <h2 className="text-lg font-semibold text-blue-600">
          {/* {incident.city}, {incident.state} */}
          <HighlightText text={incident.city + ", " + incident.state} searchTerm={searchQuery || ""} />
        </h2>
      </div>
      <p className="text-sm text-gray-600">
        <strong>Agency:</strong> 
        <HighlightText text={incident.agency_responsible} searchTerm={searchQuery || ""} />
        {/* {incident.agency_responsible} */}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Type:</strong> 
        <HighlightText text={incident.encounter_type} searchTerm={searchQuery || ""} />
        {/* {incident.encounter_type} */}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Cause:</strong> 
        <HighlightText text={incident.cause_of_death} searchTerm={searchQuery || ""} />
        {/* {incident.cause_of_death} */}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Date:</strong> 
        <HighlightText text={incident.date} searchTerm={searchQuery || ""} />
        {/* {incident.date} */}
      </p>
    </div>
  </Link>
);

export default IncidentCard;
