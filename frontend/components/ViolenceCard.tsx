import { HiOfficeBuilding, HiOutlineIdentification, HiCalendar, HiExclamationCircle } from "react-icons/hi";
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
    className="block group"
  >
    <div className="relative bg-gradient-to-br from-white via-blue-50 to-pink-50 p-5 rounded-xl shadow-lg border-l-4 border-[#D63C68] transition-all duration-200 group-hover:scale-105 group-hover:shadow-2xl">
      {/* Accent bar */}
      <span className="absolute left-0 top-0 h-full w-1 bg-[#D63C68] rounded-l-xl" />
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 mr-4">
          <Image
            width={64}
            height={64}
            src={incident.image_url}
            alt="Incident"
            className="rounded-full shadow-lg object-cover border-2 border-[#D63C68]"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#D63C68]">
            <HighlightText text={incident.city + ", " + incident.state} searchTerm={searchQuery || ""} />
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            <HiOfficeBuilding className="inline mr-1 text-blue-400" />
            <HighlightText text={incident.agency_responsible} searchTerm={searchQuery || ""} />
          </p>
        </div>
      </div>
      <div className="space-y-2 pl-2">
        <p className="text-sm text-gray-700 flex items-center">
          <HiOutlineIdentification className="mr-2 text-blue-500" />
          <span className="font-semibold">Type:</span>&nbsp;
          <HighlightText text={incident.encounter_type} searchTerm={searchQuery || ""} />
        </p>
        <p className="text-sm text-gray-700 flex items-center">
          <HiExclamationCircle className="mr-2 text-red-400" />
          <span className="font-semibold">Cause:</span>&nbsp;
          <HighlightText text={incident.cause_of_death} searchTerm={searchQuery || ""} />
        </p>
        <p className="text-sm text-gray-700 flex items-center">
          <HiCalendar className="mr-2 text-green-500" />
          <span className="font-semibold">Date:</span>&nbsp;
          <HighlightText text={incident.date} searchTerm={searchQuery || ""} />
        </p>
      </div>
    </div>
  </Link>
);

export default IncidentCard;
