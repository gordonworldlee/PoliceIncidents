from ast import Not
from flask import Flask, jsonify, request, Blueprint
from sqlalchemy import create_engine, text, select, func, desc, or_, String
from sqlalchemy.orm import sessionmaker, scoped_session
from flask_cors import CORS
from dbconnector import connect_to_db
from models import Legislation, Incident, Agency, Base

import math

engine = connect_to_db()
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base.query = db_session.query_property()

app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)

# Make it so that all API requests start with /api
api = Blueprint('api', __name__, url_prefix='/api')

#######################
def get_pagination_metadata(query, per_page):
    """
    Calculate pagination metadata for a SQLAlchemy query.

    Args:
        query: The SQLAlchemy query object (before pagination is applied)
        per_page: Number of items per page

    Returns:
        Dictionary containing total_count and total_pages
    """
    # We need to create a count query based on the original query
    # but without any ordering or limits
    subquery = query.subquery()
    count_query = select(func.count()).select_from(subquery)

    # Execute the count query to get the total number of items
    total_count = db_session.scalar(count_query)

    # Calculate the total number of pages
    total_pages = math.ceil(total_count / per_page) if total_count > 0 else 0

    return {
        "total_count": total_count,
        "total_pages": total_pages
    }

def paginate_request(query, page_num, per_page):
    """
    Add pagination parameters to a SQLAlchemy query.

    Args:
        query: The SQLAlchemy query object to paginate
        page_num: The page number to fetch (0-indexed)
        per_page: Number of items per page

    Returns:
        Modified query with pagination applied
    """
    # Calculate the offset based on the page number and items per page
    offset = page_num * per_page

    # Add the limit and offset to the query
    paginated_query = query.limit(per_page).offset(offset)

    return paginated_query

def paginate(name_of_items, items, total_count, total_pages, current_page, per_page):
    return {
        name_of_items: items,
        "total_count": total_count,
        "total_pages": total_pages,
        "current_page": current_page,
        "per_page": per_page
    }



####################
@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

def serialize_all(input):
    return [item.serialize() for item in input]

##################################################
### Legislation
##################################################
@api.route("/legislation", methods=["GET"])
def get_legislation():
    # Pagination query params
    page = int(request.args.get("page", 0))
    per_page = int(request.args.get("per_page", 10))
    # stmt = select(Legislation).offset(page * 10).limit(per_page)
    stmt = select(Legislation)

    # Search query params
    if "id" in request.args:
        stmt = stmt.where(Legislation.id == request.args["id"])
    if "bill_number" in request.args:
        stmt = stmt.where(Legislation.bill_number == request.args["bill_number"])
    if "state" in request.args:
        stmt = stmt.where(Legislation.state == request.args["state"])
    if "title" in request.args:
        title = request.args["title"]
        for word in title.split():
            stmt = stmt.where(Legislation.title.contains(word))
    if "description" in request.args:
        description = request.args["description"]
        for word in description.split():
            stmt = stmt.where(Legislation.description.contains(word))

    if "search" in request.args:
        search_term = request.args["search"]
        search_conditions = []
        for column in Legislation.__table__.columns:
            # Only apply ILIKE to text-compatible columns
            if isinstance(column.type, String):
                search_conditions.append(column.ilike(f"%{search_term}%"))
        stmt = stmt.where(or_(*search_conditions))  # Combine conditions with OR


    # Sorting query params
    sort_by = request.args.get("sort_by", None)  # Column to sort by
    sort_order = request.args.get("sort_order", "asc")  # Sort order: 'asc' or 'desc'

    if sort_by:
        column = getattr(Legislation, sort_by, None)
        if column:  # Ensure the column exists on the model
            if sort_order == "desc":
                stmt = stmt.order_by(desc(column))
            else:
                stmt = stmt.order_by(column)


    pagination_metadata = get_pagination_metadata(stmt, per_page)

    stmt = paginate_request(stmt, page, per_page)
    result = serialize_all(db_session.scalars(stmt))
    # print(stmt)
    return paginate("legislation", result, pagination_metadata["total_count"], pagination_metadata["total_pages"], page, per_page)

@api.route("/legislation/<int:legislation_id>", methods=["GET"])
def get_legislation_by_id(legislation_id):
    stmt = select(Legislation).where(Legislation.id == legislation_id)
    result = db_session.scalars(stmt).one_or_none()

    if result is None:
        return {"error": "Legislation not found"}, 404
    else:
        return result.serialize()


