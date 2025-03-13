import Link from "next/link";
import { Bill } from "@/types/bill";

interface LegislationCardProps {
  bill: Bill;
}

export default function LegislationCard({ bill }: LegislationCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-center items-center text-center space-y-4 min-h-[250px] w-full sm:w-[400px]">
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
        <p className="text-sm"><strong>Date Filed:</strong> {bill.history[0]?.date}</p>
        <p className="text-sm"><strong>First Sponsor:</strong> {bill.sponsors[0]?.name}</p>
      </div>
    </div>
  );
}
