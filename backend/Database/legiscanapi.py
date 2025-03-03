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



states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]



search_terms = ["police", "law enforcement", "officer safety"]
keywords = ['police', 'law enforcement', 'officer', 'patrol', 'sheriff', 'trooper', 'detective']
results = []





def run_api():
    # Define the CSV filename with a timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"police_law_enforcement_bills_{timestamp}.csv"

    # Open the CSV file once and write the header
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=[
            'state', 'bill_number', 'title', 'description', 'url', 'session',
            'session_year', 'sponsors', 'subjects', 'last_action'
        ])
        writer.writeheader()  # Write the header row

        # Process each state and search term
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
                                    # Prepare the row data
                                    row = {
                                        'state': bill_info['state'],
                                        'bill_number': bill_info['bill_number'],
                                        'title': bill_info['title'],
                                        'description': bill_info['description'],
                                        'url': bill_info['url'],
                                        'session': bill_info['session']['session_name'],
                                        'session_year': f"{bill_info['session']['year_start']}-{bill_info['session']['year_end']}",
                                        'sponsors': ', '.join([sponsor['name'] for sponsor in bill_info['sponsors']]),
                                        'subjects': ', '.join([subject['subject_name'] for subject in bill_info['subjects']]),
                                        'last_action': bill_info['history'][0]['action'] if bill_info['history'] else '',
                                    }

                                    # Write the row directly to the CSV file
                                    writer.writerow(row)

                time.sleep(0.5)  # To avoid hitting rate limits

    print(f"Results saved to {filename}")

