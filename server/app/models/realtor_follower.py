from app.extensions import db
from app.models import realtor
# User followers model


class Realtor_follower(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, index=True, unique=False)
    followed_id = db.Column(db.ForeignKey(
        realtor.realtor_id), index=True, unique=False)
