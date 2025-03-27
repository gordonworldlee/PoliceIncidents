# Backend Scripts

## Database directory (all related to initializing the database)

> Tip: These are listed in order of what you should run.

- createDb2.py: creates the tables in the database. Does not create a database itself, you may need to make one if the one you specified in the .env file is not found.
- main.py: does the job of populating the databases with data using the scripts in scrape.py

  - runs scrape.py: converts the downloaded data into a format that can be used by the database (data.xlsx (used for misconduct incidents), scorecard.csv (used for departments), and legislation.csv)
  - uses models.py: has all of the types of data (basically schemas written as Python classes)

## Root backend directory (for running the backend)

mainAPI2.py runs the API, on port 5001

## Envfile

The following is what is needed in the envfile for the backend and database:

```yaml
# Database
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
DB_ADDRESS=
DB_PORT=
```
