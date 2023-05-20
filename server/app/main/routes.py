from app.main import bp
from flask import request, jsonify
import os
import requests


@bp.route('/')
def index():
    return '<h1>Home page</h1>'

# Send mail::


@bp.post('/send_mail')
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
        'to': [{ "email": to_email }],
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
