import pandas as pd
import time
import json
import requests
from datetime import datetime
def extractInfo():
   df = pd.read_excel('data.xlsx')
   columns_to_check = [
       "Victim's name", "Street Address of Incident", "City",
       "Agency responsible for death", "URL of image of victim",
       "Cause of death", "A brief description of the circumstances surrounding the death",
       "ORI Agency Identifier (if available)", "Encounter Type", "County",
       "Link to news article or photo of official document", "Date of Incident (month/day/year)",
       "Latitude", "Longitude"
   ]
  
   filtered_df = df.loc[
       (df['Encounter Type'].isin(['Traffic Stop', 'Other Non-Violent Offense', 'Mental Health/Welfare Check', 'None/Unknown'])) &
       df[columns_to_check].notna().all(axis=1) &  # Check if all specified columns are not NaN
       (df[columns_to_check] != '').all(axis=1),  # Check if all specified columns are not empty strings
       columns_to_check
   ]
  
   return filtered_df


def extractScorecard():
   # Load the CSV
   card_df = pd.read_csv("scorecard.csv")
  
   # Define a mapping for the expected columns
   column_mapping = {
       'agency_name': 'Agency Name',
       'agency_type': 'Agency Type',
       'location_name': 'Location Name',
       'state': 'State',
       'ori': 'ORI Agency Identifier (if available)',
       'latitude': 'Latitude (if available)',
       'longitude': 'Longitude (if available)',
       'total_population': 'Total Population',
       'calc_police_funding_score': 'Calculated Police Funding Score (if available)',
       'calc_police_violence_score': 'Calculated Police Violence Score (if available)',
       'calc_police_accountability_score': 'Calculated Police Accountability Score (if available)',
       'use_of_force_complaints_reported': 'Use of Force Complaints Reported (if available)',
       'police_shootings_2013': 'Police Shootings in 2013 (if available)',
       'police_shootings_2014': 'Police Shootings in 2014 (if available)',
       'police_shootings_2015': 'Police Shootings in 2015 (if available)',
       'police_shootings_2016': 'Police Shootings in 2016 (if available)',
       'police_shootings_2017': 'Police Shootings in 2017 (if available)',
       'police_shootings_2018': 'Police Shootings in 2018 (if available)',
       'police_shootings_2019': 'Police Shootings in 2019 (if available)',
       'police_shootings_2020': 'Police Shootings in 2020 (if available)',
       'police_shootings_2021': 'Police Shootings in 2021 (if available)',
       'calc_overall_score': 'Calculated Overall Score (if available)',
       'criminal_complaints_reported': 'Criminal Complaints Reported (if available)',
       'civilian_complaints_reported': 'Civilian Complaints Reported (if available)',
   }
   cols_to_check = [
       'Agency Name', 'Agency Type', 'Location Name', 'State',
       'ORI Agency Identifier (if available)', 'Latitude (if available)',
       'Longitude (if available)', 'Total Population',
       'Calculated Police Funding Score (if available)',
       'Calculated Police Violence Score (if available)',
       'Calculated Police Accountability Score (if available)',
       'Use of Force Complaints Reported (if available)',
       'Police Shootings in 2013 (if available)',
       'Police Shootings in 2014 (if available)',
       'Police Shootings in 2015 (if available)',
       'Police Shootings in 2016 (if available)',
       'Police Shootings in 2017 (if available)',
       'Police Shootings in 2018 (if available)',
       'Police Shootings in 2019 (if available)',
       'Police Shootings in 2020 (if available)',
       'Police Shootings in 2021 (if available)',
       'Calculated Overall Score (if available)',
       'Criminal Complaints Reported (if available)',
       'Civilian Complaints Reported (if available)'
   ]


   # Rename the columns
   card_df.rename(columns=column_mapping, inplace=True)
  
   # Check for missing columns
   expected_columns = list(column_mapping.values())
   missing_columns = [col for col in expected_columns if col not in card_df.columns]


   if missing_columns:
       print(f"Warning: Missing columns in the CSV file: {missing_columns}")
   else:
       print("All expected columns are present.")


   filter_card_df = card_df.loc[
       card_df[cols_to_check].notna().all(axis=1) &  # Check if all specified columns are not NaN
       (card_df[cols_to_check] != '').all(axis=1),  # Check if all specified columns are not empty strings
       cols_to_check
   ]


   return filter_card_df



API_KEY = "aaffc8fd91b83d758ae8f159078fa237"
BASE_URL = "https://api.legiscan.com/?key=" + API_KEY

#base_url = "https://api.legiscan.com/?key=aaffc8fd91b83d758ae8f159078fa237&op="  # Replace with your API key

def search_bills(state, query):
    params = {
        "op": "search",
        "state": state,
        "query": query
    }
    response = requests.get(BASE_URL, params=params)
    return json.loads(response.text)

def get_bill_details(bill_id):
    params = {
        "op": "getBill",
        "id": bill_id
    }
    response = requests.get(BASE_URL, params=params)
    return json.loads(response.text)
"""
states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
"""
states = ["TX"]

search_terms = ["police", "law enforcement", "officer safety"]
keywords = ['police', 'law enforcement', 'officer', 'patrol', 'sheriff', 'trooper', 'detective']

results = []

for state in states:
    for term in search_terms:
        print(f"Searching {state} for '{term}'...")
        search_results = search_bills(state, term)
        
        if search_results['status'] == 'OK':
            for bill in search_results['searchresult']:
                if bill != 'summary':
                    bill_data = search_results['searchresult'][bill]
                    
                    # Get more details about the bill
                    bill_details = get_bill_details(bill_data['bill_id'])
                    
                    if bill_details['status'] == 'OK':
                        bill_info = bill_details['bill']
                        
                        # Check if any of the keywords are in the description (case-insensitive)
                        if any(keyword.lower() in bill_info['description'].lower() for keyword in keywords):
                            results.append({
                                'state': bill_info['state'],
                                'bill_number': bill_info['bill_number'],
                                'title': bill_info['title'],
                                'description': bill_info['description'],
                                'url': bill_info['url'],
                                'session': bill_info['session']['session_name'],
                                'session_year': f"{bill_info['session']['year_start']}-{bill_info['session']['year_end']}",
                                'sponsors': [sponsor['name'] for sponsor in bill_info['sponsors']],
                                'subjects': [subject['subject_name'] for subject in bill_info['subjects']],
                                'last_action': bill_info['history'][0]['action'] if bill_info['history'] else '',
                            })

        time.sleep(1)  # To avoid hitting rate limits
# Save results to a JSON file
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
filename = f"police_law_enforcement_bills_{timestamp}.json"

with open(filename, 'w') as f:
    json.dump(results, f, indent=2)

print(f"Results saved to {filename}")

# Print summary
print(f"\nTotal bills found: {len(results)}")
for state in states:
    state_bills = [bill for bill in results if bill['state'] == state]
    if state_bills:
        print(f"{state}: {len(state_bills)} bills")