from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import database_exists

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/gordonlee'
db = SQLAlchemy()
db.init_app(app)

class User(db.Model):
    __tablename__ = 'Police Incidents'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return f"<User {self.username}>"

def populate_db():
    # Sample user data
    users = [
        User('john_doe', 'john@example.com'),
        User('jane_smith', 'jane@example.com'),
        User('bob_johnson', 'bob@example.com')
    ]

    # Add users to the session and commit
    for user in users:
        db.session.add(user)
    db.session.commit()
    print("Database populated with sample users.")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Check if the database is empty
        if User.query.count() == 0:
            populate_db()
        else:
            print("Database already contains data.")
        
    app.run(debug=True)
