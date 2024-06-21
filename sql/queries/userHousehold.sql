SELECT u.user_id, u.name
FROM Users u
WHERE u.user_id = <user_id>
UNION
SELECT u.user_id, u.name
FROM Users u
JOIN (
    SELECT provider_id AS household_member
    FROM Dependant
    WHERE dependant_id = <user_id>
    UNION
    SELECT dependant_id AS household_member
    FROM Dependant
    WHERE provider_id = <user_id>
) AS household_members ON u.user_id = household_members.household_member;
