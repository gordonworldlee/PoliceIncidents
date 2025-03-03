from flask import Flask, jsonify, request
from sqlalchemy import create_engine, text

app = Flask(__name__)


DB_USER = "postgres"
DB_PASSWORD = "example567"
DB_HOST = "justicewatch.me"
DB_PORT = "5432"
DB_NAME = "postgres"

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(DATABASE_URL)

def fetch_data(sql_query, params=None):
    try:
        with engine.connect() as connection:
            if params:
                result = connection.execute(text(sql_query), params)
            else:
                result = connection.execute(text(sql_query))
            rows = result.fetchall()
            column_names = result.keys()
            data = [dict(zip(column_names, row)) for row in rows]
            return data
    except Exception as e:
        print(f"Database error: {e}")
        return None

@app.route("/api/legislation", methods=["GET"])
def get_legislation():
    """
    You can now query legislation using any combination of parameters, for example:
    /api/legislation?state=CA
    /api/legislation?bill_number=AB123&session_year=2025
    /api/legislation?subjects=Education&sponsors=John%20Doe
    """
    # Get query parameters
    params = request.args.to_dict()
    
    # Build the WHERE clause dynamically
    where_clauses = []
    query_params = {}
    for key, value in params.items():
        where_clauses.append(f"\"{key}\" = :{key}")
        query_params[key] = value
    
    # Construct the SQL query
    query = "SELECT * FROM \"Legislation\""
    if where_clauses:
        query += " WHERE " + " AND ".join(where_clauses)
    
    # Execute the query
    data = fetch_data(query, query_params)
    
    if data:
        return jsonify(data)
    else:
        return jsonify({"error": "No matching legislation found."}), 404

@app.route("/api/legislation/<int:legislation_id>", methods=["GET"])
def get_legislation_by_id(legislation_id):
    query = "SELECT * FROM \"Legislation\" WHERE id = :id"
    data = fetch_data(query, {"id": legislation_id})

    if data:
        return jsonify(data[0])
    else:
        return jsonify({"error": "Legislation not found."}), 404

if __name__ == "__main__":
    app.run(debug=True)  # Turn off debug mode in production
