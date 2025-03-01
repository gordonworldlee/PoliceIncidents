import Link from "next/link";
import { DepartmentInstance } from "@/public/data/DepartmentData";

export const DepartmentCard = (DepartmentInstance: DepartmentInstance) => {
    const deptName = DepartmentInstance.agency_name.toLowerCase();
    const link = `/department/${deptName}`;
    const locationName = DepartmentInstance.location_name.toLowerCase();
    const state = DepartmentInstance.state.toLowerCase();
    return (
      <Link href={link}>
        <div className="p-4 bg-white border-[1px] hover:border-black border-gray-100 transition-all text-center duration-300 hover:shadow-xl hover:translate-y-[-2px] rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl mb-2 font-bold text-[#4195E2]">
            {deptName.charAt(0).toUpperCase() + deptName.slice(1).toLowerCase()}{" "}
            Police Department Scorecard
          </h2>
          <div className="w-32 h-32 mb-4">
            <img
              src={DepartmentInstance.department_image}
              alt={deptName + "Police Department"}
              width={200}
              height={200}
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-sm text-gray-600">
            <strong>Agency Name:</strong>{" "}
            {deptName.charAt(0).toUpperCase() + deptName.slice(1).toLowerCase()}{" "}
            Police Department
          </p>
          <p className="text-sm text-gray-600">
            <strong>Location:</strong>{" "}
            {locationName.charAt(0).toUpperCase() +
              locationName.slice(1).toLowerCase()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>State:</strong>{" "}
            {state.charAt(0).toUpperCase() + state.slice(1).toLowerCase()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Coordinates:</strong> {DepartmentInstance.latitude},{" "}
            {DepartmentInstance.longitude}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Police Violence Score:</strong>{" "}
            {DepartmentInstance.calc_police_violence_score}/100
          </p>
          <p className="text-sm text-gray-600">
            <strong>Police Shooting Average:</strong>{" "}
            {DepartmentInstance.police_shooting_avg}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Overall Score:</strong>{" "}
            {DepartmentInstance.overall_score}/100
          </p>
        </div>
      </Link>
    );
  };