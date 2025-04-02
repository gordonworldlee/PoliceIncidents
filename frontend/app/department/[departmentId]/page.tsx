import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Map } from "@/app/components/Map";
import { capitalize } from "@/components/DepartmentCard";
import { Lato } from "next/font/google";
import { Violence } from "@/types/important";
import IncidentCard from "@/components/ViolenceCard";
import { fetchApi } from "@/app/utils/apifetch";
import LegislationCard from "@/components/LegislationCard";
import { Legislation } from "@/app/legislation/page";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type DepartmentPageProps = {
  params: Promise<{ departmentId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

const stateTranslation: { [key: string]: string } = {
  TEXAS: "TX",
};

export default async function DepartmentPage({
  params,
  // ,
  // searchParams,
}: DepartmentPageProps) {
  const { departmentId } = await params;

  const getDepartmentData = async () => {
    const response = await fetchApi(`/agencies?agency_name=${departmentId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    // console.log(data);
    return data.departments;
  };

  const getViolenceConnections = async (ori_identifier: string) => {
    const response = await fetchApi(
      `/incidents?ori_identifier=${ori_identifier}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    return data.incidents;
  };

  const getLegislationConnections = async (state: string) => {
    const response = await fetchApi(`/legislation?state=${state}`);
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    return data.legislation.slice(0, 3);
  };

  let departmentInstance = await getDepartmentData();
  departmentInstance = departmentInstance[0];

  const related_legislation = await getLegislationConnections(
    departmentInstance.state,
  );

  const related_violence: Violence[] = await getViolenceConnections(
    departmentInstance.ori_identifier,
  );

  const departmentName = capitalize(
    departmentInstance.agency_name.toLowerCase(),
    " ",
  );
  if (!departmentInstance) {
    return <div>Department not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="pt-20 min-h-screen flex flex-col justify-center bg-white">
        <h1
          className={`${lato.className} text-[#D63C68] my-8 text-center text-3xl font-bold`}
        >
          {departmentName} Police Department
        </h1>
        <div className="rounded-lg mx-4 border p-4 my-4 shadow-lg">
          <header className="border-b border-gray-300 font-bold text-xl">
            Department Information
          </header>
          <div className="flex flex-col">
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-4">
              <section className="font-bold text-gray-600">
                Agency Name:{" "}
              </section>{" "}
              <span>
                {capitalize(departmentInstance.agency_name.toLowerCase(), " ")}
              </span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Agency Type:{" "}
              </section>{" "}
              <span>
                {capitalize(departmentInstance.agency_type.toLowerCase(), "-")}
              </span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">Location: </section>{" "}
              <span>
                {capitalize(
                  departmentInstance.location_name.toLowerCase(),
                  " ",
                )}
              </span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">State: </section>{" "}
              <span>
                {capitalize(departmentInstance.state.toUpperCase(), " ")}
              </span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">ORI: </section>{" "}
              <span>{departmentInstance.ori_identifier}</span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Coordinates:{" "}
              </section>{" "}
              <span>
                {departmentInstance.latitude}, {departmentInstance.longitude}
              </span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Total Population:{" "}
              </section>{" "}
              <span>{departmentInstance.total_population}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg mx-4 border p-4 my-4 shadow-lg">
          <header className="border-b border-gray-300 font-bold text-xl">
            Performance Metric
          </header>
          <div className="flex flex-col">
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-4">
              <section className="font-bold text-gray-600">
                Overall Score:{" "}
              </section>{" "}
              <span>{departmentInstance.calc_overall_score}</span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Police Funding Score:{" "}
              </section>{" "}
              <span>{departmentInstance.calc_police_funding_score}</span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Police Accountability Score:{" "}
              </section>{" "}
              <span>{departmentInstance.calc_police_accountability_score}</span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Police Shooting Average:{" "}
              </section>{" "}
              <span>{departmentInstance.police_shootings_2021}</span>
            </div>
            <div className="flex border-b pb-2 border-gray-300 justify-between pt-2">
              <section className="font-bold text-gray-600">
                Use of Force Reported:{" "}
              </section>{" "}
              <span>{departmentInstance.use_of_force_complaints_reported}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg mx-4 border p-4 my-4 shadow-lg">
          <header className="border-b mb-4 border-gray-300 font-bold text-xl">
            Department Location:
          </header>
          <Map
            latitude={parseFloat(departmentInstance.latitude)}
            longitude={parseFloat(departmentInstance.longitude)}
          />
        </div>

        <div className="text-left border-b-2 border-gray-300 rounded-lg shadow-md p-4 bg-white">
          <p className="mt-4 text-xl font-bold underline">
            View Incidents in {stateTranslation[departmentInstance.state]}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related_violence.map((incident, index) => (
              <IncidentCard key={index} incident={incident} />
            ))}
          </div>
          <p className="mt-4 text-xl font-bold underline">
            View Legislation from {stateTranslation[departmentInstance.state]}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related_legislation.map(
              (legislation: Legislation, index: number) => (
                <LegislationCard key={index} bill={legislation} />
              ),
            )}
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link className="text-blue-500 underline" href="/department">
            Back to Department List
          </Link>
        </div>
      </div>
    </div>
  );
}
