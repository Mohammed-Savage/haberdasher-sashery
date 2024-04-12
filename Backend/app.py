# Setting up imports.
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize Database.
app = Flask(__name__)
# Run app in debug mode.
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# Disable SQLALCHEMY_TRACK_MODIFICATIONS to conserve memory.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
db.init_app(app)

# Create table for users. Columns: id, email, password.
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# Create table for appointments. Columns: id, date, time.
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)

# Create route for Appointment.

# Create route for Signup.
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Valid email and password are required.'}), 400
    
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully.'}), 201

# Create route for Login.
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid email or password.'}), 401
    
    # To-do: Generate and return JWT token for authentication. Consult with Ka$h.
    return jsonify({'token': 'some_token'}), 200

# Create route for Appointment.
@app.route('/api/appointments', methods=['POST'])
def bood_appointment():
    data = request.json
    date = data.get('date')
    time = data.get('time')

    if not date or not time:
        return jsonify({'error': 'Valid date and time are required.'}), 400

    new_appointment = Appointment(date=date, time=time)
    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({'message': 'Appointment booked successfully.'}), 201

# Create route to serve frontend React. Creates a new route for the root URL path / . This responds to HTTP GET requests by default.
@app.route('/')
def index():
    # return app.send_static_file('index.html')


# When script is run directly and not imported as a module will create the necessary database tables and start the Flask development server.
if __name__ == '__main__':
    db.create_all()
    app.run(port=5555, debug=True)