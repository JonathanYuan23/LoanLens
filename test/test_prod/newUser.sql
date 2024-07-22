-- Variables
SET @name = 'John Doe';
SET @address = '123 Main St';
SET @dob = '1990-01-01 00:00:00';
SET @city_name = 'New York';
SET @company_name = 'Davis-Tyler';
SET @job_title = 'Magistrate';
SET @income = 85000.00;

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

