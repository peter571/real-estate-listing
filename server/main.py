# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# import firebase_admin
# from firebase_admin import credentials, auth
from app.extensions import db
from app.models.property import Property
from app.models.realtor import Realtor
from app.models.realtor_follower import Realtor_follower

from app.models.property_image import Property_image

# cred = credentials.Certificate("./realtors-254.json")
# firebase_admin.initialize_app(cred)

# user_list = auth.list_users()

r1 = Realtor(realtor_id=1,
             company_name="254 REALTORS",
             description="Description of 254 REALTORS",
             profile_picture="some pic url",
             company_mail="254@mail.com",
             website_url="254realtors.com",
             contact="0782235363636")


r2 = Realtor(realtor_id=2,
             company_name="MVP REALTORS",
             description="Description of MV REALTORS",
             profile_picture="some pic url",
             company_mail="MVP@mail.com",
             website_url="MVPrealtors.com",
             contact="57474924454554")

p1 = Property(owner_id=1, location="Nyeri", title="Chicago apartments", description="descr for Nyeri apartments",
              address="address 124, kh", bedrooms=4, bathrooms=3, category="penthouse", price=123000, property_type="penthouse")
p2 = Property(owner_id=1, location="karatina", title="Karatina apartments", description="descr for karatina apartments",
              address="address 124, kh", bedrooms=4, bathrooms=3, category="penthouse", price=123000, property_type="mansion")
p3 = Property(owner_id=2, location="Mwea", title="Mwea apartments", description="descr for mwea apartments",
              address="address 124, kh", bedrooms=4, bathrooms=3, category="penthouse", price=123000, property_type="banglow")

f1 = Realtor_follower(follower_id=101, followed_id=1)
f2 = Realtor_follower(follower_id=102, followed_id=1)
f3 = Realtor_follower(follower_id=103, followed_id=1)
f4 = Realtor_follower(follower_id=104, followed_id=2)
f5 = Realtor_follower(follower_id=105, followed_id=2)

p1_images = Property_image(property_id=1,
                           file_url="pic url")
p2_images = Property_image(property_id=2,
                           file_url="pic url")
p3_images = Property_image(property_id=2,
                           file_url="pic url")

db.drop_all()
db.create_all()

db.session.add(r1)
db.session.commit()
db.session.add(r2)
db.session.commit()
db.session.add(p1)
db.session.commit()
db.session.add(p2)
db.session.commit()
db.session.add(p3)
db.session.commit()
db.session.add(f1)
db.session.commit()
db.session.add(f2)
db.session.commit()
db.session.add(f3)
db.session.commit()
db.session.add(f4)
db.session.commit()
db.session.add(f5)
db.session.commit()

db.session.add(p1_images)
db.session.commit()
db.session.add(p2_images)
db.session.commit()
db.session.add(p3_images)
db.session.commit()
