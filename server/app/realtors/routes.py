from app.realtors import bp
from app.models.realtor import Realtor
from flask import jsonify, request
from app.extensions import db

# Gets all realtors
@bp.route('/realtors')
def get_realtors():
    realtors = Realtor.query.all()
    return jsonify([realtor.serialize() for realtor in realtors])

# Registers a new realtor
@bp.post('/realtor/register-profile')
def register_realtor():
    request_data = request.get_json()

    new_realtor = Realtor(realtor_id=request_data['user_id'],
                          company_name=request_data['company_name'],
                          description=request_data['description'],
                          profile_picture=request_data['profile_picture'],
                          company_mail=request_data['company_mail'],
                          website_url=request_data['website_url'],
                          contact=request_data['contact'])
    try:
        db.session.add(new_realtor)
        db.session.commit()
        return f"Registered {new_realtor.company_name} successfully!", 201
    except:
        db.session.rollback()
        return "An error occured!", 500

# Get realtor by ID
@bp.get('/realtor/get-realtor/<id>')
def get_realtor(id):
    result = Realtor.query.get(id)
    if result == None:
        return f"User of ID {id} not found"
    
    return jsonify(result.serialize()), 200

# Get all realtor properties
@bp.get('/realtor-properties/<realtor_id>')
def get_realtor_properties(realtor_id):
    result = Realtor.query.get(realtor_id).properties.all()

    if result == None:
        return jsonify([])
    
    serialized_results = [item.serialize() for item in result]
    return jsonify(serialized_results), 200