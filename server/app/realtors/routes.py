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


@bp.post('/realtor/register_profile')
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

# Update realtor details


@bp.patch('/realtor/update_details/<realtor_id>')
def update_realtor_details(realtor_id):
    realtor_details = Realtor.query.get(realtor_id)
    request_data = request.get_json()

    if realtor_details is None:
        return "bad request", 404

    try:
        realtor_details.company_name = request_data['company_name']
        realtor_details.description = request_data['description']
        realtor_details.profile_picture = request_data['profile_picture']
        realtor_details.company_mail = request_data['company_mail']
        realtor_details.website_url = request_data['website_url']
        realtor_details.contact = request_data['contact']
        db.session.commit()
        return jsonify(Realtor.query.get(realtor_id).serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(e), 500

# Get realtor by ID


@bp.get('/realtor/get_realtor/<id>')
def get_realtor(id):
    result = Realtor.query.get(id)
    if result is None:
        return f"User of ID {id} not found"

    return jsonify(result.serialize()), 200

# Get all realtor properties


@bp.get('/realtor/realtor_properties/<realtor_id>')
def get_realtor_properties(realtor_id):
    result = Realtor.query.get(realtor_id).properties.all()

    if result is None:
        return jsonify([])

    serialized_results = [item.serialize() for item in result]
    return jsonify(serialized_results), 200


# Activate/Deactivate account status

@bp.patch('/realtor/account_status/<realtor_id>')
def change_account_status(realtor_id):
    realtor_details = Realtor.query.get(realtor_id)
    request_data = request.get_json()

    if realtor_details is None:
        return "bad request", 404
    try:
        if request_data['action'] == 'activate':
            realtor_details.active = True
            db.session.commit()
            return jsonify(Realtor.query.get(realtor_id).serialize()), 200
        elif request_data['action'] == 'deactivate':
            realtor_details.active = False
            db.session.commit()
            return jsonify(Realtor.query.get(realtor_id).serialize()), 200
        else:
            return "bad request", 404
    except Exception as e:
        return "An error occured", 500
