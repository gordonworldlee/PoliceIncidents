from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from sqlalchemy.orm import Session
#pLMcM5RpYjUHXeTGCgby
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/gordonlee'
db = SQLAlchemy(app)
def init_db():
   with app.app_context():
       with Session(db.engine) as session:
           session.execute(text("""
               CREATE TABLE IF NOT EXISTS "Police Incidents" (
                   id SERIAL PRIMARY KEY,
                   name TEXT,
                   street_address TEXT,
                   city TEXT,
                   agency_responsible TEXT,
                   image_url TEXT,
                   cause_of_death TEXT,
                   description TEXT,
                   ori_identifier TEXT,
                   encounter_type TEXT,
                   county TEXT,
                   news_link TEXT,
                   date TEXT,
                   lat TEXT,
                   long TEXT           
               );
           """))


           session.commit()


           session.execute(text("""
               CREATE TABLE IF NOT EXISTS "Department" (
                   id SERIAL PRIMARY KEY,
                   agency_name TEXT,
                   agency_type TEXT,
                   location_name TEXT,
                   state TEXT,
                   ori_identifier TEXT,
                   latitude TEXT,
                   longitude TEXT,
                   total_population TEXT,
                   calc_police_funding_score TEXT,
                   calc_police_violence_score TEXT,
                   calc_police_accountability_score TEXT,
                   use_of_force_complaints_reported TEXT,
                   police_shootings_2013 TEXT,
                   police_shootings_2014 TEXT,
                   police_shootings_2015 TEXT,
                   police_shootings_2016 TEXT,
                   police_shootings_2017 TEXT,
                   police_shootings_2018 TEXT,
                   police_shootings_2019 TEXT,
                   police_shootings_2020 TEXT,
                   police_shootings_2021 TEXT,
                   calc_overall_score TEXT,
                   criminal_complaints_reported TEXT,
                   civilian_complaints_reported TEXT


               );
           """))




           session.commit()
       print("Database initialized successfully.")



if __name__ == "__main__":
   init_db()
