from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import database_exists
from scrape import extractInfo
from sqlalchemy import Table, Column, Integer, String, ForeignKey

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/gordonlee'
db = SQLAlchemy()
db.init_app(app)

class User(db.Model):
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

    def __init__(self, name, street_address, city, agency_responsible, image_url, cause_of_death, description, ori_identifier, encounter_type, county, news_link):
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

    def __repr__(self):
        return f"<User {self.name}>"


def populate_db():
    data = extractInfo()
    
    try:
        for index, row in data.iterrows():
            user = User(
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
                news_link=row["Link to news article or photo of official document"]
            )
            db.session.add(user)
        db.session.commit()
        print("Database populated successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Check if the database is empty
        if User.query.count() == 0:
            populate_db()
        else:
            print("Database already contains data.")
        
    app.run(debug=True)
