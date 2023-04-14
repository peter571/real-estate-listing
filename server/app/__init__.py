from flask import Flask
from config import Config
from app.extensions import db
from app.main import bp as main_bp
from app.realtors import bp as realtors_bp
from app.property_images import bp as property_images_bp
from app.properties import bp as properties_bp
from app.user_followers import bp as user_followers_bp


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Init db
    db.init_app(app)
    # Initialize Flask extensions here

    # Register blueprints here
    # Home page

    app.register_blueprint(main_bp)

    # Realtors endpoints
    app.register_blueprint(property_images_bp)
    app.register_blueprint(properties_bp)
    app.register_blueprint(user_followers_bp)
    app.register_blueprint(realtors_bp)

    @app.route('/test/')
    def test_page():
        return '<h1>Testing the Flask Application Factory Pattern</h1>'

    return app
