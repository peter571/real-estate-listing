from app.extensions import db


# Realtor model


class Realtor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    realtor_id = db.Column(db.Integer, index=True, unique=True)
    company_name = db.Column(db.String(100), index=False, unique=False)
    description = db.Column(db.String, index=False, unique=False)
    profile_picture = db.Coulmn(db.String, index=False, unique=False)
    created = db.Column(db.String, index=False, unique=False)

    def __repr__(self):
        return f'<Realtor "{self.company_name}">'
