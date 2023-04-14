from app.extensions import db
from app.models import property


# Property image model


class Property_image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.ForeignKey(property.id),
                            index=True, unique=False)
    file_url = db.Column(db.String, index=False, unique=False)
