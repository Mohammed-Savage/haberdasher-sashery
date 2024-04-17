from flask import Flask, make_response, jsonify, request, session, g
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
# from dotenv import dotenv_values
from flask_bcrypt import Bcrypt
from models import db, Hat, Coat, Shirt, Pant, User, Appointment
import json

# load the .env file where our secrets are stored
# config = dotenv_values(".env")

app = Flask(__name__)
app.debug = True
# get the flask secret key from the .env
# (this is how you'll store and retrieve api keys as well)
# app.secret_key = config['FLASK_SECRET_KEY']
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
# bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

db.init_app(app)

# These tables are outdated since we've imported the models.
# Create table for users. Columns: id, email, password.
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(120), nullable=False)

# # Create table for appointments. Columns: id, date, time.
# class Appointment(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     date = db.Column(db.Date, nullable=False)
#     time = db.Column(db.Time, nullable=False)

# Create route for Appointment.


# Create route for Signup.
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Valid email and password are required."}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully."}), 201


# Create route for Login.
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password."}), 401

    # To-do: Generate and return JWT token for authentication. Consult with Ka$h.
    return jsonify({"token": "some_token"}), 200


# Create route for Appointment.
@app.route("/api/appointments", methods=["POST"])
def bood_appointment():
    data = request.json
    date = data.get("date")
    time = data.get("time")

    if not date or not time:
        return jsonify({"error": "Valid date and time are required."}), 400

    new_appointment = Appointment(date=date, time=time)
    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({"message": "Appointment booked successfully."}), 201


# Create route to serve frontend React. Creates a new route for the root URL path / . This responds to HTTP GET requests by default.
@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Welcome to Ahsery!"}), 200
    # return app.send_static_file('index.html')


# Create route to access users.
@app.route("/users")
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])


# Create route to access appointments.
@app.route("/api/appointments")
def get_appointments():
    appointments = Appointment.query.all()
    return jsonify([appointment.serialize() for appointment in appointments])


# Create route to access hats.
@app.route("/hats")
def get_hats():
    hats = Hat.query.all()
    return jsonify([hat.serialize() for hat in hats])


# Create route to access coats.
@app.route("/coats")
def get_coats():
    coats = Coat.query.all()
    return jsonify([coat.serialize() for coat in coats])


# Create route to access shirts.
@app.route("/shirts")
def get_shirts():
    shirts = Shirt.query.all()
    return jsonify([shirt.serialize() for shirt in shirts])


# Create route to access pants.
@app.route("/pants")
def get_pants():
    pants = Pant.query.all()
    return jsonify([pant.serialize() for pant in pants])

    # When script is run directly and not imported as a module will create the necessary database tables and start the Flask development server.


if __name__ == "__main__":
    # This was used originally before we created our models.
    # with app.app_context():
    #     db.create_all()
    app.run(port=5555, debug=True)


# OUTDATED SQLHEAVY ROUTING FOR TO_DICT:
# from flask import Flask, jsonify
# from models import db, User, Appointment, Hat, Coat, Shirt, Pant

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
# db.init_app(app)

# # Routes to access users
# @app.route('/users')
# def get_users():
#     users = User.query.all()
#     return jsonify([dict(user.__dict__) for user in users])

# # Routes to access appointments
# @app.route('/appointments')
# def get_appointments():
#     appointments = Appointment.query.all()
#     return jsonify([dict(appointment.__dict__) for appointment in appointments])

# # Routes to access hats
# @app.route('/hats')
# def get_hats():
#     hats = Hat.query.all()
#     return jsonify([dict(hat.__dict__) for hat in hats])

# # Routes to access coats
# @app.route('/coats')
# def get_coats():
#     coats = Coat.query.all()
#     return jsonify([dict(coat.__dict__) for coat in coats])

# # Routes to access shirts
# @app.route('/shirts')
# def get_shirts():
#     shirts = Shirt.query.all()
#     return jsonify([dict(shirt.__dict__) for shirt in shirts])

# # Routes to access pants
# @app.route('/pants')
# def get_pants():
#     pants = Pant.query.all()
#     return jsonify([dict(pant.__dict__) for pant in pants])

# if __name__ == '__main__':
#     app.run(debug=True)
