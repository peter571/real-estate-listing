from datetime import datetime
from app.extensions import db
import pickle

# Property model


class Property(db.Model):
    id = db.Column(db.String, primary_key=True)
    owner_id = db.Column(db.String, db.ForeignKey('realtor.id'),
                         index=True, unique=False)
    location = db.Column(db.String, index=True, unique=False)
    description = db.Column(db.Text, index=False, unique=False)
    address = db.Column(db.String, index=False, unique=False)
    bedrooms = db.Column(db.Integer, index=False, unique=False)
    bathrooms = db.Column(db.Integer, index=False, unique=False)
    category = db.Column(db.String, index=False, unique=False)
    price = db.Column(db.Float, index=False, unique=False)
    property_type = db.Column(db.String, index=False, unique=False)
    active = db.Column(db.Boolean, index=False, default=True, unique=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    property_images = db.Column(db.PickleType, index=False, unique=False)
    size = db.Column(db.String, index=False, unique=False)

    def get_property_images(self):
        return pickle.loads(self.property_images.decode('utf-8'))

    def __repr__(self):
        return f'<Property "{self.id}">'

    # Return all properties in dictionary
    def serialize(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "location": self.location,
            "description": self.description,
            "address": self.address,
            "bedrooms": self.bedrooms,
            "bathrooms": self.bathrooms,
            "category": self.category,
            "price": self.price,
            "property_type": self.property_type,
            "active": self.active,
            "date_created": self.date_created,
            "property_images": self.property_images,
            "size": self.size
        }
