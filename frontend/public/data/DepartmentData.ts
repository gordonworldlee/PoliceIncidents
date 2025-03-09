export interface Department {
  agency_name: string;
  agency_type: string;
  calc_overall_score: string;
  calc_police_accountability_score: string;
  calc_police_funding_score: string;
  calc_police_violence_score: string;
  civilian_complaints_reported: string;
  criminal_complaints_reported: string;
  id: number;
  latitude: string;
  location_name: string;
  longitude: string;
  ori_identifier: string;
  police_shootings_2013: string;
  police_shootings_2014: string;
  police_shootings_2015: string;
  police_shootings_2016: string;
  police_shootings_2017: string;
  police_shootings_2018: string;
  police_shootings_2019: string;
  police_shootings_2020: string;
  police_shootings_2021: string;
  state: string;
  total_population: string;
  use_of_force_complaints_reported: string;
  incident_id : string;
}

export const DepartmentInstances: Record<string, Department> = {
    DALLAS: {
      "agency_name": "DALLAS",
      "agency_type": "police-department",
      "calc_overall_score": "46%",
      "calc_police_accountability_score": "49%",
      "calc_police_funding_score": "38%",
      "calc_police_violence_score": "48%",
      "civilian_complaints_reported": "3572.0",
      "criminal_complaints_reported": "14.0",
      "id": 7,
      "latitude": "32.76778",
      "location_name": "DALLAS",
      "longitude": "-96.79468",
      "ori_identifier": "TXDPD0000",
      "police_shootings_2013": "22.0",
      "police_shootings_2014": "20.0",
      "police_shootings_2015": "11.0",
      "police_shootings_2016": "13.0",
      "police_shootings_2017": "7.0",
      "police_shootings_2018": "4.0",
      "police_shootings_2019": "11.0",
      "police_shootings_2020": "5.0",
      "police_shootings_2021": "1.0",
      "state": "TX",
      "total_population": "1278608",
      "use_of_force_complaints_reported": "268.0",
      "incident_id" : "incident2"
    },
    HOUSTON: {
      "agency_name": "HOUSTON",
      "agency_type": "police-department",
      "calc_overall_score": "47%",
      "calc_police_accountability_score": "45%",
      "calc_police_funding_score": "52%",
      "calc_police_violence_score": "42%",
      "civilian_complaints_reported": "1712.0",
      "criminal_complaints_reported": "27.0",
      "id": 3,
      "latitude": "29.96826",
      "location_name": "HOUSTON",
      "longitude": "-95.36137",
      "ori_identifier": "TXHPD0000",
      "police_shootings_2013": "37.0",
      "police_shootings_2014": "34.0",
      "police_shootings_2015": "32.0",
      "police_shootings_2016": "26.0",
      "police_shootings_2017": "15.0",
      "police_shootings_2018": "18.0",
      "police_shootings_2019": "21.0",
      "police_shootings_2020": "26.0",
      "police_shootings_2021": "29.0",
      "state": "TX",
      "total_population": "2297580",
      "use_of_force_complaints_reported": "229.0", 
      "incident_id" : "incident1"
    },
    AUSTIN: {
      "agency_name": "AUSTIN",
      "agency_type": "police-department",
      "calc_overall_score": "32%",
      "calc_police_accountability_score": "4%",
      "calc_police_funding_score": "41%",
      "calc_police_violence_score": "40%",
      "civilian_complaints_reported": "5022.0",
      "criminal_complaints_reported": "253.0",
      "id": 10,
      "latitude": "30.26993",
      "location_name": "AUSTIN",
      "longitude": "-97.74315",
      "ori_identifier": "TX2270100",
      "police_shootings_2013": "9.0",
      "police_shootings_2014": "4.0",
      "police_shootings_2015": "7.0",
      "police_shootings_2016": "8.0",
      "police_shootings_2017": "9.0",
      "police_shootings_2018": "11.0",
      "police_shootings_2019": "5.0",
      "police_shootings_2020": "1.0",
      "police_shootings_2021": "8.0",
      "state": "TX",
      "total_population": "943059",
      "use_of_force_complaints_reported": "301.0",
      "incident_id" : "incident3"
    },
};