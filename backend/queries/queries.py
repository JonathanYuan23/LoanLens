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
    sql_query = text("""
        SELECT SUM(u.income) AS household_income
        FROM Users u
        WHERE u.user_id IN (
            SELECT household_member
            FROM (
                SELECT provider_id AS household_member
                FROM Dependant
                WHERE dependant_id = :user_id
                UNION
                SELECT dependant_id AS household_member
                FROM Dependant
                WHERE provider_id = :user_id
                UNION
                SELECT :user_id AS household_member 
            ) AS household_members
        );
    """)
    result = db.session.execute(sql_query, {'user_id': int(user_id)})
    household_income = result.scalar()
    return {'user_id': user_id, 'household_income': household_income}
