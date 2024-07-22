-- Variables
SET @name = '<user name>';
SET @address = '<address>';
SET @dob = '<dob>';
SET @city_name = '<city name>';
SET @company_name = '<company name>';
SET @job_title = '<job title>';
SET @income = <income>;

-- Find city_id from City table
SET @city_id = (SELECT city_id FROM City WHERE city_name = @city_name LIMIT 1);

-- Find company_id from Company table
SET @company_id = (SELECT company_id FROM Company WHERE company_name = @company_name LIMIT 1);

-- Find job_id from Job table
SET @job_id = (SELECT job_id FROM Job WHERE job_title = @job_title LIMIT 1);

-- Find the next user_id from Users tableCompany
SET @user_id = (SELECT COALESCE(MAX(user_id), 0) + 1 FROM Users);

-- Insert new user into Users table
INSERT INTO Users (user_id, name, address, dob, city_id, company_id, job_id, income)
VALUES (@user_id, @name, @address, @dob, @city_id, @company_id, @job_id, @income);

