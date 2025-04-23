// import Link from "next/link";
// import React from 'react';
import {
  MapPin, Building2, Shield,
  BarChart2, Target, AlertTriangle
} from 'lucide-react';
import { Department } from '@/public/data/DepartmentData';
import { HighlightText } from './HighlightText';

export const getScoreColor = (score: number) => {
  if (score < 30)
    return {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: "red", // Darker shade for icons
    };
  if (score < 50)
    return {
      bg: "bg-orange-100",
      text: "text-orange-700",
      icon: "orange",
    };
  if (score < 70)
    return {
      bg: "bg-yellow-200",
      text: "text-yellow-700",
      icon: "orange",
    };
  return {
    bg: "bg-green-100",
    text: "text-green-700",
    icon: "green",
  };
};

const getPoliceShootingColor = (shootings: number) => {
  if (shootings < 10)
    return {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: "green", // Darker shade for icons
    };
  if (shootings < 30)
    return {
      bg: "bg-yellow-200",
      text: "text-yellow-700",
      icon: "orange",
    };
  if (shootings < 50)
    return {
      bg: "bg-orange-100",
      text: "text-orange-700",
      icon: "orange",
    };
  return {
    bg: "bg-red-100",
    text: "text-red-700",
    icon: "red",
  };
};

export function capitalize (word: string, delimeter: string) {
  const result = word.split(delimeter);
  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);
  }
  return result.join(" ")
}

interface DepartmentCardProps {
  DepartmentInstance: Department;
  searchQuery?: string;
}

export const DepartmentCard = ({ DepartmentInstance, searchQuery }: DepartmentCardProps) => {
  const deptName = capitalize(DepartmentInstance.agency_name.toLowerCase(), " ");
  const locationName = capitalize(DepartmentInstance.location_name.toLowerCase(), " ");
  const state = DepartmentInstance.state.toLowerCase();
  const agencyType = capitalize(DepartmentInstance.agency_type.toLowerCase(), "-");
  const coordinates = `${DepartmentInstance.latitude}, ${DepartmentInstance.longitude}`;
  const violenceScore = parseFloat(DepartmentInstance.calc_police_violence_score);
  const policeShootingAverage = parseFloat(DepartmentInstance.police_shootings_2021);
  const overallScore = parseFloat(DepartmentInstance.calc_overall_score);

  const violenceColor = getScoreColor(violenceScore);
  const policeShootingColor = getPoliceShootingColor(policeShootingAverage);
  const overallColor = getScoreColor(overallScore)
  return (
    // Card Container
    <div className="rounded-lg transition-all shadow-lg w-full border-[1px] bg-gradient-to-br from-white via-blue-50 to-pink-50 border-gray-300 hover:border-black hover:shadow-xl hover:-translate-y-1">
      {/* Header start */}
      <div className="pb-2 pt-4 px-4 flex gap-4">
        <span className="w-12 h-12 flex items-center justify-center rounded-full">
          <Building2 color="blue" size={32} />
        </span>
        <header className="inline-block flex flex-col">
          <div className="font-bold text-lg">
            {/* {deptName} */}
            <HighlightText text={deptName + " Police Department"} searchTerm={searchQuery || ""} />
            {/* Police Department */}
          </div>
          <div className="text-gray-600">
            <HighlightText text={agencyType} searchTerm={searchQuery || ""} />
            {/* {agencyType} */}
          </div>
        </header>
      </div>
      {/* Header end */}
      {/* Location and Coordinates */}
      <div className="px-2 sm:px-4 grid grid-cols-2 gap-2">
        <div className="flex items-start gap-x-1">
          <span className="mt-1 flex-shrink-0">
            <MapPin color="gray" size={20} />
          </span>
          <div className="min-w-0">
            <header className="font-bold whitespace-nowrap">Location</header>
            <div className="text-[0.85rem] lg:text-sm ">
              <HighlightText text={locationName + ", " + state.toUpperCase()} searchTerm={searchQuery || ""} />
              {/* {locationName}, {state.toUpperCase()} */}
              </div>
          </div>
        </div>
        <div className="flex items-start gap-x-1">
          <span className="mt-1 flex-shrink-0">
            <Target color="gray" size={20} />
          </span>
          <div className="min-w-0">
            <header className="font-bold whitespace-nowrap">Coordinates</header>
            <div className="text-[0.85rem] lg:text-sm ">
              <HighlightText text={coordinates} searchTerm={searchQuery || ""} />
              {/* {coordinates} */}
            </div>
          </div>
        </div>
      </div>
      {/* Location and Coordinates End */}
      {/* 3 categories start */}
      <div className="flex justify-center items-stretch p-4 gap-1 sm:gap-2">
        <div className={`rounded-lg flex-1 p-2 ${violenceColor.bg} flex flex-col items-center justify-center`}>
          <Shield color={violenceColor.icon} size={20} />
          <p className={`${violenceColor.text} text-xs sm:text-sm font-semibold text-center`}>Police Violence</p>
          <p className={`${violenceColor.text} text-sm font-extrabold`}>{violenceScore}</p>
        </div>
        <div className={`rounded-lg flex-1 p-2 ${policeShootingColor.bg} flex flex-col items-center justify-center`}>
          <AlertTriangle color={policeShootingColor.icon} size={20} />
          <p className={`${policeShootingColor.text} text-xs sm:text-sm font-semibold text-center`}>Police Shooting</p>
          <p className={`${policeShootingColor.text} text-sm font-extrabold`}>{policeShootingAverage}</p>
        </div>
        <div className={`rounded-lg flex-1 p-2 ${overallColor.bg} flex flex-col items-center justify-center`}>
          <BarChart2 color={overallColor.icon} size={20} />
          <p className={`${overallColor.text} text-xs sm:text-sm font-semibold text-center`}>Overall</p>
          <p className={`${overallColor.text} text-sm font-extrabold`}>{overallScore}</p>
        </div>
      </div>
    </div>

  );
};