from app.realtors import bp

@bp.route('/realtors')
def get_realtors():
    return "<h1>All Realtors</h1>"