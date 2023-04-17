from app.user_followers import bp
from app.models.realtor_follower import Realtor_follower
from flask import jsonify, request
from app.extensions import db

# Get realtor followers


@bp.route('/realtor_followers/<realtor_id>')
def get_realtor_followers(realtor_id):
    result = Realtor_follower.query.filter(
        Realtor_follower.followed_id == realtor_id).all()
    if result == None:
        return jsonify([]), 200
    followers = [follower.follower_id for follower in result]
    return jsonify(followers), 200

# follow/unfollow realtor


@bp.post('/realtor_followers/follow/<realtor_id>')
def follow(realtor_id):
    request_data = request.get_json()

    if request_data['action'] == 'follow':
        new_follow = Realtor_follower(
            follower_id=request_data['follower_id'], followed_id=realtor_id)
        try:
            db.session.add(new_follow)
            db.session.commit()
            result = [follower.follower_id for follower in Realtor_follower.query.filter(
                Realtor_follower.followed_id == realtor_id).all()]
            return jsonify(result), 200
        except:
            db.session.rollback()
            return "An error occured", 500

    elif request_data['action'] == 'unfollow':
        try:
            db.session.delete(Realtor_follower.query.filter(
                Realtor_follower.follower_id == request_data['follower_id']))
            result = [follower.follower_id for follower in Realtor_follower.query.filter(
                Realtor_follower.followed_id == realtor_id).all()]
            return jsonify(result), 200
        except:
            db.session.rollback()
            return "An error occured", 500
    return 'error'
