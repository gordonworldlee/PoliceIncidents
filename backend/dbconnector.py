from csv import Error
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

def connect_to_db():
    try:
        #load_dotenv()
        POSTGRES_USER="postgres"
        POSTGRES_PASSWORD="example567"
        POSTGRES_DB="prod_db"
        DB_ADDRESS="justicewatch.me"
        DB_PORT=5432
        DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{DB_ADDRESS}:{DB_PORT}/{POSTGRES_DB}"
        print(f"Connecting to DB with string: {DATABASE_URL}")
        engine = create_engine(DATABASE_URL)
        return engine
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        raise Error("Error connecting to the database", e)
