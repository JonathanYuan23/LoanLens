SELECT 
    Users.user_id, 
    Users.name, 
    Users.address, 
    Users.dob, 
    City.city_name, 
    Company.company_name, 
    Job.job_title, 
    Users.income
FROM 
    Users
JOIN 
    City ON Users.city_id = City.city_id
JOIN 
    Company ON Users.company_id = Company.company_id
JOIN 
    Job ON Users.job_id = Job.job_id
WHERE 
    Users.name LIKE '%<name>%';
