from app.user_followers import bp

@bp.route('/realtor-followers/<int:realtor_id>')
def get_realtor_followers(realtor_id):
    return f"Followers of {realtor_id}"