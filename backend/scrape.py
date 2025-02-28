import pandas as pd
import time
import json
import requests

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



base_url = "https://api.legiscan.com/?key=aaffc8fd91b83d758ae8f159078fa237&op="  # Replace with your API key

def api_request(operation, params=None):
    url = base_url + operation
    if params:
        url += '&' + '&'.join(f'{k}={v}' for k, v in params.items())
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
        return json.loads(response.content)
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return None

def search_bills(query, state=None, page=1):
    params = {'q': query, 'page': page}
    if state:
        params['state'] = state
    return api_request('getSearch', params)  # Using getSearch (50 results per page)

def get_all_search_results(query, state):
    all_bills = []
    page_num = 1
    while True:
        bills = search_bills(query, state=state, page=page_num)
        if bills and bills['status'] == 'OK' and 'searchresult' in bills:
            search_results = bills['searchresult']

            # Check for empty search results (no bills on this page)
            if not search_results or 'summary' not in search_results:
                break  # No more results

            # Remove the 'summary' key *before* iterating
            summary = search_results.pop('summary', None)

            # Add the bills from this page to the all_bills list
            for key, bill in search_results.items():
                if isinstance(bill, dict):
                    all_bills.append(bill)
            page_num += 1

            time.sleep(0.2)  # Be nice to the API

            # Check if we've reached the last page
            if int(summary['page_current']) >= int(summary['page_total']):
                break

        else:
            print("Error fetching page:", page_num)
            break
    return all_bills


def print_bills(bills):
    if bills:
        for bill in bills:
            print(f"Bill ID: {bill['bill_id']}")
            print(f"Title: {bill['title']}")
            print(f"State: {bill['state']}")
            print(f"Bill Number: {bill['bill_number']}")
            print(f"Last Action: {bill['last_action']}")
            print("---")
    else:
        print("No bills found or an error occurred.")

# Example Usage:
query = '"law enforcement" OR police'
all_bills = get_all_search_results(query, state='tx')

if all_bills:
    print(f"Total bills found: {len(all_bills)}")
    print_bills(all_bills)
else:
    print("No bills found.")
