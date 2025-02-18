// app/legislation/[legislationId]/page.tsx
import { getBillContent, obtainSingleBill } from "@/lib/fetch_legislative_data";
import Link from "next/link";

interface LegislationInstancePageProps {
  params: {
    legislationId: string;
  };
  billData: any;
  billContent: string;
}

const chamber_translation = {
  "H": "House",
  "S": "Senate"
};

const party_lookup = {
  "D": "Democrat",
  "R": "Republican",
  "I": "Independent",
  "L": "Libertarian",
  "G": "Green",
  "N": "Nonpartisan"
};

export default async function LegislationInstancePage({ params }: LegislationInstancePageProps) {
  const { legislationId } = await params;  // Access params directly
  const billData = await obtainSingleBill(parseInt(legislationId));  // Fetch bill data
  const billContent = await getBillContent(billData.texts[0].state_link);  // Fetch bill content

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{billData.title}</h1>
      <br />
      <p className="text-xl font-bold">
        <span className="text-red-500"> {billData.state}</span> | <span className="text-green-500">{billData.session.session_name} </span> | <span className="text-blue-500">{billData.bill_number}</span>
      </p>
      <br />
      <h2 className="text-xl font-bold underline">Bill History</h2>
      <ol>
        {billData.history.map((item: any, index: number) => (
          <li key={index}>
            This bill was <span className="font-bold">{item.action}</span> in the <span className="font-bold">{chamber_translation[item.chamber as "H" | "S"]}</span> on <span className="font-bold">{item.date}</span>.
          </li>
        ))}
      </ol>
      <br />
      <h2 className="text-xl font-bold underline">Sponsor(s)</h2>
      <ol>
        {billData.sponsors.map((item: any, index: number) => (
          <li key={index}>
            <span className="font-bold">{item.name}</span> (
            <span className="font-bold">{party_lookup[item.party as "D" | "R" | "I" | "L" | "G" | "N"]}</span>) 
            from district <span className="font-bold">{item.district}</span>
          </li>
        ))}
      </ol>
      <br />
      <h2 className="text-xl font-bold underline">Relevant Links</h2>
      <a href={billData.state_link} className="text-blue-500 underline">{billData.state_link}</a>
      
      <div className="mt-8">
          <Link href="/legislation" className="text-blue-500 hover:underline">
            Back to the Legislation Model Page
          </Link>
        </div>
    </div>
  );
}
