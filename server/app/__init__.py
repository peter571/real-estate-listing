from flask import Flask
from flask_cors import CORS
from config import Config
from app.extensions import db
from app.main import bp as main_bp
from app.realtors import bp as realtors_bp
from app.favorites import bp as favorites_bp
from app.properties import bp as properties_bp
from app.user_followers import bp as user_followers_bp
from app.utils import bp as utils_bp
import firebase_admin
from firebase_admin import credentials
import os


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)
    # Initialize Flask extensions here
    # Init db
    db.init_app(app)

    # Register blueprints here

    app.register_blueprint(main_bp)
    app.register_blueprint(favorites_bp)
    app.register_blueprint(properties_bp)
    app.register_blueprint(user_followers_bp)
    app.register_blueprint(realtors_bp)
    app.register_blueprint(utils_bp)
    #projects/603732657929/secrets/FIREBASE_KEYS
    # Initialize Firebase Admin SDK
    # cred = credentials.Certificate("./realtors-254.json")

    cred = credentials.ApplicationDefault()
    if not firebase_admin._apps:  # Check if Firebase has already been initialized
        firebase_admin.initialize_app(cred, { 'storageBucket': os.environ.get('BUCKET') })

    return app
