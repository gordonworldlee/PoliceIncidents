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



