from ast import Not
from flask import Flask, jsonify, request, Blueprint
from sqlalchemy import create_engine, text, select
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

# Make it so that all API requests start with /api/v2
api = Blueprint('api_v2', __name__, url_prefix='/api/v2')

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
    if "page" in request.args:
        page = int(request.args["page"])
        per_page = int(request.args.get("per_page", 10))
        stmt = select(Legislation).offset(page * 10).limit(per_page)
    else:
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

    result = serialize_all(db_session.scalars(stmt))

    return result

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
    if "page" in request.args:
        page = int(request.args["page"])
        per_page = int(request.args.get("per_page", 10))
        stmt = select(Incident).offset(page * 10).limit(per_page)
    else:
        stmt = select(Incident)

    # Search query params
    if "id" in request.args:
        stmt = stmt.where(Incident.id == request.args["id"])

    result = serialize_all(db_session.scalars(stmt))

    return result


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
    if "page" in request.args:
        page = int(request.args["page"])
        per_page = int(request.args.get("per_page", 10))
        stmt = select(Agency).offset(page * 10).limit(per_page)
    else:
        stmt = select(Agency)

    # Search query params
    if "id" in request.args:
        stmt = stmt.where(Agency.id == request.args["id"])

    result = serialize_all(db_session.scalars(stmt))

    return result


@api.route("/agencies/<int:agency_id>", methods=["GET"])
def get_agency_by_id(agency_id):
    stmt = select(Agency).where(Agency.id == agency_id)
    result = db_session.scalars(stmt).one_or_none()

    if result is None:
        return {"error": "Agency not found"}, 404
    else:
        return result.serialize()

app.register_blueprint(api)

if __name__ == "__main__":

    print(app.url_map)
    app.run(host='0.0.0.0', port=5001, debug=True)  # Turn off debug mode in production
