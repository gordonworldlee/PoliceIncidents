from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/gordonlee'
db = SQLAlchemy(app)

def init_db():
    with app.app_context():
        # Create the table
        db.engine.execute(text("""
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
            news_link TEXT
        );
        """))
        print("Database initialized successfully.")

if __name__ == "__main__":
    init_db()
