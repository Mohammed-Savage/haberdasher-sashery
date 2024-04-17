from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy import ForeignKey
import string, datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)

    appointments = relationship("Appointment", back_populates="user", lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            # If I'm getting serialization errors I may need to change the serialization rules to add the following:
            # 'appointments': [appointment.serialize() for appointment in self.appointments]
        }

class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    # This stores the date as a Python specific object and is the most accurate way to use this information: time = db.Column(db.Time, nullable=False)
    time = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)

    # If I'm getting errors I might need to include the following:
    # user = relationship("User", back_populates="appointments")

    def serialize(self):
        return {
            'id': self.id,
            'date': str(self.date),
            # If I'm getting errors I might need to change the date to the following format: 'date': self.date, . That will make the date a date object.
            'time': self.time,
            'user_id': self.user_id
        }

class Hat(db.Model):
    __tablename__ = 'hats'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)

class Coat(db.Model):
    __tablename__ = 'coats'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)

class Shirt(db.Model):
    __tablename__ = 'shirts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)

class Pant(db.Model):
    __tablename__ = 'pants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)