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
``` sql
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
details, descriptions, performance tuning, etc are all provided in report.pdf

### Test with sample data
- Queries and their respective outputs are under `LoanLens/test/test_sample`
- All the query and output uses the data in `LoanLens/test/sample_db` except for `userHouseholdIncome.sql` and `userHousehold.sql` as there was a change in the database schema and the sample database does not use the new schema
    - The `userHouseholdIncome.sql` and `userHousehold.sql` queries are tested with production data

### Test with production data
- Tested using the production data found in `LoanLens/util/prod_data`
- All the query is tested in `LoanLens/test/test_prod/testproduction.sql`
- The respective output is in `LoanLens/test/test_prod/testproduction.out`
