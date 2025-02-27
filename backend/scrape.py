import pandas as pd


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