from flask import Blueprint

bp = Blueprint("property_images", __name__)

from app.property_images import routes