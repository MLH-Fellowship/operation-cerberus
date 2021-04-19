import os
from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from app import bcrypt, db, app
from models import User, Files

file_blueprint = Blueprint('file', __name__)

class RequestSingleAPI(MethodView):
    def get(self, fileID):
        auth_header = request.headers['Authorization']
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Bearer token malformed.'
                }
                res = make_response(jsonify(responseObject))
                return res, 401
        else:
            auth_token = ''
        
        if auth_token:
            # verify user
            userID = User.decode_auth_token(auth_token)
            user = User.query.filter_by(id=userID).first()
            if not user:
                responseObject = {
                    'status': 'fail',
                    'message': 'Error: user does not exist.'
                }
                return make_response(jsonify(responseObject)), 401
            
            if user.id != userID:
                responseObject = {
                    'status': 'fail',
                    'message': 'Error: requested user\'s files do not match auth_token.'
                }
                return make_response(jsonify(responseObject)), 404
            
            # verify file exists and user is owner of file
            file = Files.query.filter_by(id=fileID).first()
            # print(file)
            # print(fileID)
            if not file:
                responseObject = {
                    'status': 'fail',
                    'message': 'File not found.',
                }
                return make_response(jsonify(responseObject)), 404

            if file.user_id != user.id:
                responseObject = {
                    'status': 'fail',
                    'message': 'File user id does not match provided useer id.',
                }
                return make_response(jsonify(responseObject)), 404

            # return file contents
            asTxt = ''
            with open(f"uploads/{file.filename}") as f:
                asTxt = f.read()

            responseObject = {
                'status': 'success',
                'message': 'File fetched and read.',
                'fileContents': asTxt
            }
            return make_response(jsonify(responseObject)), 200
            
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(responseObject)), 401

class RequestAPI(MethodView):
    def get(self):
        auth_header = request.headers['Authorization']
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Bearer token malformed.'
                }
                res = make_response(jsonify(responseObject))
                return res, 401
        else:
            auth_token = ''
        
        if auth_token:
            # verify user
            userID = User.decode_auth_token(auth_token)
            user = User.query.filter_by(id=userID).first()
            if not user:
                responseObject = {
                    'status': 'fail',
                    'message': 'Error: user does not exist.'
                }
                return make_response(jsonify(responseObject)), 401
            
            if user.id != userID:
                responseObject = {
                    'status': 'fail',
                    'message': 'Error: requested user\'s files do not match auth_token.'
                }
                return make_response(jsonify(responseObject)), 404
            
            # get name of all of user's files
            files = Files.query.filter_by(user_id=userID)
            responseObject = {
                'status': 'success',
                'message': 'Files fetched.',
                'files': [{'filename': f.filename, 'uploaded_on': f.uploaded_on} for f in files]
            }
            return make_response(jsonify(responseObject)), 200
            
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(responseObject)), 401

class UploadAPI(MethodView):
    """
    Upload a file
    """
    def post(self):
        if len(request.files) == 0:
            return jsonify({'error': 'no file'})
        
        numUploaded = 0
        auth_header = request.headers.get('Authorization')

        # see if properly authorized
        if auth_header:
            auth_token = ''
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Bearer token malformed'
                }
                res = make_response(jsonify(responseObject))
                return res, 401
            
            if auth_token:
                # verify token
                try:
                    userID = User.decode_auth_token(auth_token)
                    user = User.query.filter_by(id=userID)
                    fileName = fileObj = None
                    for fn, fo in request.files.items():
                        # print(fn)
                        # print(fo)
                        fileName = fn
                        fileObj = fo
                    
                    newFile = Files(
                        filename=fileName,
                        user_id=userID
                    )

                    # upload file
                    if fileObj and fileName:
                        fileObj.save(f"../uploads/{fileName}")
                        numUploaded += 1
                    
                    # insert new file
                    db.session.add(newFile)
                    db.session.commit()

                    # success
                    responseObject = {
                        'status': 'success',
                        'message': 'file successfully uploaded',
                    }
                    return make_response(jsonify(responseObject)), 201

                except:
                    responseObject = {
                        'status': 'fail',
                        'message': 'Error decoding auth token or creating file.'
                    }
                    return make_response(jsonify(responseObject)), 404
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'Provide a valid auth token.'
                }
                return make_response(jsonify(responseObject)), 401
        else:
            responseObject = {
                'status': 'fail',
                'message': 'No auth token provided.'
            }
            return make_response(jsonify(responseObject)), 401

        # # request.files is of "werkzeug.datastructures.ImmutableMultiDict"
        # for fileName, fileObj in request.files.items():
        #     # make sure file has a name
        #     if fileObj and fileName:
        #         fileObj.save(f"../uploads/{fileName}")
        #         # fileObj.save(os.path.join(app.config['UPLOAD_FOLDER'], fileName))
        #         numUploaded += 1

        # # if upload_count > 0, at least 1 file was uploaded
        # if numUploaded > 0:
        #     responseObj = {
        #         'status': 'success',
        #         'uploads': numUploaded,
        #         'id': fileName
        #     }
        # else:
        #     responseObj = {
        #         'status': 'failure',
        #         'uploads': -1,
        #         'id': fileName
        #     }
        # return jsonify(responseObj)

# define API resources
upload_view = UploadAPI.as_view('upload_api')
request_view = RequestAPI.as_view('request_api')
request_single_view = RequestSingleAPI.as_view('request_single_api')

# add rules for API endpoints
file_blueprint.add_url_rule(
    '/files/upload',
    view_func=upload_view,
    methods=['POST']
)
file_blueprint.add_url_rule(
    '/files',
    view_func=request_view,
    methods=['GET']
)
file_blueprint.add_url_rule(
    '/files/<fileID>',
    view_func=request_single_view,
    methods=['GET']
)