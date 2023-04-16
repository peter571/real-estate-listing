from app.extensions import db


# Property image model


class Property_image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'),
                            index=True, unique=False)
    file_url = db.Column(db.String, index=False, unique=False)

    def __repr__(self):
        return f'<Propert image "{self.file_url}">'

    def serialize(self):
        return {
            "id": self.id,
            "property_id": self.property_id,
            "file_url": self.file_url
        }
