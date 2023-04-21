from app.favorites import bp
from app.models.favorite import Favorite
from app.models.property import Property
from flask import jsonify, request
from app.extensions import db

# Get user favorites


@bp.get('/favorites/<user_id>')
def get_user_favorites(user_id):
    favorite_items = [
        item.property_id for item in Favorite.query.filter_by(user_id=user_id).all()]
    if favorite_items is None:
        return jsonify([]), 200
    try:
        favorite_items_with_details = [Property.query.get(
            item).serialize() for item in favorite_items]
        return jsonify(favorite_items_with_details), 200
    except Exception as e:
        return jsonify(e), 500

# Add property to favorites


@bp.post('/favorites/add_to_favorites')
def add_to_favorite():
    request_data = request.get_json()
    result = Favorite.query.filter(
        Favorite.property_id == request_data['property_id'], Favorite.user_id == request_data['user_id']).first()
    if result != None:
        return jsonify(result.serialize()), 200
    new_favorite = Favorite(
        property_id=request_data['property_id'], user_id=request_data['user_id'])

    db.session.add(new_favorite)
    try:
        db.session.commit()
        return jsonify(new_favorite.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify("An error occurred"), 500

# Check property is already user favorite


@bp.get('/favorites/check_property/<user_id>/<property_id>')
def check_property_exists(user_id, property_id):
    result = Favorite.query.filter(
        Favorite.property_id == property_id, Favorite.user_id == user_id).first()
    
    if result is None:
        return jsonify("False")
    return jsonify("True")
