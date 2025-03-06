import Navbar from "../components/Navbar";
import {DepartmentCard} from "@/components/DepartmentCard"
import { DepartmentInstances } from "@/public/data/DepartmentData"
import { Lato } from 'next/font/google'
// bg-[#FFFAF0]


const lato = Lato({
  subsets: ["latin"],
  weight: ['400', '700'],
});

export default function DepartmentModelPage() {
  return (
    <div className="min-h-screen text-black overflow-y-auto">
      <Navbar />
      <h1 className={`${lato.className} text-[#D63C68] text-5xl text-center font-bold mt-8`}>DEPARTMENT MODEL</h1>
      <div className="flex items-center justify-center">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <br />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 m-4">
            {Object.values(DepartmentInstances).map((department) => {
              return <DepartmentCard key={department.agency_name} {...department} />
            })}
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
