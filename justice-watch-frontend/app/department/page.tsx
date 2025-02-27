import Link from "next/link";
import Navbar from "../components/Navbar";
// import Image from "next/image";
import {DepartmentCard} from "@/components/DepartmentCard"
import { DepartmentInstances } from "@/public/data/DepartmentData"


export default function DepartmentModelPage() {

  return (
    <div className="min-h-screen bg-white text-black overflow-y-auto">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mt-8">Department Model Page</h1>
          <br />
          <div className="flex flex-col md:flex-row gap-4 m-4 h-full">
            {Object.values(DepartmentInstances).map((department) => {
              return <DepartmentCard key={department.agency_name} {...department} />
            })};
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
