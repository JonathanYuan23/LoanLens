from flask import Flask
from routes.routes import api_bp
from dotenv import load_dotenv
from flask_cors import CORS
import os
from db import db

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("LOANLENSDB")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db.init_app(app)
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
