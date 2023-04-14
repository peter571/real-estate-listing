from app.property_images import bp

@bp.route('/property_images/<int:property_id>')
def get_property_images(property_id):
    return f"<h1>Return images of {property_id}</h1>"