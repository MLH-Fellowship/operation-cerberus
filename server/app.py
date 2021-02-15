# python stuff
import os

# flask stuff
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# load environment variables
from dotenv import load_dotenv
load_dotenv()

ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'json'}

# initialize app and app settings
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
CORS(app)

# display config
# for item in app.config.items():
#     print(item)


@app.route('/')
def index():
    return 'Hello World'

@app.route('/upload', methods=['POST'])
def upload():
    print(request)
    header = request.headers.get('Authorization')
    upload_count = 0

    # if upload_count > 0, at least 1 file was uploaded
    if upload_count > 0:
        responseObj = {
            'status': 'success',
            'uploads': 0,
            'id': 'filename'
        }
    else:
        responseObj = {
            'status': 'failure',
            'uploads': -1,
            'id': 'filename'
        }
    return jsonify(responseObj)

if __name__ == "__main__":
    app.run()