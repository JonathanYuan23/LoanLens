WITH RECURSIVE HouseholdMembers AS (
    -- Anchor member: the given user
    SELECT 
        user_id 
    FROM 
        Users 
    WHERE 
        user_id = <user_id>
    UNION
    -- Get dependents and providers
    SELECT 
        d.dependant_id AS user_id 
    FROM 
        Dependant d
    JOIN 
        HouseholdMembers hm ON d.provider_id = hm.user_id
    UNION
    SELECT 
        d.provider_id AS user_id 
    FROM 
        Dependant d
    JOIN 
        HouseholdMembers hm ON d.dependant_id = hm.user_id
    UNION
    -- Get spouses
    SELECT 
        m.spouse_id_2 AS user_id 
    FROM 
        Married m 
    JOIN 
        HouseholdMembers hm ON m.spouse_id_1 = hm.user_id
    UNION
    SELECT 
        m.spouse_id_1 AS user_id 
    FROM 
        Married m 
    JOIN 
        HouseholdMembers hm ON m.spouse_id_2 = hm.user_id
)

SELECT DISTINCT hm.user_id, u.name
FROM HouseholdMembers hm
JOIN Users u ON hm.user_id = u.user_id;
