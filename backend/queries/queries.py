from db import db
from sqlalchemy.sql import text

def get_all_assets(user_id):
    sql_query = text("""
        SELECT 
            Assets.asset_type,
            Assets.worth
        FROM 
            Assets
        JOIN 
            AssetToOwner ON Assets.asset_id = AssetToOwner.asset_id
        WHERE 
            AssetToOwner.user_id = :user_id;
    """)
    result = db.session.execute(sql_query, {'user_id': int(user_id)})
    assets = [{'asset_type': row[0], 'asset_value': row[1]} for row in result]
    return {'user_id': user_id, 'assets': assets}

def get_loan_history(user_id):
    sql_query = text("""
        SELECT 
            reason,
            loan_amount,
            balance_paid,
            date_created
        FROM 
            Loans
        WHERE 
            user_id = :user_id;
    """)
    result = db.session.execute(sql_query, {'user_id': int(user_id)})
    loans = [{'reason': row[0], 'loan_amount': row[1], 'balance_paid': row[2], 'date_created': row[3]} for row in result]
    return {'user_id': user_id, 'loans': loans}

def get_household_income(user_id):
    try:
        sql_query = text("""
WITH RECURSIVE HouseholdMembers AS (
    -- Anchor member: the given user
    SELECT 
        user_id 
    FROM 
        Users 
    WHERE 
        user_id = :user_id

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
        """)
        result = db.session.execute(sql_query, {'user_id': int(user_id)})
        household_income = result.scalar()
        return {'user_id': user_id, 'household_income': household_income}
    except Exception as e:
        return {'error': str(e)}
