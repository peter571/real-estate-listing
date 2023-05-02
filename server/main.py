import json
import requests
import pickle
import uuid
# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# import firebase_admin
# from firebase_admin import credentials, auth
from app.extensions import db
from app.models.property import Property
from app.models.realtor import Realtor
from app.models.realtor_follower import Realtor_follower
from app.models.favorite import Favorite
from app import create_app

# cred = credentials.Certificate("./realtors-254.json")
# firebase_admin.initialize_app(cred)

# user_list = auth.list_users()
url = "http://127.0.0.1:5000/property/new_property/c63abf5a-5d11-4824-984c-63e9ccf25c0b"

with open("data2.json", "r") as file:
    data = json.load(file)
    i = 0

    for p in data:
        property = p["data"]["home"]
        try:
            if property['description']["sqft"] != None and property['status'] != None and property['list_price'] != None and property['description']['type'] != None and property['photos'] != None and property['location']['address']['city'] != None and property['description']['text'] != None and property['description']['beds'] != None and property['description']['baths'] != None:
                try:

                    response = requests.post(url, json={
                        "location": property['location']['address']['city'],
                        "description": property['description']['text'],
                        "property_images": [item['href']
                                            for item in property['photos']],
                        "address": property['location']['address']['line'],
                        "bedrooms": property['description']['beds'],
                        "bathrooms": property['description']['baths'],
                        "category": property['description']['type'],
                        "price": property['list_price'],
                        "property_type": property['status'],
                        "size": property['description']["sqft"]}, headers={'Content-Type': 'application/json'})
                    print(response.text)
                    
                except Exception as e:
                    print("error", e)
        except Exception as e:
            print(e)
