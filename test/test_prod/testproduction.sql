-- userAllLoan.sql
SELECT 
    reason,
    loan_amount,
    balance_paid,
    date_created
FROM 
    Loans
WHERE 
    user_id = 22;

-- delimiter
--------------------------------------------------------------

-- userAsset.sql
SELECT 
    Assets.asset_id,
    Assets.asset_type,
    Assets.worth
FROM 
    Assets
JOIN 
    AssetToOwner ON Assets.asset_id = AssetToOwner.asset_id
WHERE 
    AssetToOwner.user_id = 21;

-- delimiter
--------------------------------------------------------------

-- userAssetValue.sql
SELECT u.name, SUM(a.worth) AS total_assets
FROM Users u
LEFT JOIN AssetToOwner ao ON u.user_id = ao.user_id
LEFT JOIN Assets a ON ao.asset_id = a.asset_id
WHERE u.user_id = 21
GROUP BY u.user_id;

-- delimiter
--------------------------------------------------------------

-- userHousehold.sql
WITH RECURSIVE HouseholdMembers AS (
    -- Anchor member: the given user
    SELECT 
        user_id 
    FROM 
        Users 
    WHERE 
        user_id = 4
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


-- delimiter
--------------------------------------------------------------

-- userHouseholdIncome.sql
WITH RECURSIVE HouseholdMembers AS (
    -- Anchor member: the given user
    SELECT 
        user_id 
    FROM 
        Users 
    WHERE 
        user_id = 6

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

SELECT 
    SUM(u.income) AS total_household_income
FROM 
    HouseholdMembers hm
JOIN 
    Users u ON hm.user_id = u.user_id;

-- delimiter
--------------------------------------------------------------

-- userLoanInfo.sql
SELECT user_id, SUM(loan_amount) AS total_loan_amount, SUM(balance_paid) AS total_balance_paid
FROM Loans
WHERE user_id = 14
GROUP BY user_id;

