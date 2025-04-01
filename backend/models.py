from sqlalchemy import Column, Integer, String, ARRAY
from sqlalchemy.orm import declarative_base
from dataclasses import dataclass

Base = declarative_base()

class Serializable():
    def serialize(self):
        raise NotImplementedError("Subclasses must implement serialize method")

class Legislation(Base, Serializable):
    __tablename__ = 'legislation'
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
    connections_incidents = Column(ARRAY(Integer))
    connections_agencies = Column(ARRAY(Integer))

    def serialize(self):
        return {
            'id': self.id,
            'state': self.state,
            'bill_number': self.bill_number,
            'title': self.title,
            'description': self.description,
            'url': self.url,
            'session': self.session,
            'session_year': self.session_year,
            'sponsors': self.sponsors,
            'subjects': self.subjects,
            'last_action': self.last_action,
            'connections_incidents': self.connections_incidents,
            'connections_agencies': self.connections_agencies
        }

    def __repr__(self):
        return f"<Legislation {self.title}, {self.state}>"

class Incident(Base, Serializable):
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
    connections_legislation = Column(ARRAY(Integer))
    connections_agencies = Column(ARRAY(Integer))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'street_address': self.street_address,
            'city': self.city,
            'agency_responsible': self.agency_responsible,
            'image_url': self.image_url,
            'cause_of_death': self.cause_of_death,
            'description': self.description,
            'ori_identifier': self.ori_identifier,
            'encounter_type': self.encounter_type,
            'county': self.county,
            'news_link': self.news_link,
            'date': self.date,
            'lat': self.lat,
            'long': self.long,
            'state': self.state,
            'connections_legislation': self.connections_legislation,
            'connections_agencies': self.connections_agencies
        }

    def __repr__(self):
        return f"<Incident {self.name}, {self.city}>"

class Agency(Base, Serializable):
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
    connections_legislation = Column(ARRAY(Integer))
    connections_incidents = Column(ARRAY(Integer))

    def serialize(self):
        return {
            'id': self.id,
            'agency_name': self.agency_name,
            'agency_type': self.agency_type,
            'location_name': self.location_name,
            'state': self.state,
            'ori_identifier': self.ori_identifier,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'total_population': self.total_population,
            'calc_police_funding_score': self.calc_police_funding_score,
            'calc_police_violence_score': self.calc_police_violence_score,
            'calc_police_accountability_score': self.calc_police_accountability_score,
            'use_of_force_complaints_reported': self.use_of_force_complaints_reported,
            'police_shootings_2013': self.police_shootings_2013,
            'police_shootings_2014': self.police_shootings_2014,
            'police_shootings_2015': self.police_shootings_2015,
            'police_shootings_2016': self.police_shootings_2016,
            'police_shootings_2017': self.police_shootings_2017,
            'police_shootings_2018': self.police_shootings_2018,
            'police_shootings_2019': self.police_shootings_2019,
            'police_shootings_2020': self.police_shootings_2020,
            'police_shootings_2021': self.police_shootings_2021,
            'calc_overall_score': self.calc_overall_score,
            'criminal_complaints_reported': self.criminal_complaints_reported,
            'civilian_complaints_reported': self.civilian_complaints_reported
        }

    def __repr__(self):
        return f"<Scorecard {self.agency_name}, {self.location_name}>"
