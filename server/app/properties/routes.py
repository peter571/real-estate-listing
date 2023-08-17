from app.properties import bp
from app.models.property import Property
from app.models.realtor import Realtor
from flask import jsonify, request
from app.extensions import db
import uuid
from app.middleware.authenticate import authenticate_user
from sqlalchemy import func


# Get all properties
@bp.route('/property/all_properties')
def get_all_properties():
    page_number = request.args.get('page', 1, type=int)
    # Query the table with all properties
    pagination_properties = Property.query.filter(
        Property.active == True).paginate(page=page_number, per_page=20)

    # If properties is None return a empty list
    if pagination_properties == None:
        return jsonify({"properties": [], "pages": 0}), 200
    # Extract pagination items and number of pages
    properties = pagination_properties.items
    number_of_pages = pagination_properties.pages
    # init an empty list
    list_items_with_images = []

    # Iterate the properties while appending the list with images of the property
    for property_item in properties:
        listed_property = property_item.serialize()
        listed_property["property_images"] = property_item.get_property_images()
        list_items_with_images.append(listed_property)

    response_data = {
        "properties": list_items_with_images,
        "pages": number_of_pages
    }
    return jsonify(response_data)


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
@authenticate_user
def create_property(realtor_id):
    user = Realtor.query.get(realtor_id)
    if user == None:
        return jsonify("Unauthorized user"), 401

    request_data = request.get_json()

    # Create a new property
    new_property = Property(id=str(uuid.uuid4()),
                            owner_id=realtor_id,
                            location=request_data['location'],
                            description=request_data['description'],
                            property_images=request_data['property_images'],
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

        return jsonify(f"{new_property.id} created successfully"), 201
    except Exception as e:
        print(e)
        db.session.rollback()
        return "An error occurred", 500


# Update property
@bp.patch('/property/update_property/<realtor_id>/<property_id>')
@authenticate_user
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
        property_details.description = request_data['description']
        property_details.property_images = request_data['property_images']
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
        print(e)
        db.session.rollback()
        return "An error occured", 500


# Update property availability
@bp.patch('/property/update_property_availability/<realtor_id>/<property_id>')
@authenticate_user
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
@authenticate_user
def delete_property(realtor_id, property_id):
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
    search_text = request.args.get('search_term')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    bedrooms = request.args.get('bedrooms')
    bathrooms = request.args.get('bathrooms')
    category = request.args.get('category')
    property_type = request.args.get('property_type')
    max_area = request.args.get("max_area")
    page_number = request.args.get('page', 1, type=int)

    # print(request.args, len(category))

    # define the base query with the search conditions
    query = Property.query.filter(
        db.or_(
            db.or_(
                func.lower(Property.location).like(
                    '%{}%'.format(search_text.lower())),
                func.lower(Property.category).like(
                    '%{}%'.format(search_text.lower())),
                func.lower(Property.description).like(
                    '%{}%'.format(search_text.lower())),
                func.lower(Property.address).like(
                    '%{}%'.format(search_text.lower()))
            )
        )
    )

    # add additional filters based on the search criteria
    if len(category):
        query = query.filter(Property.category == category.lower())
        print("category")
    if len(property_type):
        query = query.filter(Property.property_type == property_type)
        print("type")
    if min_price and not (min_price == "" or min_price == "0"):
        query = query.filter(Property.price >= int(min_price))
        print("min-price")
    if max_price and not (max_price == "" or max_price == "0"):
        query = query.filter(Property.price <= int(max_price))
        print("max-price")
    if bathrooms and not (bathrooms == "" or bathrooms == "0"):
        query = query.filter(Property.bathrooms <= int(bathrooms))
        print("bath")
    if bedrooms and not (bedrooms == "" or bedrooms == "0"):
        query = query.filter(Property.bedrooms <= int(bedrooms))
        print("beds")
    if max_area and not (max_area == "" or max_area == "0"):
        query = query.filter(Property.size >= int(max_area))
        print("size")

    # query all searches
    results = query.paginate(page=page_number, per_page=20)

    if results is None:
        return jsonify({"results": [], "pages": 0}), 200

    list_items_with_images = []
    # Iterate the properties while appending the list with images of the property
    for property_item in results.items:
        listed_property = property_item.serialize()
        listed_property["property_images"] = property_item.get_property_images()
        list_items_with_images.append(listed_property)

    return jsonify({"results": list_items_with_images, "pages": results.pages})


# Recently added properties
@bp.get('/property/recently_added')
def search_recently_added():
    results = Property.query.order_by(Property.date_created.desc()).limit(4)

    if results is None:
        return jsonify([]), 200

    recent_properties = []
    for item in results:
        recent_properties.append(item.serialize())

    return jsonify(recent_properties)
