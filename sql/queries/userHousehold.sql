WITH RECURSIVE household_members AS (
    -- Start with the user themselves
    SELECT 
        user_id
    FROM 
        Users
    WHERE 
        user_id = <user_id>
    
    UNION
    
    -- Find dependents and providers
    SELECT 
        dependant_id AS user_id
    FROM 
        Dependant
    WHERE 
        provider_id = <user_id>
    
    UNION
    
    SELECT 
        provider_id AS user_id
    FROM 
        Dependant
    WHERE 
        dependant_id = <user_id>
    
    UNION
    
    -- Find spouses
    SELECT 
        spouse_id_2 AS user_id
    FROM 
        Married
    WHERE 
        spouse_id_1 = <user_id>
    
    UNION
    
    SELECT 
        spouse_id_1 AS user_id
    FROM 
        Married
    WHERE 
        spouse_id_2 = <user_id>
)
SELECT 
    u.user_id, u.name
FROM 
    household_members hm
JOIN 
    Users u ON hm.user_id = u.user_id
ORDER BY 
    u.user_id;
