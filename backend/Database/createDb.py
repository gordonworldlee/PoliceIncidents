from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os

load_dotenv()

POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
DB_ADDRESS = os.getenv("DB_ADDRESS")
DB_PORT = os.getenv("DB_PORT")
DB_CONNECTION_STRING = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{DB_ADDRESS}:{DB_PORT}/{POSTGRES_DB}"
print(f"Connecting to DB with string: {DB_CONNECTION_STRING}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_CONNECTION_STRING
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/gordonlee'
db = SQLAlchemy(app)
def init_db():
   with app.app_context():
       with Session(db.engine) as session:
           session.execute(text("""
                DROP TABLE IF EXISTS "Police Incidents";
                """))
           session.commit()
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
                   long TEXT,
                   state TEXT
               );
           """))
           session.commit()

           session.execute(text("""
                DROP TABLE IF EXISTS "scorecard";
                """))
           session.commit()
           session.execute(text("""
               CREATE TABLE IF NOT EXISTS "scorecard" (
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
                   civilian_complaints_reported TEXT,
                   connections_legislation INT[] DEFAULT '{}',
                   connections_agencies INT[] DEFAULT '{}'
               );
           """))
           session.commit()

           session.execute(text("""
                DROP TABLE IF EXISTS "Legislation";
                """))
           session.commit()


           session.execute(text("""
            CREATE TABLE IF NOT EXISTS "Legislation" (
                id SERIAL PRIMARY KEY,
                state TEXT,
                bill_number TEXT,
                title TEXT,
                description TEXT,
                url TEXT,
                session TEXT,
                session_year TEXT,
                sponsors TEXT,
                subjects TEXT,
                last_action TEXT,
                connections_agencies INT[] DEFAULT '{}',
                connections_misconduct INT[] DEFAULT '{}'
            );
        """))
           session.commit()
       print("Database initialized successfully.")



if __name__ == "__main__":
   init_db()
