from app.extensions import db
from app.models import realtor

# Property model


class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.ForeignKey(realtor.realtor_id),
                         index=True, unique=False)
    location = db.Column(db.String, index=True, unique=False)
    title = db.Column(db.String, index=False, unique=False)
    description = db.Column(db.String, index=False, unique=False)
    address = db.Column(db.String, index=False, unique=False)
    bedrooms = db.Column(db.Integer, index=False, unique=False)
    bathrooms = db.Column(db.Integer, index=False, unique=False)
    category = db.Column(db.String, index=False, unique=False)
    price = db.Column(db.Float, index=False, unique=False)
    company_mail = db.Column(db.String, index=False,
                             unique=False, nullable=True)
    website_url = db.Column(db.String, index=False,
                            unique=False, nullable=True)
    contact = db.Column(db.String, index=False, unique=False, nullable=True)
    property_type = db.Column(db.String, index=False, unique=False)
    active = db.Column(db.Boolean, index=False, unique=False)
    created = db.Column(db.String, index=False, unique=False)
