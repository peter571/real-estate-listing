from app.properties import bp
from app.models.property import Property
from app.models.realtor import Realtor
from flask import jsonify, request
from app.extensions import db
import pickle

# Get all properties


@bp.route('/property/all_properties')
def get_all_properties():
    # Query the table with all properties
    properties = Property.query.all()
    # If properties is None return a empty list
    if properties == None:
        return [], 200
    # init an empty list
    list_items_with_images = []

    # Iterate the properties while appending the list with images of the property
    for property_item in properties:
        listed_property = property_item.serialize()
        listed_property["property_images"] = property_item.get_property_images()
        list_items_with_images.append(listed_property)

    return jsonify(list_items_with_images)

# Get a property of a specific ID


@bp.get('/property/<property_id>')
def get_property(property_id):
    # Query the db for the property of `id`
    result = Property.query.get(property_id)
    # Check if property is not found
    if result == None:
        # Return error msg
        return jsonify({"msg": f"property of id {property_id} not found"}), 200
    # Get the images of the property and return only the url
    property_images = result.get_property_images()
    # Convert the property values to dictionary
    property_id_result = result.serialize()
    # Append the value of property_images with a list of images of the property
    property_id_result["property_images"] = property_images
    return jsonify(property_id_result), 200

# post a property to the db


@bp.post('/property/new_property/<realtor_id>')
def create_property(realtor_id):
    user = Realtor.query.get(realtor_id)
    if user == None:
        return "Unauthorized user", 401

    request_data = request.get_json()
    # Create a new property
    new_property = Property(owner_id=realtor_id,
                            location=request_data['location'],
                            title=request_data['title'],
                            description=request_data['description'],
                            property_images=pickle.dumps(
                                request_data['property_images']),
                            address=request_data['address'],
                            bedrooms=request_data['bedrooms'],
                            bathrooms=request_data['bathrooms'],
                            category=request_data['category'],
                            price=request_data['price'],
                            property_type=request_data['property_type'],
                            size=request_data["size"])

    try:
        db.session.add(new_property)
        db.session.commit()

        return jsonify(f"{new_property.title} created successfully"), 201
    except Exception as e:
        db.session.rollback()
        return "An error occurred", 500

# Update property


@bp.patch('/property/update_property/<realtor_id>/<property_id>')
def update_property(realtor_id, property_id):
    property_details = Property.query.get(property_id)
    request_data = request.get_json()

    if property_details is None:
        return "Bad request", 404
    print(property_details.owner_id, realtor_id)
    if str(property_details.owner_id) != str(realtor_id):
        return jsonify("Not the owner of property"), 403

    try:
        property_details.location = request_data['location']
        property_details.title = request_data['title']
        property_details.description = request_data['description']
        property_details.property_images = pickle.dumps(
            request_data['property_images'])
        property_details.address = request_data['address']
        property_details.bedrooms = request_data['bedrooms']
        property_details.bathrooms = request_data['bathrooms']
        property_details.category = request_data['category']
        property_details.price = request_data['price']
        property_details.property_type = request_data['property_type']
        db.session.commit()

        updated_property = Property.query.get(property_id)
        updated_property_images = updated_property.get_property_images()

        serialized_property = updated_property.serialize()
        serialized_property['property_images'] = updated_property_images

        return jsonify(serialized_property), 200
    except Exception as e:
        db.session.rollback()
        return "An error occured", 500

# Update property availability


@bp.patch('/property/update_property_availability/<realtor_id>/<property_id>')
def update_property_availability(realtor_id, property_id):
    property_details = Property.query.get(property_id)
    request_data = request.get_json()

    if property_details is None:
        return "Bad request", 404

    if str(property_details.owner_id) != str(realtor_id):
        return "Not owner", 403

    try:
        if request_data['action'] == 'activate':
            property_details.active = True
            db.session.commit()
            return "Activated property!", 200
        elif request_data['action'] == 'deactivate':
            property_details.active = False
            db.session.commit()
            return "Deactivated property!", 200
        else:
            return "Bad request", 404

    except Exception as e:
        return "An error occured", 500


# Delete property
@bp.delete('/property/delete_property/<realtor_id>/<property_id>')
def delete_property(realtor_id, property_id):
    print(realtor_id, property_id)
    property_details = Property.query.get(property_id)

    if property_details is None:
        return "Property not available", 200

    if str(property_details.owner_id) != str(realtor_id):
        return "Not owner", 403
    try:
        db.session.delete(Property.query.get(property_id))
        db.session.commit()
        return "Deleted successfully!", 200
    except Exception as e:
        print(e)
        db.session.rollback()
        return "An error occured", 500


# Search properties
@bp.get('/property/search_properties')
def search_properties():
    # Extract all arguments from request
    search_text = request.args.get('search_text')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    bedrooms = request.args.get('bedrooms')
    bathrooms = request.args.get('bathrooms')
    category = request.args.get('category')
    property_type = request.args.get('property_type')

    # Query the properties that match arguments
    results = Property.query.filter(
        Property.location.like('%{}%'.format(search_text)),
        Property.title.like('%{}%'.format(search_text)),
        Property.description.like('%{}%'.format(search_text)),
        Property.address.like('%{}%'.format(search_text)),
        Property.category == category,
        Property.property_type == property_type,
        Property.price >= min_price,
        Property.price <= max_price,
        Property.bathrooms <= bathrooms,
        Property.bedrooms <= bedrooms
    ).all()

    if results is None:
        return jsonify([]), 200

    list_items_with_images = []
    # Iterate the properties while appending the list with images of the property
    for property_item in results:
        listed_property = property_item.serialize()
        listed_property["property_images"] = property_item.get_property_images()
        list_items_with_images.append(listed_property)

    return jsonify(list_items_with_images)
