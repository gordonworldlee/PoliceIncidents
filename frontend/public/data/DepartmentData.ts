export interface DepartmentInstance {
  agency_name: string;
  agency_type: string;
  location_name: string;
  state: string;
  ori: string;
  latitude: number;
  longitude: number;
  total_population: number;
  calc_police_funding_score: number;
  use_of_force_reported: number;
  calc_police_violence_score: number;
  police_shooting_avg: number;
  calc_police_accountability_score: number;
  overall_score: number;
  incident_id: string;
  dept_website: string;
  department_image: string;
}

export const DepartmentInstances: Record<string, DepartmentInstance> = {
    dallas: {
      agency_name: "dallas",
      agency_type: "Police Department",
      location_name: "dallas",
      state: "TEXAS",
      ori: "TXDPD0000",
      latitude: 32.76778,
      longitude: -96.79468,
      total_population: 1278608,
      calc_police_funding_score: 38,
      use_of_force_reported: 268,
      calc_police_violence_score: 48,
      police_shooting_avg: 4.3,
      calc_police_accountability_score: 49,
      overall_score: 46,
      incident_id: "incident3",
      dept_website: "https://dallaspolice.net/home",
      department_image: "/dallasPD.png"
    },
    houston: {
      agency_name: "houston",
      agency_type: "Police Department",
      location_name: "houston",
      state: "TEXAS",
      ori: "TXHPD0000",
      latitude: 29.96826,
      longitude: -95.36137,
      total_population: 2297580,
      calc_police_funding_score: 52,
      use_of_force_reported: 229,
      calc_police_violence_score: 42,
      police_shooting_avg: 3.2,
      calc_police_accountability_score: 45,
      overall_score: 47,
      incident_id: "incident1",
      dept_website: "https://www.houstontx.gov/police/",
      department_image: "/houstonPD.png"
    },
    austin: {
      agency_name: "austin",
      agency_type: "Police Department",
      location_name: "austin",
      state: "TEXAS",
      ori: "TX2270100",
      latitude: 30.26993,
      longitude: -97.74315,
      total_population: 943059,
      calc_police_funding_score: 41,
      use_of_force_reported: 301,
      calc_police_violence_score: 40,
      police_shooting_avg: 3.5,
      calc_police_accountability_score: 4,
      overall_score: 32,
      incident_id: "incident2",
      dept_website: "https://www.austintexas.gov/department/police",
      department_image: "/austinPD.jpeg"
    },
};