import os
import argparse
import csv

from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

SET_UP = 'set_up'
INSERT = 'insert'
INSERT_PATHS = [
    ('../test/data/assets.csv', 'Assets'),
    ('../test/data/cities.csv', 'City'),
    ('../test/data/jobs.csv', 'Job'),
    ('../test/data/companies.csv', 'Company'),
    ('../test/data/users.csv', 'Users'),
    ('../test/data/dependants.csv', 'Dependant')
    ('../test/data/asset_to_owner.csv', 'AssetToOwner'),
    ('../test/data/loans.csv', 'Loans')
]

load_dotenv()

MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DB = os.getenv('MYSQL_DB')

def connect():
    return mysql.connector.connect(
        host=MYSQL_HOST,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB
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
    parser.add_argument('command', choices=[SET_UP, INSERT], help='Command to run')

    args = parser.parse_args()

    connection = connect()
    # if args.command == SET_UP:
    #     set_up(connection)
    if args.command == INSERT:
        insert(connection)
    connection.close()
