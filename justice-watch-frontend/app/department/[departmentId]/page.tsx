import Link from "next/link";

interface DepartmentInstance {
  agency_name: string;
  location_name: string;
  state: string;
  latitude: number;
  longtitude: number;
  total_population: number;
  calc_police_violence_score: number;
  calc_overall_score: number;
}

interface DepartmentPageProps {
    params: {
      departmentId: string;
    };
}
  
  export default function DepartmentPage({ params }: DepartmentPageProps) {
    const { departmentId } = params;

    const departmentInstances: Record<string, DepartmentInstance> = {
      dallas: {
        agency_name: "Dallas",
        location_name: "Dallas",
        state: "Texas",
        latitude: 32.76778,
        longtitude: -96.79468,
        total_population: 1278608,
        calc_police_violence_score: 48,
        calc_overall_score: 46
      },
      houston: {
        agency_name: "Houston",
        location_name: "Houston", 
        state: "Texas", 
        latitude: 29.96826,
        longtitude: -95.36137,
        total_population: 2297580,
        calc_police_violence_score: 42,
        calc_overall_score: 47
      },
      austin: {
        agency_name: "Austin",
        location_name: "Austin", 
        state: "Texas",
        latitude: 30.26993,
        longtitude: -97.74315,
        total_population: 943059,
        calc_police_violence_score: 40,
        calc_overall_score: 32
      }
    }

    const departmentInstance = departmentInstances[departmentId];

    if (!departmentInstance) {
      return <div>Department not found</div>;
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-2xl p-6 text-center">
          <h1 className="text-3xl font-bold">{departmentInstance.agency_name} Police Department</h1>
          <br />
          <div className="text-left space-y-6">
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">Department Information</h2>
              <p><strong>Agency Name:</strong> {departmentInstance.agency_name}</p>
              <p><strong>Location:</strong> {departmentInstance.location_name}</p>
              <p><strong>State:</strong> {departmentInstance.state}</p>
              <p><strong>Total Population:</strong> {departmentInstance.total_population.toLocaleString()}</p>
              <p><strong>Coordinates:</strong> {departmentInstance.latitude}, {departmentInstance.longtitude}</p>
            </div>
    
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">Scores</h2>
              <p><strong>Police Violence Score:</strong> {departmentInstance.calc_police_violence_score}/100</p>
              <p><strong>Overall Score:</strong> {departmentInstance.calc_overall_score}/100</p>
            </div>
          </div>
          
          <div className="mt-6">
            <Link className="text-blue-500 underline" href="/department">
              Back to Department List
            </Link>
          </div>
        </div>
      </div>
    );
  }
  