##################################################
### Incidents
##################################################
@api.route("/incidents", methods=["GET"])
def get_incidents():
    # Pagination query params
    # Pagination query params
    page = int(request.args.get("page", 0))
    per_page = int(request.args.get("per_page", 10))
    # stmt = select(Legislation).offset(page * 10).limit(per_page)
    stmt = select(Incident)

    # Search query params
    if "id" in request.args:
        stmt = stmt.where(Incident.id == request.args["id"])
    if "state" in request.args:
        stmt = stmt.where(Incident.state == request.args["state"])
    if "encounter_type" in request.args:
        stmt = stmt.where(Incident.encounter_type == request.args["encounter_type"])
    if "city" in request.args:
        stmt = stmt.where(Incident.city == request.args["city"])

    if "search" in request.args:
        search_term = request.args["search"]
        search_conditions = []
        for column in Incident.__table__.columns:
            # Only apply ILIKE to text-compatible columns
            if isinstance(column.type, String):
                search_conditions.append(column.ilike(f"%{search_term}%"))
        stmt = stmt.where(or_(*search_conditions))  # Combine conditions with OR

    # Sorting query params
    sort_by = request.args.get("sort_by", None)  # Column to sort by
    sort_order = request.args.get("sort_order", "asc")  # Sort order: 'asc' or 'desc'

    if sort_by:
        column = getattr(Incident, sort_by, None)
        if column:  # Ensure the column exists on the model
            if sort_order == "desc":
                stmt = stmt.order_by(desc(column))
            else:
                stmt = stmt.order_by(column)
    pagination_metadata = get_pagination_metadata(stmt, per_page)

    stmt = paginate_request(stmt, page, per_page)
    result = serialize_all(db_session.scalars(stmt))
    print(stmt)
    return paginate("incidents", result, pagination_metadata["total_count"], pagination_metadata["total_pages"], page, per_page)



@api.route("/incidents/<int:incident_id>", methods=["GET"])
def get_incident_by_id(incident_id):
    stmt = select(Incident).where(Incident.id == incident_id)
    result = db_session.scalars(stmt).one_or_none()

    if result is None:
        return {"error": "Incident not found"}, 404
    else:
        return result.serialize()

##################################################
### Agencies
##################################################
@api.route("/agencies", methods=["GET"])
def get_agencies():
    # Pagination query params
    # Pagination query params
    page = int(request.args.get("page", 0))
    per_page = int(request.args.get("per_page", 10))
    # stmt = select(Legislation).offset(page * 10).limit(per_page)
    stmt = select(Agency)

    # Search query params
    if "id" in request.args:
        stmt = stmt.where(Agency.id == request.args["id"])
    elif "ori_identifier" in request.args:
        stmt = stmt.where(Agency.ori_identifier == request.args["ori_identifier"])
    if "state" in request.args:
        stmt = stmt.where(Agency.state == request.args["state"])
    if "agency_name" in request.args:
        stmt = stmt.where(Agency.agency_name == request.args["agency_name"])

    if "search" in request.args:
        search_term = request.args["search"]
        search_conditions = []
        for column in Agency.__table__.columns:
            # Only apply ILIKE to text-compatible columns
            if isinstance(column.type, String):
                search_conditions.append(column.ilike(f"%{search_term}%"))
        stmt = stmt.where(or_(*search_conditions))  # Combine conditions with OR


    # Sorting query params
    sort_by = request.args.get("sort_by", None)  # Column to sort by
    sort_order = request.args.get("sort_order", "asc")  # Sort order: 'asc' or 'desc'

    if sort_by:
        column = getattr(Agency, sort_by, None)
        if column:  # Ensure the column exists on the model
            if sort_order == "desc":
                stmt = stmt.order_by(desc(column))
            else:
                stmt = stmt.order_by(column)

    pagination_metadata = get_pagination_metadata(stmt, per_page)

    stmt = paginate_request(stmt, page, per_page)
    result = serialize_all(db_session.scalars(stmt))
    print(stmt)
    return paginate("departments", result, pagination_metadata["total_count"], pagination_metadata["total_pages"], page, per_page)



@api.route("/agencies/<int:agency_id>", methods=["GET"])
def get_agency_by_id(agency_id):
    stmt = select(Agency).where(Agency.id == agency_id)
    result = db_session.scalars(stmt).one_or_none()

    if result is None:
        return {"error": "Agency not found"}, 404
    else:
        return result.serialize()

app.register_blueprint(api)

@app.route("/", methods=["GET"])
def get_api_info():
    return {
        "message": "JusticeWatch API",
        "version": "2.0.0 (new api)"
    }

if __name__ == "__main__":

    print(app.url_map)
    app.run(host='0.0.0.0', port=5002, debug=True)  # Turn off debug mode in production
