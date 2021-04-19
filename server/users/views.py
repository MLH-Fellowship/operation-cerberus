from flask import Blueprint, request
from flask.views import MethodView

from app import bcrypt, db
from models import User

user_blueprint = Blueprint('user')
