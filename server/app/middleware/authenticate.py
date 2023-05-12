from flask import request
import firebase_admin
from firebase_admin import auth, credentials
from pyparsing import wraps


cred = credentials.Certificate("./realtors-254.json")
firebase_admin.initialize_app(cred)


def authenticate_user(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if not request.headers.get('Authorization'):
            return {'message': 'No token provided'}, 400
        try:
            user = auth.verify_id_token(request.headers['Authorization'])
            request.user = user
        except:
            return {'message': 'Invalid token provided.'}, 400
        return f(*args, **kwargs)
    return wrap
