from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from app import bcrypt, db
from models import User, BlacklistToken

auth_blueprint = Blueprint('auth', __name__)

class DeleteUserAPI(MethodView):
    """
    delete user resource
    """
    def delete(self):
        # verify user is admin via JWT
        # print(request.headers)
        auth_header = request.headers['Authorization']
        # print(request.headers)
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Bearer token malformed.'
                }
                return make_response(jsonify(responseObject)), 401
        else:
            auth_token = ''
        
        if auth_token:
            # verify admin
            userID = User.decode_auth_token(auth_token)
            admin = User.query.filter_by(id=userID).first()
            if not admin.admin:
                responseObject = {
                    'status': 'fail',
                    'message': 'You are not authorized to delete a user.'
                }
                return make_response(jsonify(responseObject)), 401

            # get user to delete
            post_data = request.get_json()
            user = User.query.filter_by(id=post_data.get('id'))
            if not user:
                responseObject = {
                    'status': 'fail',
                    'message': 'Error: user does not exist.'
                }
                return make_response(jsonify(responseObject)), 401
            else:
                user.delete()
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'User deleted.'
                }
                return make_response(jsonify(responseObject)), 201
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(responseObject)), 401


class RefreshTokenAPI(MethodView):
    """
    refresh token resource
    """
    def post(self):
        # verify refreshToken
        refreshToken = ''
        # print(request.cookies)
        try:
            refreshToken = request.cookies['refreshToken']
        except KeyError:
            responseObject = {
                'status': 'fail',
                'message': 'refreshToken not found. Please re-authenticate (login).'
            }
            return make_response(jsonify(responseObject)), 401

        try:
            # provide an accessToken
            userID = User.decode_auth_token(refreshToken)
            auth_token = User.encode_access_token(None, userID)
            # print(refreshToken)
            if auth_token and refreshToken:
                responseObject = {
                    'status': 'success',
                    'message': 'refreshToken found. auth_token granted',
                    'auth_token': auth_token
                }
                return make_response(jsonify(responseObject)), 201
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'refreshToken or auth_token not found',
                }
                return make_response(jsonify(responseObject)), 401
        except Exception as e:
            print(e)
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401

class RegisterAPI(MethodView):
    """
    User Registration Resource
    """
    def post(self):
        # get the post data
        # print(request)
        post_data = request.get_json()
        # check if user already exists
        user = User.query.filter_by(email=post_data.get('email')).first()
        if not user:
            try:
                # isAdmin = 't' if post_data.get("isAdmin") == True else 'f'
                user = User(
                    email=post_data.get('email'),
                    password=post_data.get('password'),
                    admin=post_data.get("isAdmin")
                )
                # insert the user
                db.session.add(user)
                db.session.commit()
                # generate the auth token
                auth_token = user.encode_access_token(user.id)
                print(auth_token)
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully registered.',
                    'auth_token': auth_token
                }
                return make_response(jsonify(responseObject)), 201
            except Exception as e:
                print('here', e)
                responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return make_response(jsonify(responseObject)), 401
        else:
            responseObject = {
                'status': 'failure',
                'message': 'User already exists. Please Log in.',
            }
            return make_response(jsonify(responseObject)), 401


class LoginAPI(MethodView):
    """
    User Login Resource
    """
    def post(self):
        # get the post data
        post_data = request.get_json()

        try:
            # fetch the user data
            user = User.query.filter_by(
                email=post_data.get('email')
            ).first()
            
            # authenticate user
            if user and bcrypt.check_password_hash(
                user.password, post_data.get('password')
            ):
                # build refreshToken
                refreshToken = user.encode_refresh_token(user.id)
                # build accessToken
                auth_token = user.encode_access_token(user.id)

                if auth_token and refreshToken:
                    responseObject = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'auth_token': auth_token,
                        'isAdmin': user.admin
                    }
                    res = make_response(jsonify(responseObject))
                    res.set_cookie('refreshToken', refreshToken, httponly=True)
                    # print(res.headers)
                    return res, 200
                    # return make_response(jsonify(responseObject)), 200
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'User does not exist.'
                }
                return make_response(jsonify(responseObject)), 404
        except Exception as e:
            print(e)
            responseObject = {
                'status': 'fail',
                'message': 'Try again'
            }
            return make_response(jsonify(responseObject)), 500


