from models import Legislation, Incident, Agency, Base

# # version 2 of createDb file
# def create_agencies_table(engine):
#     """
#     Create the agencies table in the database.

#     Args:
#         engine: SQLAlchemy engine instance connected to the database

#     Returns:
#         True if table creation was successful, False otherwise
#     """
#     try:
#         # This will create only the agencies table if it doesn't exist
#         Agency.__table__.create(engine, checkfirst=True)
#         return True
#     except Exception as e:
#         print(f"Error creating agencies table: {str(e)}")
#         return False

# def create_legislation_table(engine):
#     """
#     Create the legislation table in the database.

#     Args:
#         engine: SQLAlchemy engine instance connected to the database

#     Returns:
#         True if table creation was successful, False otherwise
#     """
#     try:
#         # This will create only the legislation table if it doesn't exist
#         Legislation.__table__.create(engine, checkfirst=True)
#         return True
#     except Exception as e:
#         print(f"Error creating legislation table: {str(e)}")
#         return False


# def create_incidents_table(engine):
#     """
#     Create the incidents table in the database.

#     Args:
#         engine: SQLAlchemy engine instance connected to the database

#     Returns:
#         True if table creation was successful, False otherwise
#     """
#     try:
#         # This will create only the incidents table if it doesn't exist
#         Incident.__table__.create(engine, checkfirst=True)
#         return True
#     except Exception as e:
#         print(f"Error creating incidents table: {str(e)}")
#         return False

if __name__ == "__main__":
    from sqlalchemy import create_engine
    import os
    from dotenv import load_dotenv
    load_dotenv()

    POSTGRES_USER = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_DB = os.getenv("POSTGRES_DB")
    DB_ADDRESS = os.getenv("DB_ADDRESS")
    DB_PORT = os.getenv("DB_PORT")
    DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{DB_ADDRESS}:{DB_PORT}/{POSTGRES_DB}"
    print(f"Connecting to DB with string: {DATABASE_URL}")

    # Database setup
    #DATABASE_URL = 'postgresql://postgres:1234@localhost:5432/gordonlee'  # Replace with your actual database URL
    # DATABASE_URL = 'postgresql://postgres:example567@justicewatch.me:5432/postgres'
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(engine)
    print("Made all tables")
    # if create_agencies_table(engine):
    #     print("Created agencies table")
    # else:
    #     print("Couldn't create agencies table")
    # if create_legislation_table(engine):
    #     print("Created legislation table")
    # else:
    #     print("Couldn't create legislation table")
    # if create_incidents_table(engine):
    #     print("Created incidents table")
    # else:
    #     print("Couldn't create incidents table")
