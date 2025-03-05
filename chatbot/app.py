from flask import Flask
from flask_cors import CORS
from routes.chatbot import chatbot_bp
import os

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Ensure the uploads folder exists
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Register blueprint
app.register_blueprint(chatbot_bp, url_prefix="/chatbot")

if __name__ == "__main__":
    app.run(debug=True, port=5001)
