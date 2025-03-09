import Link from "next/link";
import Navbar from "../components/Navbar";
import { obtainBillList, obtainSingleBill } from "@/lib/fetch_legislative_data";
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ["latin"],
  weight: ['400', '700'],
});

export default async function LegislationModelPage() {
  // Wait for all bills to be fetched using Promise.all
  const bill_data = await Promise.all(
    (await obtainBillList()).map((bill_id) => obtainSingleBill(bill_id))
  );



  return (
    <div className="min-h-screen bg-white text-black overflow-y-auto">
      <Navbar />
      <h1 className={`${lato.className} text-[#D63C68] text-5xl text-center font-bold mt-8`}>LEGISLATION MODEL</h1>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bill_data.map((bill) => (
              <div key={bill.bill_id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-center items-center text-center space-y-4 min-h-[250px] w-full sm:w-[400px]">
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
                  <p className="text-sm"><strong>Date Filed:</strong> {bill.history[0].date}</p>
                  <p className="text-sm"><strong>First Sponsor:</strong> {bill.sponsors[0].name}</p>
              </div>
            </div>
            
            
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
