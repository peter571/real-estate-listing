from app.properties import bp
from app.models.property import Property
from app.models.realtor import Realtor
from flask import jsonify, request
from app.extensions import db
import pickle

# Get all properties


@bp.route('/properties')
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
    property_images = [
        property_image.file_url for property_image in result.property_images.all()]
    # Convert the property values to dictionary
    property_id_result = result.serialize()
    # Append the value of property_images with a list of images of the property
    property_id_result["property_images"] = property_images
    return jsonify(property_id_result), 200

# post a property to the db


@bp.post('/property/new-property/<realtor_id>')
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
                            property_type=request_data['property_type'])

    try:
        db.session.add(new_property)
        db.session.commit()
       
        return jsonify(f"{new_property.title} created successfully"), 201
    except Exception as e:
        db.session.rollback()
        return "An error occurred", 500
