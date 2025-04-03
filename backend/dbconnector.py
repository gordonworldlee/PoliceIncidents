from csv import Error
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

def connect_to_db():
    try:
        load_dotenv()
        POSTGRES_USER = os.getenv("POSTGRES_USER")
        POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
        POSTGRES_DB = os.getenv("POSTGRES_DB")
        DB_ADDRESS = os.getenv("DB_ADDRESS")
        DB_PORT = os.getenv("DB_PORT")
        DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{DB_ADDRESS}:
        print(f"Connecting to DB with string: {DATABASE_URL}")
        engine = create_engine(DATABASE_URL)
        return engine
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        raise Error("Error connecting to the database", e)
