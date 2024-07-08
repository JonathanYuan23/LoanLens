import os
import argparse
import csv

from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

SET_UP = 'set_up'
INSERT = 'insert'
BULK_INSERT = 'bulk_insert'

SET_UP_PATH = '../sql/create_table.sql'
INSERT_PATHS = [
    ('../test/sample_db/assets.csv', 'Assets'),
    ('../test/sample_db/cities.csv', 'City'),
    ('../test/sample_db/jobs.csv', 'Job'),
    ('../test/sample_db/companies.csv', 'Company'),
    ('../test/sample_db/users.csv', 'Users'),
    ('../test/sample_db/dependants.csv', 'Dependant'),
    ('../test/sample_db/asset_to_owner.csv', 'AssetToOwner'),
    ('../test/sample_db/loans.csv', 'Loans')
]
BULK_INSERT_PATH = './load_data.sql'

load_dotenv()

MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_PORT = os.getenv('MYSQL_PORT')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DB = os.getenv('MYSQL_DB')

def connect():
    return mysql.connector.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB,
        allow_local_infile=True
    )

def execute_sql_file(filename, connection):
    cursor = connection.cursor()
    sql_file = open(filename, 'r')
    sql_commands = sql_file.read().split(';')

    for command in sql_commands:
        try:
            if command.strip():
                cursor.execute(command)
                print(f"Executed: {command.strip()}")
        except Error as e:
            print(f"Error: {e}")

    connection.commit()
    cursor.close()
    sql_file.close()

def setup(connection):
    execute_sql_file(SET_UP_PATH, connection)

def bulk_insert(connection):
    execute_sql_file(BULK_INSERT_PATH, connection)

def insert(connection):
    cursor = connection.cursor()
    for csv_path, table in INSERT_PATHS:
        with open(csv_path, mode='r') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)  # Skip the header row
            for row in reader:
                placeholders = ', '.join(['%s'] * len(row))
                query = f"INSERT INTO {table} VALUES ({placeholders})"
                cursor.execute(query, row)

    connection.commit()
    cursor.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process choices')
    parser.add_argument('command', choices=[SET_UP, INSERT, BULK_INSERT], help='Command to run')

    args = parser.parse_args()

    connection = connect()
    if args.command == SET_UP:
        setup(connection)
    elif args.command == INSERT:
        insert(connection)
    elif args.command == BULK_INSERT:
        bulk_insert(connection)

    connection.close()
