from app.utils import bp
from app.middleware.authenticate import authenticate_user
import os
from flask import request, jsonify
import requests
from firebase_admin import credentials, storage
# from google.cloud import storage
import uuid

# Send mail::


@bp.post('/utils/send_mail')
def send_mail():
    data = request.get_json()
    email = phone_number = full_names = message = agent_email = None

    if data:
        if 'email' in data:
            email = data['email']
        if 'phone_number' in data:
            phone_number = data['phone_number']
        if 'full_names' in data:
            full_names = data['full_names']
        if 'message' in data:
            message = data['message']
        if 'agent_email' in data:
            agent_email = data['agent_email']

    subject = "Property Inquiry"

    # Assuming getSecret() is implemented to retrieve the API key
    api_key = os.environ.get("MAIL_KEY")

    # HTML Template
    html_template = '''
                        <html>
                        <head>
                        </head>
                        <body>
                            <h1>{full_names}</h1>
                            <h1>{email}</h1>
                            <h1>{phone_number}</h1>
                            <br>
                            <p>{message}</p>
                        </body>
                        </html>
                    '''
    
    endpoint = 'https://api.brevo.com/v3/smtp/email'
    headers = {
        'accept': 'application/json',
        'api-key': str(api_key),
        'content-type': 'application/json'
    }
    payload = {
        'sender': {'email': "254realtors.homes@gmail.com"},
        'to': [{"email": agent_email}],
        'replyTo': {'email': email},
        'subject': subject,
        'htmlContent': html_template.format(full_names=full_names, email=email, phone_number=phone_number, message=message)}

    try:
        response = requests.post(endpoint, headers=headers, json=payload)

        if not response.ok:
            return jsonify({'result': 'error'}), 500

        return jsonify({'result': 'success'}), 200
    except Exception as e:
        print(e)
        return jsonify({'result': 'error'}), 500


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
