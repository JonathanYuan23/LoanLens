import os

from dotenv import load_dotenv

from flask import Flask
import mysql.connector

load_dotenv()

MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_PORT = os.getenv('MYSQL_PORT')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DB = 'LoanLens'

# Set up paths
basedir = os.path.abspath(os.path.dirname(__file__))

# Initialize and configure app
app = Flask(__name__)


def get_db():
    mydb = mysql.connector.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB
    )

    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM Users")

    myresult = mycursor.fetchall()

    return myresult


@app.route("/")
def hello_world():
    res = get_db()
    return f"<p>Hello, World!</p> {str(res)}"

if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)
