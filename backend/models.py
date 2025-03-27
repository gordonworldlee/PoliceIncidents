from sqlalchemy import Column, Integer, String, ARRAY
from sqlalchemy.orm import declarative_base
from dataclasses import dataclass

object

Base = declarative_base()

@dataclass
class Legislation(Base):
    __tablename__ = 'legislation'
    id:int = Column(Integer, primary_key=True)
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
    connections_incidents = Column(ARRAY(Integer))
    connections_agencies = Column(ARRAY(Integer))


    def __repr__(self):
        return f"<Legislation {self.title}, {self.state}>"

class Incident(Base):
    __tablename__ = 'incidents'

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
    connections_misconduct = Column(ARRAY(Integer))
    connections_agencies = Column(ARRAY(Integer))

    def __repr__(self):
        return f"<Incident {self.name}, {self.city}>"

class Agency(Base):
    __tablename__ = 'agencies'

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