class UserAPI(MethodView):
    """
    User Resource
    """
    def get(self):
        # get the auth token
        auth_header = request.headers.get('Authorization')
        # print(request.headers)
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Bearer token malformed.'
                }
                return make_response(jsonify(responseObject)), 401
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                responseObject = {
                    'status': 'success',
                    'data': {
                        'user_id': user.id,
                        'email': user.email,
                        'admin': user.admin,
                        'registered_on': user.registered_on
                    }
                }
                return make_response(jsonify(responseObject)), 200
            responseObject = {
                'status': 'fail',
                'message': resp
            }
            return make_response(jsonify(responseObject)), 401
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(responseObject)), 401

class UsersAPI(MethodView):
    """
    Users Resource
    """
    def get(self):
        # verify refreshToken
        try:
            refreshToken = request.cookies['refreshToken']
        except KeyError:
            responseObject = {
                'status': 'fail',
                'message': 'refreshToken not found. Please re-authenticate (login).'
            }
            return make_response(jsonify(responseObject)), 401

        # provide an accessToken

        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObj = {
                    'status': 'fail',
                    'message': 'Bearer token malformed.'
                }
                return make_response(jsonify(responseObject)), 401
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                users = User.query.all()
                responseObject = {
                    'status': 'success',
                    'users': [{
                        'user_id': user.id,
                        'email': user.email,
                        'admin': user.admin,
                        'registered_on': user.registered_on
                    } for user in users]
                }
                return make_response(jsonify(responseObject)), 200
            responseObject = {
                'status': 'fail',
                'message': resp
            }
            return make_response(jsonify(responseObject)), 401
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(responseObject)), 401

class LogoutAPI(MethodView):
    """
    Logout Resource
    """
    def post(self):
        # get auth token
        auth_header = request.headers.get('Authorization')
        # print(request.headers)
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            print("resp", resp)
            if not isinstance(resp, str):
                # mark the token as blacklisted
                blacklist_token = BlacklistToken(token=auth_token)
                try:
                    # insert the token
                    db.session.add(blacklist_token)
                    db.session.commit()
                    responseObject = {
                        'status': 'success',
                        'message': 'Successfully logged out.'
                    }
                    return make_response(jsonify(responseObject)), 200
                except Exception as e:
                    responseObject = {
                        'status': 'fail',
                        'message': e
                    }
                    return make_response(jsonify(responseObject)), 200
            else:
                responseObject = {
                    'status': 'fail',
                    'message': resp
                }
                return make_response(jsonify(responseObject)), 401
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(responseObject)), 403

# define the API resources
login_view = LoginAPI.as_view('login_api')
user_view = UserAPI.as_view('user_api')
users_view = UsersAPI.as_view('users_api')
logout_view = LogoutAPI.as_view('logout_api')
registration_view = RegisterAPI.as_view('register_api')
refreshToken_view = RefreshTokenAPI.as_view('refreshtoken_api')
deleteUser_view = DeleteUserAPI.as_view('deleteuser_api')

# add Rules for API Endpoints
auth_blueprint.add_url_rule(
    '/auth/register',
    view_func=registration_view,
    methods=['POST']
)
auth_blueprint.add_url_rule(
    '/auth/login',
    view_func=login_view,
    methods=['POST']
)
auth_blueprint.add_url_rule(
    '/auth/status',
    view_func=user_view,
    methods=['GET']
)
auth_blueprint.add_url_rule(
    '/auth/logout',
    view_func=logout_view,
    methods=['POST']
)
auth_blueprint.add_url_rule(
    '/auth/users',
    view_func=users_view,
    methods=['GET']
)
auth_blueprint.add_url_rule(
    '/auth/refresh_token',
    view_func=refreshToken_view,
    methods=['POST']
)
auth_blueprint.add_url_rule(
    '/auth/delete',
    view_func=deleteUser_view,
    methods=['DELETE']
)