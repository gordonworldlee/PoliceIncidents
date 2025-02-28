from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import database_exists
from scrape import extractInfo, extractScorecard
from sqlalchemy import Table, Column, Integer, String, Float


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/gordonlee'
db = SQLAlchemy()
db.init_app(app)


class PoliceIncident(db.Model):
   __tablename__ = 'Police Incidents'


   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String)
   street_address = db.Column(db.String)
   city = db.Column(db.String)
   agency_responsible = db.Column(db.String)
   image_url = db.Column(db.String)
   cause_of_death = db.Column(db.String)
   description = db.Column(db.String)
   ori_identifier = db.Column(db.String)
   encounter_type = db.Column(db.String)
   county = db.Column(db.String)
   news_link = db.Column(db.String)
   date = db.Column(db.String)
   lat = db.Column(db.String)
   long = db.Column(db.String)


   def __init__(self, name, street_address, city, agency_responsible, image_url, cause_of_death, description, ori_identifier,
                encounter_type, county, news_link, date, lat, long):
       self.name = name
       self.street_address = street_address
       self.city = city
       self.agency_responsible = agency_responsible
       self.image_url = image_url
       self.cause_of_death = cause_of_death
       self.description = description
       self.ori_identifier = ori_identifier
       self.encounter_type = encounter_type
       self.county = county
       self.news_link = news_link
       self.date = date
       self.lat = lat
       self.long = long






   def __repr__(self):
       return f"<PoliceIncident {self.name}, {self.city}>"




class Scorecard(db.Model):
   __tablename__ = 'scorecard'


   id = db.Column(db.Integer, primary_key=True)
   agency_name = db.Column(db.String)
   agency_type = db.Column(db.String)
   location_name = db.Column(db.String)
   state = db.Column(db.String)
   ori_identifier = db.Column(db.String)
   latitude = db.Column(db.String)
   longitude = db.Column(db.String)
   total_population = db.Column(db.String)
   calc_police_funding_score = db.Column(db.String)
   calc_police_violence_score = db.Column(db.String)
   calc_police_accountability_score = db.Column(db.String)
   use_of_force_complaints_reported = db.Column(db.String)
   police_shootings_2013 = db.Column(db.String)
   police_shootings_2014 = db.Column(db.String)
   police_shootings_2015 = db.Column(db.String)
   police_shootings_2016 = db.Column(db.String)
   police_shootings_2017 = db.Column(db.String)
   police_shootings_2018 = db.Column(db.String)
   police_shootings_2019 = db.Column(db.String)
   police_shootings_2020 = db.Column(db.String)
   police_shootings_2021 = db.Column(db.String)
   calc_overall_score = db.Column(db.String)
   criminal_complaints_reported = db.Column(db.String)
   civilian_complaints_reported = db.Column(db.String)


   def __init__(self, agency_name, agency_type, location_name, state, ori_identifier, latitude, longitude,
                total_population, calc_police_funding_score, calc_police_violence_score, calc_police_accountability_score,
                use_of_force_complaints_reported, police_shootings_2013, police_shootings_2014, police_shootings_2015,
                police_shootings_2016, police_shootings_2017, police_shootings_2018, police_shootings_2019,
                police_shootings_2020, police_shootings_2021, calc_overall_score, criminal_complaints_reported, civilian_complaints_reported):
       self.agency_name = agency_name
       self.agency_type = agency_type
       self.location_name = location_name
       self.state = state
       self.ori_identifier = ori_identifier
       self.latitude = latitude
       self.longitude = longitude
       self.total_population = total_population
       self.calc_police_funding_score = calc_police_funding_score
       self.calc_police_violence_score = calc_police_violence_score
       self.calc_police_accountability_score = calc_police_accountability_score
       self.use_of_force_complaints_reported = use_of_force_complaints_reported
       self.police_shootings_2013 = police_shootings_2013
       self.police_shootings_2014 = police_shootings_2014
       self.police_shootings_2015 = police_shootings_2015
       self.police_shootings_2016 = police_shootings_2016
       self.police_shootings_2017 = police_shootings_2017
       self.police_shootings_2018 = police_shootings_2018
       self.police_shootings_2019 = police_shootings_2019
       self.police_shootings_2020 = police_shootings_2020
       self.police_shootings_2021 = police_shootings_2021
       self.calc_overall_score = calc_overall_score
       self.criminal_complaints_reported = criminal_complaints_reported
       self.civilian_complaints_reported = civilian_complaints_reported


   def __repr__(self):
       return f"<Scorecard {self.name}, Rank: {self.rank}>"




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
               long=row['Longitude']
           )
           db.session.add(incident)
       db.session.commit()
       print("Police Incident data populated successfully.")
   except Exception as e:
       db.session.rollback()
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


           db.session.add(entry)
       db.session.commit()
       print("Scorecard data populated successfully.")
   except Exception as e:
       db.session.rollback()
       print(f"Error inserting Scorecard data: {e}")


if __name__ == '__main__':
   with app.app_context():
       db.create_all()
      
       if PoliceIncident.query.count() == 0:
           populate_db()
       else:
           print("Police Incidents data already exists.")
       if Scorecard.query.count() == 0:
           populate_scorecard()
       else:
           print("Scorecard data already exists.")


    
   app.run(debug=True)
