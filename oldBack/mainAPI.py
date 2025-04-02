from flask import Flask, jsonify, request
from sqlalchemy import create_engine, text
from flask_cors import CORS
import math

app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)


DB_USER="postgres"
DB_PASSWORD="example567"
DB_NAME="prod_db"
DB_HOST="justicewatch.me"
DB_PORT=5432

"""
DB_USER = "postgres"
DB_PASSWORD = "example567"
DB_HOST = "justicewatch.me"
DB_PORT = "5432"
DB_NAME = "old_prod_db"
"""
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

    Sorting:
    /api/legislation?sort_by=state&order=asc

    Searching:
    /api/legislation?search=education funding
    """
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 12, type=int)
    search_query = request.args.get('search', '', type=str)

    # Get query parameters
    params = request.args.to_dict()
    for param in ['page', 'per_page', 'search', 'sort_by', 'order']:
        if param in params:
            del params[param]

    where_clauses = []
    query_params = {}

    # Add exact match parameters
    for key, value in params.items():
        where_clauses.append(f"\"{key}\" = :{key}")
        query_params[key] = value

    # Add search parameter if provided
    if search_query:
        search_terms = search_query.split()
        search_conditions = []

        for i, term in enumerate(search_terms):
            term_param = f"%{term}%"
            param_name = f"search_term_{i}"
            search_conditions.append(f"""(
                "bill_number" ILIKE :{param_name} OR
                "title" ILIKE :{param_name} OR
                "description" ILIKE :{param_name} OR
                "sponsors" ILIKE :{param_name} OR
                "subjects" ILIKE :{param_name}
            )""")
            query_params[param_name] = term_param

        # Add all search conditions with AND between terms
        if search_conditions:
            where_clauses.append("(" + " AND ".join(search_conditions) + ")")

    sort_by = request.args.get('sort_by', 'id', type=str)
    order = request.args.get('order', 'asc', type=str)

    # Build the WHERE clause for the query
    where_clause = " WHERE " + " AND ".join(where_clauses) if where_clauses else ""

    # make SQL query
    count_query = f"SELECT COUNT(*) as count FROM \"legislation\"{where_clause}"

    count_data = fetch_data(count_query, query_params)
    total_count = count_data[0]['count'] if count_data else 0

    total_pages = math.ceil(total_count / per_page) if total_count > 0 else 0
    offset = (page - 1) * per_page

    # construct the main SQL query
    query = f"SELECT * FROM \"legislation\"{where_clause}"

    if sort_by:
        if order.lower() == 'desc':
            query += f" ORDER BY \"{sort_by}\" DESC"
        else:
            query += f" ORDER BY \"{sort_by}\" ASC"

    # pagination
    query += f" LIMIT {per_page} OFFSET {offset}"

    # execute the query
    data = fetch_data(query, query_params)
    response = {
        "legislation": data if data else [],
        "total_count": total_count,
        "total_pages": total_pages,
        "current_page": page,
        "per_page": per_page
    }
    return jsonify(response)


@app.route("/api/legislation/<int:legislation_id>", methods=["GET"])
def get_legislation_by_id(legislation_id):
    query = "SELECT * FROM \"legislation\" WHERE id = :id"
    data = fetch_data(query, {"id": legislation_id})

    if data:
        return jsonify(data[0])
    else:
        return jsonify({"error": "Legislation not found."}), 404

@app.route("/api/incidents", methods=["GET"])
def get_police_incidents():
    """
    You can now query police incidents using any combination of parameters, for example:
    /api/incidents?state=IL

    Sorting
    /api/incidents?sort_by=state&order=asc

    Searching
    /api/incidents?search=Chicago shooting
    """
    # Get pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 12, type=int)
    search_query = request.args.get('search', '', type=str)

    # Copy parameters excluding pagination params and search
    params = request.args.to_dict()
    for param in ['page', 'per_page', 'search', 'sort_by', 'order']:
        params.pop(param, None)

    where_clauses = []
    query_params = {}

    # Add exact match parameters
    for key, value in params.items():
        where_clauses.append(f"\"{key}\" = :{key}")
        query_params[key] = value

    # Add search parameter if provided
    if search_query:
        search_terms = search_query.split()
        search_conditions = []

        for i, term in enumerate(search_terms):
            term_param = f"%{term}%"
            param_name = f"search_term_{i}"
            search_conditions.append(f"""(
                "city" ILIKE :{param_name} OR
                "state" ILIKE :{param_name} OR
                "description" ILIKE :{param_name}
            )""")
            query_params[param_name] = term_param

        # Add all search conditions with AND between terms
        if search_conditions:
            where_clauses.append("(" + " AND ".join(search_conditions) + ")")

    sort_by = request.args.get('sort_by', 'id', type=str)
    order = request.args.get('order', 'asc', type=str)

    # Build the WHERE clause for the query
    where_clause = " WHERE " + " AND ".join(where_clauses) if where_clauses else ""

    # Get count for pagination
    count_query = f"SELECT COUNT(*) as count FROM \"incidents\"{where_clause}"
    count_data = fetch_data(count_query, query_params)
    total_count = count_data[0]['count'] if count_data else 0

    # Calculate pagination values
    total_pages = math.ceil(total_count / per_page) if total_count > 0 else 0
    offset = (page - 1) * per_page

    # Main query with pagination
    query = f"SELECT * FROM \"incidents\"{where_clause}"

    # Add sorting
    if sort_by:
        query += f" ORDER BY \"{sort_by}\" {'DESC' if order.lower() == 'desc' else 'ASC'}"

    query += f" LIMIT {per_page} OFFSET {offset}"

    data = fetch_data(query, query_params)

    response = {
        "incidents": data if data else [],
        "total_count": total_count,
        "total_pages": total_pages,
        "current_page": page,
        "per_page": per_page
    }

    return jsonify(response)

@app.route("/api/incidents/<int:incident_id>", methods=["GET"])
def get_police_incident_by_id(incident_id):
    query = "SELECT * FROM \"incidents\" WHERE id = :id"
    data = fetch_data(query, {"id": incident_id})

    if data:
        return jsonify(data[0])
    else:
        return jsonify({"error": "Police incident not found."}), 404


@app.route("/api/agencies", methods=["GET"])
def get_scorecard():
    """
    You can now query police incidents using any combination of parameters, for example:
    /api/agencies?state=IL
    /api/agencies?agency_name=CHICAGO&agency_type=police-department
    /api/agencies?search=Chicago Police (searches across multiple fields)

    Sorting
    /api/agencies?sort_by=state&order=asc
    """
    # get pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 12, type=int)
    search_query = request.args.get('search', '', type=str)

    # copy parameters excluding pagination params and search
    params = request.args.to_dict()
    if 'page' in params:
        del params['page']
    if 'per_page' in params:
        del params['per_page']
    if 'search' in params:
        del params['search']
    if 'sort_by' in params:
        del params['sort_by']
    if 'order' in params:
        del params['order']

    where_clauses = []
    query_params = {}

    # Add exact match parameters
    for key, value in params.items():
        where_clauses.append(f"\"{key}\" = :{key}")
        query_params[key] = value

    # Add search parameter if provided
    if search_query:
        search_terms = search_query.split()
        search_conditions = []

        for i, term in enumerate(search_terms):
            term_param = f"%{term}%"
            param_name = f"search_term_{i}"
            search_conditions.append(f"""(
                "agency_name" ILIKE :{param_name} OR
                "state" ILIKE :{param_name} OR
                "agency_type" ILIKE :{param_name}
            )""")
            query_params[param_name] = term_param

        # Add all search conditions with AND between terms
        if search_conditions:
            where_clauses.append("(" + " AND ".join(search_conditions) + ")")

    sort_by = request.args.get('sort_by', 'id', type=str)
    order = request.args.get('order', 'asc', type=str)

    # Build the WHERE clause for the query
    where_clause = " WHERE " + " AND ".join(where_clauses) if where_clauses else ""

    count_query = f"SELECT COUNT(*) as count FROM \"agencies\"{where_clause}"
    count_data = fetch_data(count_query, query_params)
    total_count = count_data[0]['count'] if count_data else 0

    #calculate total pages
    total_pages = math.ceil(total_count / per_page) if total_count > 0 else 0

    # calculate offset for pagination
    offset = (page - 1) * per_page

    query = f"SELECT * FROM \"agencies\"{where_clause}"

    # Add sorting
    if sort_by:
        if order.lower() == 'desc':
            query += f" ORDER BY \"{sort_by}\" DESC"
        else:
            query += f" ORDER BY \"{sort_by}\" ASC"

    #added this
    query += f" LIMIT {per_page} OFFSET {offset}"

    data = fetch_data(query, query_params)

    response = {
        "departments": data if data else [],
        "total_count": total_count,
        "total_pages": total_pages,
        "current_page": page,
        "per_page": per_page
    }

    return jsonify(response)


@app.route("/api/agencies/<int:scorecard_id>", methods=["GET"])
def get_scorecard_by_id(scorecard_id):
    query = "SELECT * FROM \"agencies\" WHERE id = :id"
    data = fetch_data(query, {"id": scorecard_id})

    if data:
        return jsonify(data[0])
    else:
        return jsonify({"error": "Scorecard not found."}), 404

@app.route("/api/search", methods=["GET"])
def search_all():
    """
    http://127.0.0.1:5001/api/search?q=TX
    """
    search_query = request.args.get('q', '', type=str)
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 12, type=int)

    if not search_query:
        return jsonify({
            "legislation": [],
            "incidents": [],
            "departments": [],
            "total_count": 0
        })

    # Search in legislation table
    legislation_query = """
        SELECT * FROM "legislation"
        WHERE bill_number ILIKE :search
        OR title ILIKE :search
        OR description ILIKE :search
        OR sponsors ILIKE :search
        OR subjects ILIKE :search
        LIMIT :limit OFFSET :offset
    """

    # Search in incidents table
    incidents_query = """
        SELECT * FROM "incidents"
        WHERE city ILIKE :search
        OR state ILIKE :search
        OR description ILIKE :search
        LIMIT :limit OFFSET :offset
    """

    # Search in agencies table
    agencies_query = """
        SELECT * FROM "agencies"
        WHERE agency_name ILIKE :search
        OR state ILIKE :search
        LIMIT :limit OFFSET :offset
    """

    search_param = f"%{search_query}%"
    offset = (page - 1) * per_page

    legislation_data = fetch_data(legislation_query, {
        "search": search_param,
        "limit": per_page,
        "offset": offset
    })

    incidents_data = fetch_data(incidents_query, {
        "search": search_param,
        "limit": per_page,
        "offset": offset
    })

    agencies_data = fetch_data(agencies_query, {
        "search": search_param,
        "limit": per_page,
        "offset": offset
    })

    # Count total results
    total_count = len(legislation_data or []) + len(incidents_data or []) + len(agencies_data or [])

    response = {
        "legislation": legislation_data if legislation_data else [],
        "incidents": incidents_data if incidents_data else [],
        "departments": agencies_data if agencies_data else [],
        "total_count": total_count,
        "current_page": page,
        "per_page": per_page
    }

    return jsonify(response)

@app.route("/api", methods=["GET"])
def get_api_info(scorecard_id):
    return jsonify({
        "message": "JusticeWatch API",
        "version": "1.0.0 (old API)"
    })

if __name__ == "__main__":
    print(app.url_map)
    app.run(host='0.0.0.0', port=5002, debug=True)  # Turn off debug mode in production
