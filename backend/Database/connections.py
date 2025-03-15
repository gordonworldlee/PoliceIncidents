from justicewatchtypes import Legislation, Incident, Agency
from sqlalchemy.orm import Session
import re

# version 2 of createDb file
def add_agencies_to_incidents_connections(engine):
    """
    Connect incidents to agencies based on the agency_responsible field.
    This function looks for matches between the agency_responsible field in incidents
    and the agency_name field in agencies.
    """
    with Session(engine) as session:
        # Get all agencies and incidents
        agencies = session.query(Agency).all()
        incidents = session.query(Incident).all()

        # Create a dictionary of agency names to their IDs for faster lookup
        # Including both the original name and a simplified version (lowercase, no special chars)
        agency_dict = {}
        for agency in agencies:
            if agency.agency_name:
                # Add the original name
                agency_dict[agency.agency_name.lower()] = agency.id
                # Add a simplified version (remove common department suffixes and prefixes)
                simplified = re.sub(r'[^\w\s]', '', agency.agency_name.lower())
                simplified = simplified.replace('police department', '').replace('sheriffs office', '').replace('sheriff department', '')
                simplified = simplified.strip()
                if simplified:
                    agency_dict[simplified] = agency.id

        # Process each incident
        for incident in incidents:
            if not incident.agency_responsible:
                continue

            agency_responsible = incident.agency_responsible.lower()
            matching_agency_ids = []

            # Direct match
            if agency_responsible in agency_dict:
                matching_agency_ids.append(agency_dict[agency_responsible])
            else:
                # Look for partial matches
                simplified_incident = re.sub(r'[^\w\s]', '', agency_responsible)

                # Check if any agency name is contained in the incident agency_responsible
                for agency_name, agency_id in agency_dict.items():
                    # If agency name is found in the incident description
                    if (agency_name in simplified_incident or
                        simplified_incident in agency_name):
                        matching_agency_ids.append(agency_id)

            # Remove duplicates and update the incident
            if matching_agency_ids:
                incident.connections_agencies = list(set(matching_agency_ids))

        # Commit the changes to the database
        session.commit()

def connect_legislation_to_incidents_by_state(engine):
    """
    Connect legislation to incidents based on state.
    Each legislation row will be connected to all incidents that occurred in the same state.
    """
    with Session(engine) as session:
        # Get all legislation and incidents
        legislation_items = session.query(Legislation).all()
        incidents = session.query(Incident).all()

        # Create a dictionary of incidents by state for faster lookup
        incidents_by_state = {}
        for incident in incidents:
            if incident.state:
                state = incident.state.upper()  # Normalize state to uppercase
                if state not in incidents_by_state:
                    incidents_by_state[state] = []
                incidents_by_state[state].append(incident.id)

        # Process each legislation
        updated_count = 0
        for legislation in legislation_items:
            if not legislation.state:
                continue

            state = legislation.state.upper()  # Normalize state to uppercase

            # If there are incidents for this state, connect the legislation to them
            if state in incidents_by_state:
                # Set the connections
                legislation.connections_incidents = incidents_by_state[state]
                updated_count += 1

        # Commit the changes to the database
        session.commit()
        print(f"Updated {updated_count} legislation items with connections to incidents")

        # Verify the update worked by checking a few records
        if updated_count > 0:
            sample = min(5, updated_count)
            verification = session.query(Legislation).filter(Legislation.connections_incidents.isnot(None)).limit(sample).all()
            for v in verification:
                print(f"Legislation ID {v.id} now connected to {len(v.connections_incidents)} incidents")

if __name__ == "__main__":
    from sqlalchemy import create_engine
    import os
    from dotenv import load_dotenv
    load_dotenv()

    POSTGRES_USER = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_DB = os.getenv("POSTGRES_DB")
    DB_ADDRESS = os.getenv("DB_ADDRESS")
    DB_PORT = os.getenv("DB_PORT")
    DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{DB_ADDRESS}:{DB_PORT}/{POSTGRES_DB}"
    print(f"Connecting to DB with string: {DATABASE_URL}")

    # Database setup
    engine = create_engine(DATABASE_URL)

    # Run the connection function
    # add_agencies_to_incidents_connections(engine)
    # print("Completed connecting agencies to incidents")

    connect_legislation_to_incidents_by_state(engine)
    print("Done")
