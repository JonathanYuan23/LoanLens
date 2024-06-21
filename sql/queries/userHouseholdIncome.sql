SELECT SUM(u.income) AS household_income
FROM Users u
WHERE u.user_id IN (
    SELECT household_member
    FROM (
        SELECT provider_id AS household_member
        FROM Dependant
        WHERE dependant_id = <user_id>
        UNION
        SELECT dependant_id AS household_member
        FROM Dependant
        WHERE provider_id = <user_id>
        UNION
        SELECT <user_id> AS household_member 
    ) AS household_members
);
