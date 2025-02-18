import Link from "next/link";

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
          <p className="text-sm text-gray-600"><strong>Agency Name:</strong> {deptName.charAt(0).toUpperCase() + deptName.slice(1).toLowerCase()} Police Department</p>
          <p className="text-sm text-gray-600"><strong>Location:</strong> {locationName.charAt(0).toUpperCase() + locationName.slice(1).toLowerCase()}</p>
          <p className="text-sm text-gray-600"><strong>State:</strong> {state.charAt(0).toUpperCase() + state.slice(1).toLowerCase()}</p>
          <p className="text-sm text-gray-600"><strong>Coordinates:</strong> {DepartmentInstance.latitude}, {DepartmentInstance.longtitude}</p>
          <p className="text-sm text-gray-600"><strong>City Population:</strong> {DepartmentInstance.total_population}</p>
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
      calc_overall_score: 46
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
      calc_overall_score: 47
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
      calc_overall_score: 32
    }
  ]
    return (
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
    );
  }
  