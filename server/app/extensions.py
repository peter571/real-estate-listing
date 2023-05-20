from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
import sib_api_v3_sdk

configuration = sib_api_v3_sdk.Configuration()
db = SQLAlchemy()
mail = Mail()
