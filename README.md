# LoanLens

This application uses a MySQL database hosted on a server somewhere on the web.
To connect to it, valid credentials must be provided in a .env file (see .env_example).

## Sample Database

Our handmade sample data is in `test/sample_db`. There is a helper script `util/runner.py` that we used to create tables/insert data which can be executed by passing `set_up` and `insert` to it as command line arguments.

## Features

1. Retrieves the total sum of asset values of a user
2. Retrieves user's total loan amount and total balance owing
3. Retrieves household members
4. Retrieves household income

## Production Database

To bulk insert data from a local csv file remotely, you'll need to add this to your `sqld.cnf` config file on the MySQL server (usually found at `/etc/mysql/mysql.conf.d/mysqld.cnf`):

```bash
[mysqld]
secure_file_priv=''
local_infile=1
```

then restart MySQL

```
sudo service mysql restart
```

which is equivalent to

```
sudo service mysql stop
sudo service mysql start
```

This lets you use MySQL's `LOAD DATA INFILE` syntax with local file paths:

```sql
LOAD DATA LOCAL INFILE './prod_data/cities.csv' INTO TABLE City
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE './prod_data/companies.csv' INTO TABLE Company
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;
...
```

## Query tests

under directory `LoanLens/test`

- details, descriptions, performance analysis, etc are all provided in report.pdf

### Test with sample data

- Queries and their respective outputs are under `LoanLens/test/test_sample`
- All the query and output uses the data in `LoanLens/test/sample_db` except for `userHouseholdIncome.sql` and `userHousehold.sql` as there was a change in the database schema and the sample database does not use the new schema
  - The `userHouseholdIncome.sql` and `userHousehold.sql` queries are tested with production data

### Test with production data

- Tested using the production data found in `LoanLens/util/prod_data`
- All the query is tested in `LoanLens/test/test_prod/testproduction.sql`
- The respective output is in `LoanLens/test/test_prod/testproduction.out`

## Backend

The backend is created with Python (Flask). It uses sqlalchemy to make queries in the MySQL database.

Currently, there are 3 working API endpoints with the following JSON return format
`1. /api/total-assets/<int:user_id> (GET)`

```
{
  "user_id": "<user_id>",
  "assets": [
    {
      "asset_type": "<asset_type>",
      "asset_value": <value_as_number>
    }
  ]
}
```

`2. /api/loan-history/<int:user_id> (GET)`

```
{
  "user_id": "<user_id>",
  "loans": [
    {
      "reason": "<loan_reason>",
      "loan_amount": <loan_amount_as_number>,
      "balance_paid": <loan_balance_paid_as_number>,
      "date_created": "<date_created>"
    }
  ]
}
```

`3. /api/household-income/<int:user_id> (GET)`

```
{
  "user_id": "<user_id>",
  "household_income": <household_income_as_number>
}
```

To run the flask server, ensure you have the latest Python version installed. Then navigate into the backend directory, then run the following commands.
`pip install -r requirements.txt`
`python app.py`
The server should then be live on `http://127.0.0.1:5000`

## Frontend

The backend is created with Next.js 14, React.js, and TypeScript. It uses TanStack react-query to make queries to the API endpoints.

Currently, there are 3 working features on the frontend.

    - Assets Tab
    - Loans Tab
    - Income Tab

To run the Next.js sever, ensure you have npm installed. Then navigate into the frontend directory `cd frontend`.

To run in a development environment, run the following commands.
`npm install` - Install necessary dependencies
`npm run dev` - Run the environment in development mode.

To run in a production environment, run the following commands.
`npm run build`
`npm run start`

The server should then be live on ` http://localhost:3000`. You will be automatically redirected to the homepage, `http://localhost:3000/home`.
