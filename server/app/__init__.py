from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load configuration from config.py
app.config.from_pyfile('../config.py')

from app import routes
