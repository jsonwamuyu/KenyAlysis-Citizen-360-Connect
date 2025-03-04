from flask import Flask
from routes.chatbot import chatbot_bp
import os

app = Flask(__name__)

# Ensure the uploads folder exists
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Register blueprint
app.register_blueprint(chatbot_bp, url_prefix="/chatbot")

if __name__ == "__main__":
    app.run(debug=True, port=5001)
