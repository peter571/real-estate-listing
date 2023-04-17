from app.favorites import bp
from app.models.favorite import Favorite
from app.models.property import Property
from flask import jsonify

@bp.route('/favorites/<user_id>')
def get_user_favorites(user_id):
    favorite_items = [item.property_id for item in Favorite.query.filter_by(user_id=user_id).all()]
    if favorite_items is None:
        return jsonify([]), 200
    try:
        favorite_items_with_details = [Property.query.get(item).serialize() for item in favorite_items]
        return jsonify(favorite_items_with_details), 200
    except Exception as e:
        return jsonify(e), 500
