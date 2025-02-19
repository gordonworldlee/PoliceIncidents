import Link from "next/link";
import Navbar from "../components/Navbar";

interface DepartmentInstance {
  agency_name: string;
  location_name: string;
  state: string;
  latitude: number;
  longtitude: number;
  total_population: number;
  calc_police_violence_score: number;
  police_shooting_avg: number;
  calc_overall_score: number;
  department_image: string;
}

const Card = (DepartmentInstance: DepartmentInstance) => {
  const deptName = DepartmentInstance.agency_name.toLowerCase();
  const link = `/department/${deptName}`;
  const locationName = DepartmentInstance.location_name.toLowerCase();
  const state = DepartmentInstance.state.toLowerCase();
  return (
    <Link href={link}>
      <div className="h-full p-6 bg-white border-2 transition-all text-center duration-300 hover:shadow-xl hover:translate-y-[-2px] rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-blue-600">{deptName.charAt(0).toUpperCase() + deptName.slice(1).toLowerCase()} Police Department Scorecard</h2>
        <div className="w-32 h-32 mb-4">
          <img src={DepartmentInstance.department_image} alt={deptName + "Police Department"} className="w-full h-full object-contain" />
        </div>
          <p className="text-sm text-gray-600"><strong>Agency Name:</strong> {deptName.charAt(0).toUpperCase() + deptName.slice(1).toLowerCase()} Police Department</p>
          <p className="text-sm text-gray-600"><strong>Location:</strong> {locationName.charAt(0).toUpperCase() + locationName.slice(1).toLowerCase()}</p>
          <p className="text-sm text-gray-600"><strong>State:</strong> {state.charAt(0).toUpperCase() + state.slice(1).toLowerCase()}</p>
          <p className="text-sm text-gray-600"><strong>Coordinates:</strong> {DepartmentInstance.latitude}, {DepartmentInstance.longtitude}</p>
          <p className="text-sm text-gray-600"><strong>Police Violence Score:</strong> {DepartmentInstance.calc_police_violence_score}/100</p>
          <p className="text-sm text-gray-600"><strong>Police Shooting Average:</strong> {DepartmentInstance.police_shooting_avg}</p>
          <p className="text-sm text-gray-600"><strong>Overall Score:</strong> {DepartmentInstance.calc_overall_score}/100</p>
      </div>
    </Link>
  )
}

export default function DepartmentModelPage() {
  const DepartmentInstances: DepartmentInstance[] = [
    {
      agency_name: "dallas",
      location_name: "dallas",
      state: "TEXAS",
      latitude: 32.76778,
      longtitude: -96.79468,
      total_population: 1278608,
      calc_police_violence_score: 48,
      police_shooting_avg: 4.3,
      calc_overall_score: 46,
      department_image: "https://dallaspolice.net/PublishingImages/badge-dpd.png"
    },
    {
      agency_name: "houston",
      location_name: "houston",
      state: "TEXAS",
      latitude: 29.96826,
      longtitude: -95.36137,
      total_population: 2297580,
      calc_police_violence_score: 42,
      police_shooting_avg: 3.8,
      calc_overall_score: 47,
      department_image: "https://houstontx.gov/_siteAssets/images/citySeal125x125.png"
    },
    {
      agency_name: "austin",
      location_name: "austin",
      state: "TEXAS",
      latitude: 30.26993,
      longtitude: -97.74315,
      total_population: 943059,
      calc_police_violence_score: 40,
      police_shooting_avg: 3.5,
      calc_overall_score: 32,
      department_image: "data:image/jpeg;base64,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"
    }
  ]
    return (
      <div className="min-h-screen bg-white text-black overflow-y-auto">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mt-8">Department Model Page</h1>
            <br />
            <div className="flex flex-col md:flex-row gap-4 m-4 h-full">
              {DepartmentInstances.map((department) => {
                return <Card key={department.agency_name} {...department} />
              })};
          </div>
            <br />
            <p>
              <Link className="text-blue-500 underline" href="/">
                Link to go back to the landing page.
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
  