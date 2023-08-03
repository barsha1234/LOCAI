from flask_pymongo import pymongo
from flask import Flask, jsonify, request, json, after_this_request
from flask_cors import CORS
from bson.objectid import ObjectId
import bcrypt

CONNECTION_STRING = "mongodb+srv://barshamishra56:FUGtQQAingjbbslx@shoppingapp.bbgzq3k.mongodb.net/?retryWrites=true&w=majority"
PORT = 8080
app = Flask(__name__)
CORS(app)
mongo_client = pymongo.MongoClient(CONNECTION_STRING)
db = mongo_client.get_database("shoppingapp")
user_collection = pymongo.collection.Collection(db, 'user_collection')

def hash_password(password):
    hashed_password = bcrypt.hashpw(password.encode("UTF-8"), bcrypt.gensalt())
    return hashed_password

''' ROUTES '''
@app.route("/")
def index():
    return jsonify({
        "name": "Priyadarsi",
        "number": 3,
    })

'''
@app.route("/otp", method=["GET"])
def otp():
    return 0;
'''

@app.route("/get_user", methods=["GET"])
def get_user_by_id():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    try:
        id = request.args.get("id")
        print("id: " + str(id))

        if id:
            user = user_collection.find_one({"_id": ObjectId(str(id))})
            user["_id"] = str(user["_id"])
            user['password'] = str(user['password'])

            return_status = {
                "status": "success",
                "user": json.dumps(user)
            }

            return  jsonify(return_status)
        else:
            return_status = {
                "status": "failed",
                "user": None
            }
            
            return jsonify(return_status) 
    except Exception as e:
        print(e)
    
    return_status = {
        "status": "failed",
        "user": None
    }
    
    return jsonify(return_status)

@app.route("/login_user", methods=["POST"])
def login_user():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    data = json.loads(request.data)
    email = data['email']
    user = user_collection.find_one({"email": str(email)})
    print(user)

    if not user:
        result_status = {
            "status": "failed",
            "message": "Email does not exist."
        }
        return result_status

    password = data['password']

    password_bytes = password.encode('utf-8')
    # print(password_bytes)
    user_password_bytes = user['password']
    # print(user_password_bytes)
    result = bcrypt.checkpw(password.encode('utf-8'), user_password_bytes)

    if result:
        result_status = {
            "status": "successful",
            "id": str(user['_id'])
        }

        return result_status
    else:
        result_status = {
            "status": "successful",
            "message": "Password is not correct."
        }

        return result_status

@app.route("/add_user", methods=["POST"])
def add_user():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    data = json.loads(request.data)
    name = data['name']
    email = data['email']
    password = data['password']
    accountType = data['accountType']
    homeLocation = data['homeLocation']

    password = hash_password(password)

    user = {
        "name": name,
        "email": email,
        "password": password, 
        "accountType": accountType,
        "homeLocation": homeLocation
    }

    i_user = user_collection.insert_one(user)

    return_status = {
        "status": "success",
        "id": str(i_user.inserted_id)
    }

    return jsonify(return_status)

if __name__ == "__main__":
    app.run(debug=True)




