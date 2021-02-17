# python stuff
import os

# flask stuff
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# load environment variables
from dotenv import load_dotenv
load_dotenv()

ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'json'}

# initialize app and app settings
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

@app.route('/')
def index():
    return 'Hello World'

@app.route('/upload', methods=['POST'])
def upload():
    # make sure they're not uploading 0 files
    if len(request.files) == 0:
        return jsonify({'error': 'no file'})
    
    numUploaded = 0
    header = request.headers.get('Authorization')

    # request.files is of "werkzeug.datastructures.ImmutableMultiDict"
    for fileName, fileObj in request.files.items():
        # make sure file has a name
        if fileObj and fileName:
            fileObj.save(f"uploads/{fileName}")
            numUploaded += 1

    # if upload_count > 0, at least 1 file was uploaded
    if numUploaded > 0:
        responseObj = {
            'status': 'success',
            'uploads': numUploaded,
            'id': fileName
        }
    else:
        responseObj = {
            'status': 'failure',
            'uploads': -1,
            'id': fileName
        }
    return jsonify(responseObj)

if __name__ == "__main__":
    app.run()