import os

from dotenv import load_dotenv

from flask import Flask
import mysql.connector
# from flask_mysqldb import MySQL

load_dotenv()

MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DB = 'cs348'

# Set up paths
basedir = os.path.abspath(os.path.dirname(__file__))

# Initialize and configure app
app = Flask(__name__)

# app.config['MYSQL_HOST'] = MYSQL_HOST
# app.config['MYSQL_USER'] = MYSQL_USER
# app.config['MYSQL_PASSWORD'] = MYSQL_PASSWORD
# app.config['MYSQL_DB'] = MYSQL_DB

# mysql = MySQL(app)

def get_db():
    mydb = mysql.connector.connect(
        host=MYSQL_HOST,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB
    )

    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM Persons")

    myresult = mycursor.fetchall()

    return myresult


@app.route("/")
def hello_world():
    res = get_db()
    return f"<p>Hello, World!</p> {str(res)}"

if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)
