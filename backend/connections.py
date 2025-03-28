from models import Legislation, Incident, Agency
from sqlalchemy.orm import Session
import re
import time

# version 2 of createDb file

# add to Legislation.connections_agencies
def connect_legislation_to_agencies(session):
    print("Connecting legislation to agencies...")

    # Get all legislation with their states
    legislation = session.query(Legislation).all()

    # Group agencies by state in a single query
    state_to_agencies = {}
    all_agencies = session.query(Agency).all()
    for agency in all_agencies:
        if agency.state not in state_to_agencies:
            state_to_agencies[agency.state] = []
        state_to_agencies[agency.state].append(agency.id)

    # Update legislation connections in bulk
    for leg in legislation:
        agencies_in_state = state_to_agencies.get(leg.state, [])
        leg.connections_agencies = agencies_in_state

    # Commit once at the end
    session.commit()
    print(f"Connected {len(legislation)} legislation records to agencies")

# add to Legislation.connections_incidents
def connect_legislation_to_incidents(session):
    print("Connecting legislation to incidents...")

    # Get all legislation with their states
    legislation = session.query(Legislation).all()

    # Group incidents by state in a single query
    state_to_incidents = {}
    all_incidents = session.query(Incident).all()
    for incident in all_incidents:
        if incident.state not in state_to_incidents:
            state_to_incidents[incident.state] = []
        state_to_incidents[incident.state].append(incident.id)

    # Update legislation connections in bulk
    for leg in legislation:
        incidents_in_state = state_to_incidents.get(leg.state, [])
        leg.connections_incidents = incidents_in_state

    # Commit once at the end
    session.commit()
    print(f"Connected {len(legislation)} legislation records to incidents")

# add to Incident.connections_legislation
def connect_incidents_to_legislation(session):
    print("Connecting incidents to legislation...")

    # Get all incidents with their states
    incidents = session.query(Incident).all()

    # Group legislation by state in a single query
    state_to_legislation = {}
    all_legislation = session.query(Legislation).all()
    for leg in all_legislation:
        if leg.state not in state_to_legislation:
            state_to_legislation[leg.state] = []
        state_to_legislation[leg.state].append(leg.id)

    # Update incident connections in bulk
    for incident in incidents:
        legislation_in_state = state_to_legislation.get(incident.state, [])
        incident.connections_legislation = legislation_in_state

    # Commit once at the end
    session.commit()
    print(f"Connected {len(incidents)} incident records to legislation")

# add to Incident.connections_agencies
def connect_incidents_to_agencies(session):
    print("Connecting incidents to agencies...")

    # Get all incidents with their states
    incidents = session.query(Incident).all()

    # Group agencies by state in a single query
    state_to_agencies = {}
    all_agencies = session.query(Agency).all()
    for agency in all_agencies:
        if agency.state not in state_to_agencies:
            state_to_agencies[agency.state] = []
        state_to_agencies[agency.state].append(agency.id)

    # Update incident connections in bulk
    for incident in incidents:
        agencies_in_state = state_to_agencies.get(incident.state, [])
        incident.connections_agencies = agencies_in_state

    # Commit once at the end
    session.commit()
    print(f"Connected {len(incidents)} incident records to agencies")

# add to Agency.connections_legislation
def connect_agencies_to_legislation(session):
    print("Connecting agencies to legislation...")

    # Get all agencies with their states
    agencies = session.query(Agency).all()

    # Group legislation by state in a single query
    state_to_legislation = {}
    all_legislation = session.query(Legislation).all()
    for leg in all_legislation:
        if leg.state not in state_to_legislation:
            state_to_legislation[leg.state] = []
        state_to_legislation[leg.state].append(leg.id)

    # Update agency connections in bulk
    for agency in agencies:
        legislation_in_state = state_to_legislation.get(agency.state, [])
        agency.connections_legislation = legislation_in_state

    # Commit once at the end
    session.commit()
    print(f"Connected {len(agencies)} agency records to legislation")

# add to Agency.connections_incidents
def connect_agencies_to_incidents(session):
    print("Connecting agencies to incidents...")

    # Get all agencies with their states
    agencies = session.query(Agency).all()

    # Group incidents by state in a single query
    state_to_incidents = {}
    all_incidents = session.query(Incident).all()
    for incident in all_incidents:
        if incident.state not in state_to_incidents:
            state_to_incidents[incident.state] = []
        state_to_incidents[incident.state].append(incident.id)

    # Update agency connections in bulk
    for agency in agencies:
        incidents_in_state = state_to_incidents.get(agency.state, [])
        agency.connections_incidents = incidents_in_state

    # Commit once at the end
    session.commit()
    print(f"Connected {len(agencies)} agency records to incidents")

def reset_all_connections(engine):
    with Session(engine) as session:
    # Reset all connections to incidents
        session.query(Legislation).update({Legislation.connections_incidents: None})
        session.query(Legislation).update({Legislation.connections_agencies: None})

        session.query(Incident).update({Incident.connections_legislation: None})
        session.query(Incident).update({Incident.connections_agencies: None})

        session.query(Agency).update({Agency.connections_legislation: None})
        session.query(Agency).update({Agency.connections_incidents: None})

        session.commit()
        print("All connections to incidents have been reset")

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

    x = input("1 (reset all connections) or 2 (make connections): ")
    if x == "1":
        reset_all_connections(engine)
    elif x == "2":
        session = Session(engine)
        total_start_time = time.time()
        connect_legislation_to_agencies(session)
        connect_legislation_to_incidents(session)
        connect_incidents_to_legislation(session)
        connect_incidents_to_agencies(session)
        connect_agencies_to_legislation(session)
        connect_agencies_to_incidents(session)
        total_elapsed_time = time.time() - total_start_time
        print(f"All connections have been created in {total_elapsed_time:.2f} seconds total")
    print("Done")
