'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Violence } from './ViolenceCardGrid';


const IncidentCard: React.FC<{ incident: Violence }> = ({ incident }) => (
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
          {incident.city}, {incident.state}
        </h2>
      </div>
      <p className="text-sm text-gray-600">
        <strong>Agency:</strong> {incident.agency_responsible}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Type:</strong> {incident.encounter_type}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Cause:</strong> {incident.cause_of_death}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Date:</strong> {incident.date}
      </p>
    </div>
  </Link>
);

export default IncidentCard;
