from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base
from scrape import extractInfo, extractScorecard, extractLegislation

# Database setup
#DATABASE_URL = 'postgresql://postgres:1234@localhost:5432/gordonlee'  # Replace with your actual database URL
DATABASE_URL = 'postgresql://postgres:example567@justicewatch.me:5432/postgres'
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()

class Legislation(Base):
    __tablename__ = 'Legislation'
    id = Column(Integer, primary_key=True)
    state = Column(String)
    bill_number = Column(String)
    title = Column(String)
    description = Column(String)
    url = Column(String)
    session = Column(String)
    session_year = Column(String)
    sponsors = Column(String)
    subjects = Column(String)
    last_action = Column(String)

    def __repr__(self):
        return f"<Legislation {self.title}, {self.state}>"

class PoliceIncident(Base):
    __tablename__ = 'Police Incidents'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    street_address = Column(String)
    city = Column(String)
    agency_responsible = Column(String)
    image_url = Column(String)
    cause_of_death = Column(String)
    description = Column(String)
    ori_identifier = Column(String)
    encounter_type = Column(String)
    county = Column(String)
    news_link = Column(String)
    date = Column(String)
    lat = Column(String)
    long = Column(String)
    state = Column(String)

    def __repr__(self):
        return f"<PoliceIncident {self.name}, {self.city}>"

class Scorecard(Base):
    __tablename__ = 'scorecard'

    id = Column(Integer, primary_key=True)
    agency_name = Column(String)
    agency_type = Column(String)
    location_name = Column(String)
    state = Column(String)
    ori_identifier = Column(String)
    latitude = Column(String)
    longitude = Column(String)
    total_population = Column(String)
    calc_police_funding_score = Column(String)
    calc_police_violence_score = Column(String)
    calc_police_accountability_score = Column(String)
    use_of_force_complaints_reported = Column(String)
    police_shootings_2013 = Column(String)
    police_shootings_2014 = Column(String)
    police_shootings_2015 = Column(String)
    police_shootings_2016 = Column(String)
    police_shootings_2017 = Column(String)
    police_shootings_2018 = Column(String)
    police_shootings_2019 = Column(String)
    police_shootings_2020 = Column(String)
    police_shootings_2021 = Column(String)
    calc_overall_score = Column(String)
    criminal_complaints_reported = Column(String)
    civilian_complaints_reported = Column(String)

    def __repr__(self):
        return f"<Scorecard {self.agency_name}, {self.location_name}>"

def populate_db():
    data = extractInfo()
    try:
        for _, row in data.iterrows():
            incident = PoliceIncident(
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
    data = extractScorecard()
    try:
        for _, row in data.iterrows():
            entry = Scorecard(
                agency_name=row["Agency Name"],
                agency_type=row["Agency Type"],
                location_name=row["Location Name"],
                state=row["State"],
                ori_identifier=row["ORI Agency Identifier (if available)"],
                latitude=row["Latitude (if available)"],
                longitude=row["Longitude (if available)"],
                total_population=row["Total Population"],
                calc_police_funding_score=row["Calculated Police Funding Score (if available)"],
                calc_police_violence_score=row["Calculated Police Violence Score (if available)"],
                calc_police_accountability_score=row["Calculated Police Accountability Score (if available)"],
                use_of_force_complaints_reported=row["Use of Force Complaints Reported (if available)"],
                police_shootings_2013=row["Police Shootings in 2013 (if available)"],
                police_shootings_2014=row["Police Shootings in 2014 (if available)"],
                police_shootings_2015=row["Police Shootings in 2015 (if available)"],
                police_shootings_2016=row["Police Shootings in 2016 (if available)"],
                police_shootings_2017=row["Police Shootings in 2017 (if available)"],
                police_shootings_2018=row["Police Shootings in 2018 (if available)"],
                police_shootings_2019=row["Police Shootings in 2019 (if available)"],
                police_shootings_2020=row["Police Shootings in 2020 (if available)"],
                police_shootings_2021=row["Police Shootings in 2021 (if available)"],
                calc_overall_score=row["Calculated Overall Score (if available)"],
                criminal_complaints_reported=row["Criminal Complaints Reported (if available)"],
                civilian_complaints_reported=row["Civilian Complaints Reported (if available)"]
            )
            session.add(entry)
        session.commit()
        print("Scorecard data populated successfully.")
    except Exception as e:
        session.rollback()
        print(f"Error inserting Scorecard data: {e}")

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
    if session.query(PoliceIncident).count() == 0:
        populate_db()
    else:
        print("Police Incidents data already exists.")

    if session.query(Scorecard).count() == 0:
        populate_scorecard()
    else:
        print("Scorecard data already exists.")

    if session.query(Legislation).count() == 0:
        populate_legi()
    else:
        print("Legislation data already exists.")   

    session.close()  # Close the session when done
