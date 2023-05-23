from app.utils import bp
from app.middleware.authenticate import authenticate_user
import os
from flask import request, jsonify
import requests
from firebase_admin import credentials, storage
#from google.cloud import storage
import uuid

# Send mail::


@bp.post('/utils/send_mail')
def send_mail():
    data = request.get_json()

    from_email = data['from']
    to_email = data['to']
    message = data['message']
    subject = "New Message from 254 Realtors Homes"

    # Assuming getSecret() is implemented to retrieve the API key
    api_key = os.environ.get("MAIL_KEY")

    endpoint = 'https://api.brevo.com/v3/smtp/email'
    headers = {
        'accept': 'application/json',
        'api-key': str(api_key),
        'content-type': 'application/json'
    }
    payload = {
        'sender': {'email': "254realtors.homes@gmail.com"},
        'to': [{"email": to_email}],
        'replyTo': {'email': from_email},
        'textContent': message,
        'subject': subject
    }

    try:
        response = requests.post(endpoint, headers=headers, json=payload)

        if not response.ok:
            return jsonify({'result': 'error'})

        return jsonify({'result': 'success'})
    except Exception as e:
        print(e)
        return jsonify({'result': 'error'})


# upload images to firebase storage
@bp.post('/utils/upload_images')
def upload_images():
    images = request.files

    if not images:
        return 'No images uploaded!', 400

    image_urls = []
    # Generate unique ID for the image
    image_id = uuid.uuid4()

    try:

        for index, image in images.items():
            # Upload image to Firebase Storage
            bucket = storage.bucket()
            image_path = f'images/{image_id}/{image.filename}'
            blob = bucket.blob(image_path)
            blob.upload_from_file(image, content_type=image.content_type)

            # Get the public URL of the uploaded image
            blob.make_public()
            image_url = blob.public_url
            image_urls.append(image_url)
    except Exception as e:
        print(e)
    return jsonify({'image_urls': image_urls})
