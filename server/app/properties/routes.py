from app.properties import bp

@bp.route('/properties')
def get_all_properties():
    return "All Properties"

@bp.get('/property/<int:property_id>')
def get_property(property_id):
    return f"Return property {property_id}"