import os
import argparse

from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

SET_UP = 'set_up'
INSERT = 'insert'

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

def set_up(connection):
    execute_sql_file('set_up.sql', connection)

def insert(connection):
    execute_sql_file('insert.sql', connection)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process choices')
    parser.add_argument('command', choices=[SET_UP, INSERT], help='Command to run')

    args = parser.parse_args()

    connection = connect()
    if args.command == SET_UP:
        set_up(connection)
    elif args.command == INSERT:
        insert(connection)
    connection.close()
