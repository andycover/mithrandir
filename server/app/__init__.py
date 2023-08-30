from flask import Flask

app = Flask(__name__)

# Load configuration from config.py
app.config.from_pyfile('../config.py')

from app import routes
