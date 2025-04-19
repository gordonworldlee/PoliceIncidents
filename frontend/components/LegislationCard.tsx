import { Legislation } from "@/app/legislation/page";
import Link from "next/link";
import { HighlightText } from "./HighlightText";
interface LegislationCardProps {
  bill: Legislation;
  searchQuery?: string;
}
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


const LegislationCard = ({ bill, searchQuery }: LegislationCardProps) => {
  return (
    <Link
      key={bill.id}
      href={`/legislation/${bill.id}`}
      className="relative bg-gradient-to-br from-white via-blue-50 to-pink-50 p-6 rounded-xl shadow-lg border-l-4 border-blue-500 transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl flex flex-col w-full max-w-md mx-auto"
    >
      {/* Accent bar */}
      <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-xl" />
      {/* Header: Flag and Title */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={`/flags/${stateTranslation[bill.state]}.png`}
          alt={`flag of ${bill.state}`}
          className="w-16 h-12 rounded shadow-md border border-blue-100 object-cover"
        />
        <h2 className="text-lg md:text-xl font-bold text-blue-700 text-left">
          <HighlightText text={bill.title} searchTerm={searchQuery || ""} />
        </h2>
      </div>
      {/* Info Section */}
      <div className="text-gray-700 space-y-1 pl-1">
        <p className="text-sm">
          <span className="font-semibold text-blue-600">State:</span>{" "}
          <HighlightText text={bill.state} searchTerm={searchQuery || ""} />
        </p>
        <p className="text-sm">
          <span className="font-semibold text-blue-600">Bill Number:</span>{" "}
          <HighlightText text={bill.bill_number} searchTerm={searchQuery || ""} />
        </p>
        <p className="text-sm">
          <span className="font-semibold text-blue-600">Last Action:</span>{" "}
          <HighlightText text={bill.last_action || "N/A"} searchTerm={searchQuery || ""} />
        </p>
        <p className="text-sm">
          <span className="font-semibold text-blue-600">Sponsors:</span>{" "}
          <HighlightText text={bill.sponsors || "N/A"} searchTerm={searchQuery || ""} />
        </p>
      </div>
    </Link>
  );
};
export default LegislationCard;
