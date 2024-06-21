# loanlens

This application uses a MySQL database hosted on a server somewhere on the web. 
To connect to it, valid credentials must be provided in a .env file (see .env_example).

## Sample Database
Our handmade sample data is in `test/sample_db`. There is a helper script `util/runner.py` that we used to create tables/insert data which can be executed by passing `set_up` and `insert` to it as command line arguments.