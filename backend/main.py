from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Legislation, Incident, Agency
from scrape import extractInfo, extractAgency, extractLegislation
from dotenv import load_dotenv
import os

load_dotenv()

POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
DB_ADDRESS = os.getenv("DB_ADDRESS")
DB_PORT = os.getenv("DB_PORT")
DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{DB_ADDRESS}:{DB_PORT}/{POSTGRES_DB}"
print(f"Connecting to DB with string: {DATABASE_URL}")

# Database setup
#DATABASE_URL = 'postgresql://postgres:1234@localhost:5432/gordonlee'  # Replace with your actual database URL
# DATABASE_URL = 'postgresql://postgres:example567@justicewatch.me:5432/postgres'
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def populate_db():
    data = extractInfo()
    try:
        for _, row in data.iterrows():
            incident = Incident(
                name=row["Victim's name"],
                street_address=row["Street Address of Incident"],
                city=row["City"],
                agency_responsible=row["Agency responsible for death"],
                image_url=row["URL of image of victim"],
                cause_of_death=row["Cause of death"],
                description=row["A brief description of the circumstances surrounding the death"],
                ori_identifier=row["ORI Agency Identifier (if available)"],
                encounter_type=row["Encounter Type"],
                county=row["County"],
                news_link=row["Link to news article or photo of official document"],
                date=row['Date of Incident (month/day/year)'],
                lat=row['Latitude'],
                long=row['Longitude'],
                state=row['State']
            )
            session.add(incident)
        session.commit()
        print("Police Incident data populated successfully.")
    except Exception as e:
        session.rollback()
        print(f"Error inserting Police Incident data: {e}")

def populate_scorecard():
    data = extractAgency()
    try:
        for _, row in data.iterrows():
            entry = Agency(
                agency_name=row.get("Agency Name", None),
                agency_type=row.get("Agency Type", None),
                location_name=row.get("Location Name", None),
                state=row.get("State", None),
                ori_identifier=row.get("ORI Agency Identifier (if available)", None),
                latitude=row.get("Latitude (if available)", None),
                longitude=row.get("Longitude (if available)", None),
                total_population=row.get("Total Population", None),
                calc_police_funding_score=row.get("Calculated Police Funding Score (if available)", None),
                calc_police_violence_score=row.get("Calculated Police Violence Score (if available)", None),
                calc_police_accountability_score=row.get("Calculated Police Accountability Score (if available)", None),
                use_of_force_complaints_reported=row.get("Use of Force Complaints Reported (if available)", None),
                police_shootings_2013=row.get("Police Shootings in 2013 (if available)", None),
                police_shootings_2014=row.get("Police Shootings in 2014 (if available)", None),
                police_shootings_2015=row.get("Police Shootings in 2015 (if available)", None),
                police_shootings_2016=row.get("Police Shootings in 2016 (if available)", None),
                police_shootings_2017=row.get("Police Shootings in 2017 (if available)", None),
                police_shootings_2018=row.get("Police Shootings in 2018 (if available)", None),
                police_shootings_2019=row.get("Police Shootings in 2019 (if available)", None),
                police_shootings_2020=row.get("Police Shootings in 2020 (if available)", None),
                police_shootings_2021=row.get("Police Shootings in 2021 (if available)", None),
                calc_overall_score=row.get("Calculated Overall Score (if available)", None),
                criminal_complaints_reported=row.get("Criminal Complaints Reported (if available)", None),
                civilian_complaints_reported=row.get("Civilian Complaints Reported (if available)", None)
            )
            session.add(entry)
        session.commit()
        print("Agency data populated successfully.")
    except Exception as e:
        session.rollback()
        print(f"Error inserting Agency data: {e}")

def populate_legi():
    data = extractLegislation()
    try:
        for _, row in data.iterrows():
            legislation = Legislation(
                state=row['state'],
                bill_number=row['bill_number'],
                title=row['title'],
                description=row['description'],
                url=row['url'],
                session=row['session'],
                session_year=row['session_year'],
                sponsors=row['sponsors'],
                subjects=row['subjects'],
                last_action=row['last_action']
            )
            session.add(legislation)
        session.commit()
        print("Legislation data populated successfully.")
    except Exception as e:
        session.rollback()
        print(f"Error inserting Legislation data: {e}")


if __name__ == '__main__':
    if session.query(Incident).count() == 0:
        populate_db()
    else:
        print("Police Incidents data already exists.")

    if session.query(Agency).count() == 0:
        populate_scorecard()
    else:
        print("Agency data already exists.")

    if session.query(Legislation).count() == 0:
        populate_legi()
    else:
        print("Legislation data already exists.")

    session.close()  # Close the session when done
