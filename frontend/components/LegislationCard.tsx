import { Legislation } from "@/app/legislation/page";
import Link from "next/link";

interface LegislationCardProps {
  bill: Legislation;
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

const LegislationCard: React.FC<LegislationCardProps> = ({ bill }) => {
  return (
    <Link
      key={bill.id}
      href={`/legislation/${bill.id}`}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-center items-center text-center space-y-4 min-h-[250px] w-full"
    >
      <h2 className="text-xl font-bold text-blue-600">{bill.title}</h2>
      <img
        src={`/flags/${stateTranslation[bill.state]}.png`}
        alt={`flag of ${bill.state}`}
        className="w-32 h-24"
      />
      <div className="text-gray-700 space-y-1">
        <p className="text-sm">
          <strong>State:</strong> {bill.state}
        </p>
        <p className="text-sm">
          <strong>Bill Number:</strong> {bill.bill_number}
        </p>
        <p className="text-sm">
          <strong>Last Action:</strong> {bill.last_action || "N/A"}
        </p>
        <p className="text-sm">
          <strong>Sponsors:</strong> {bill.sponsors || "N/A"}
        </p>
      </div>
    </Link>
  );
};

export default LegislationCard;
