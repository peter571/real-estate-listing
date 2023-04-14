from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("./realtors-254.json")
firebase_admin.initialize_app(cred)

# user_list = auth.list_users()

#app = Flask(__name__)
#app.config["SECRET_KEY"] = "my-secret"
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myDB.db'
# disable from tracking any modifications
#app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Init
#db = SQLAlchemy(app)

# @app.get('/')
# def index():
#     return "Hello World"
