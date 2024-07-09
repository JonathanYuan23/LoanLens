CREATE TABLE City (
    city_id INTEGER PRIMARY KEY,
    city_name VARCHAR(255) NOT NULL,
    state_name VARCHAR(255) NOT NULL,
    population INTEGER NOT NULL CHECK (population >= 0),
    avg_income DECIMAL(10, 2) NOT NULL CHECK (avg_income >= 0)
);

CREATE TABLE Company (
    company_id INTEGER PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    num_employees INTEGER NOT NULL CHECK (num_employees >= 0)
);

CREATE TABLE Job (
    job_id INTEGER PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    avg_income INTEGER NOT NULL CHECK (avg_income >= 0)
);

CREATE TABLE Assets (
    asset_id INTEGER PRIMARY KEY,
    asset_type VARCHAR(255) NOT NULL,
    worth DECIMAL(10, 2) NOT NULL CHECK (worth >= 0)
);

CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    dob TIMESTAMP NOT NULL,
    city_id INTEGER NOT NULL,
    company_id INTEGER NOT NULL,
    job_id INTEGER NOT NULL,
    income DECIMAL(10, 2) NOT NULL CHECK (income >= 0),
    FOREIGN KEY (city_id) REFERENCES City(city_id),
    FOREIGN KEY (company_id) REFERENCES Company(company_id),
    FOREIGN KEY (job_id) REFERENCES Job(job_id)
);

CREATE TABLE Loans (
    loan_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    reason VARCHAR(255) NOT NULL,
    loan_amount DECIMAL(10, 2) NOT NULL CHECK (loan_amount >= 0),
    balance_paid DECIMAL(10, 2) NOT NULL CHECK (balance_paid >= 0),
    date_created TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE AssetToOwner (
    asset_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (asset_id, user_id),
    FOREIGN KEY (asset_id) REFERENCES Assets(asset_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Dependant (
    provider_id INTEGER NOT NULL,
    dependant_id INTEGER NOT NULL,
    PRIMARY KEY (provider_id, dependant_id),
    FOREIGN KEY (provider_id) REFERENCES Users(user_id),
    FOREIGN KEY (dependant_id) REFERENCES Users(user_id)
);

CREATE TABLE Married (
    spouse_id_1 INTEGER NOT NULL,
    spouse_id_2 INTEGER NOT NULL,
    PRIMARY KEY (spouse_id_1, spouse_id_2),
    FOREIGN KEY (spouse_id_1) REFERENCES Users(user_id),
    FOREIGN KEY (spouse_id_2) REFERENCES Users(user_id)
);