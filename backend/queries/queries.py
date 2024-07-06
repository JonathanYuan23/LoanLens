from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def get_all_assets(user_id):
    sql_query = """
        SELECT 
            Assets.asset_type,
            Assets.worth
        FROM 
            Assets
        JOIN 
            AssetToOwner ON Assets.asset_id = AssetToOwner.asset_id
        WHERE 
            AssetToOwner.user_id = :user_id;
    """
    result = db.engine.execute(sql_query, user_id=user_id)
    assets = [{'asset_type': row['asset_type'], 'asset_value': row['worth']} for row in result]
    return {'user_id': user_id, 'assets': assets}

def get_loan_history(user_id):
    sql_query = """
        SELECT 
            reason,
            loan_amount,
            balance_paid,
            date_created
        FROM 
            Loans
        WHERE 
            user_id = :user_id;
    """
    result = db.engine.execute(sql_query, user_id=user_id)
    loans = [{'reason': row['reason'], 'loan_amount': row['loan_amount'], 'balance_paid': row['balance_paid'], 'date_created': row['date_created']} for row in result]
    return {'user_id': user_id, 'loans': loans}

def get_household_income(user_id):
    sql_query = """
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
    """
    result = db.engine.execute(sql_query, user_id=user_id)
    household_income = result.scalar()
    return {'user_id': user_id, 'household_income': household_income}
