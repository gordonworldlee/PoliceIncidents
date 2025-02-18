import Link from "next/link";
import { obtainBillList, obtainSingleBill } from "@/lib/fetch_legislative_data";

export default async function LegislationModelPage() {
  // Wait for all bills to be fetched using Promise.all
  const bill_data = await Promise.all(
    (await obtainBillList()).map((bill_id) => obtainSingleBill(bill_id))
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Legislation Model Page</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bill_data.map((bill) => (
            <div  key={bill.bill_id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col justify-center items-center min-h-[200px]">
              <Link href={`/legislation/${bill.bill_id}`} className="block">
                <h2 className="text-lg font-semibold text-blue-600 mb-2 text-center">{bill.title}</h2>
                <p className="text-sm text-gray-600 text-center"><strong>State:</strong> {bill.state}</p>
                <p className="text-sm text-gray-600 text-center"><strong>Bill Number:</strong> {bill.bill_number}</p>
                <p className="text-sm text-gray-600 text-center"><strong>Date filed:</strong> {bill.history[0].date}</p>
                <p className="text-sm text-gray-600 text-center"><strong>First sponsor:</strong> {bill.sponsors[0].name}</p>
              </Link>
            </div>
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
