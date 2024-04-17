# Setting up our imports.
import os
from flask import Flask
from faker import Faker
from models import db, User, Appointment, Hat, Coat, Shirt, Pant
import random
import string

fake = Faker()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
db.init_app(app)


# Create table for users. Columns: id, email, password, first name, last name.
def generate_users(num_users):
    for _ in range(num_users):
        email = fake.email()
        password = "".join(random.choices(string.ascii_letters + string.digits, k=8))
        first_name = fake.first_name()
        last_name = fake.last_name()
        user = User(
            email=email, password=password, first_name=first_name, last_name=last_name
        )
        db.session.add(user)
    db.session.commit()


# Create table for appointments. Columns: id, user, date, time.
def generate_appointments(num_appointments):
    users = User.query.all()
    for _ in range(num_appointments):
        user = random.choice(users)
        date = fake.date_this_year()
        time = fake.time()
        appointment = Appointment(date=date, time=time, user_id=user.id)
        db.session.add(appointment)
    db.session.commit()

# Create table for hats. Columns: id, name, image, price, description.
def generate_hats(num_hats):
    for _ in range(num_hats):
        name = fake.word()
        image = fake.image_url()
        price = random.randint(10, 100)
        description = fake.text()
        hat = Hat(name=name, image=image, price=price, description=description)
        db.session.add(hat)
    db.session.commit()

# Create table for coats. Columns: id, name, image, price, description.
def generate_coats(num_coats):
    for _ in range(num_coats):
        name = fake.word()
        image = fake.image_url()
        price = random.uniform(50, 200)
        description = fake.text()
        coat = Coat(name=name, image=image, price=price, description=description)
        db.session.add(coat)
    db.session.commit()

# Create table for shirts. Columns: id, name, image, price, description.
def generate_shirts(num_shirts):
    for _ in range(num_shirts):
        name = fake.word()
        image = fake.image_url()
        price = random.uniform(20, 80)
        description = fake.text()
        shirt = Shirt(name=name, image=image, price=price, description=description)
        db.session.add(shirt)
    db.session.commit()

# Create table for pants. Columns: id, name, image, price, description.
def generate_pants(num_pants):
    for _ in range(num_pants):
        name = fake.word()
        image = fake.image_url()
        price = random.uniform(30, 100)
        description = fake.text()
        pant = Pant(name=name, image=image, price=price, description=description)
        db.session.add(pant)
    db.session.commit()

# Ensure our script only executes when run directly (not when imported as a module).
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        generate_users(10)
        generate_appointments(10)
        generate_hats(5)
        generate_coats(5)
        generate_shirts(5)
        generate_pants(5)
