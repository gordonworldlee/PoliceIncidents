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
CORS(app)

# Make it so that all API requests start with /api/v2
api = Blueprint('api_v2', __name__, url_prefix='/api/v2')

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

##################################################
### Legislation
##################################################
@api.route("/legislation", methods=["GET"])
def get_legislation():
    stmt = select(Legislation)
    # print(db_session.scalars(stmt).first().__dict__)
    # return {"hi": "test"}
    x = [legislation.__dict__ for legislation in db_session.scalars(stmt)]
    # print(x)
    # remove "_sa_instance_state" from all dicts in x
    for legislation in x:
        del legislation['_sa_instance_state']
    return x


@api.route("/legislation/<int:legislation_id>", methods=["GET"])
def get_legislation_by_id(legislation_id):
    print("not implemented")
    raise NotImplementedError


##################################################
### Incidents
##################################################
@api.route("/incidents", methods=["GET"])
def get_police_incidents():
    print("not implemented")
    raise NotImplementedError


@api.route("/incidents/<int:incident_id>", methods=["GET"])
def get_police_incident_by_id(incident_id):
    print("not implemented")
    raise NotImplementedError

##################################################
### Agencies
##################################################
@api.route("/agencies", methods=["GET"])
def get_scorecard():
    print("not implemented")
    raise NotImplementedError


@api.route("/agencies/<int:scorecard_id>", methods=["GET"])
def get_scorecard_by_id(scorecard_id):
    print("not implemented")
    raise NotImplementedError


if __name__ == "__main__":
    app.register_blueprint(api)
    print(app.url_map)
    app.run(host='0.0.0.0', port=5001, debug=True)  # Turn off debug mode in production
