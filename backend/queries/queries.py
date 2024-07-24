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
    # calculate total value of assets
    total = 0
    for asset in assets:
        total += asset['asset_value']
    return {'user_id': user_id, 'total_asset_amount': total, 'assets': assets}

def get_loan_history(user_id):
    sql_query = text("""
        SELECT 
            loan_id,
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
    loans = [{'loan_id': row[0], 'reason': row[1], 'loan_amount': row[2], 'balance_paid': row[3], 'date_created': row[4]} for row in result]
    # calculate total vlaue of outstanding loans
    total = 0
    for loan in loans:
        total += loan['loan_amount']
    return {'user_id': user_id, 'total_loan_amount': total, 'loans': loans}

def search_by_name(name):
    sql_query = text("""
        SELECT * FROM Users WHERE name LIKE :name;
    """)
    result = db.session.execute(sql_query, {'name': f'%{name}%'})
    print(row[0] for row in result)
    results = [dict(row) for row in result.mappings()]
    return results

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

def pay_loan(loan_id, amount):
    sql_query = text("""
        UPDATE Loans
        SET balance_paid = balance_paid + :amount
        WHERE loan_id = :loan_id;
    """)
    db.session.execute(sql_query, {'amount': amount, 'loan_id': loan_id})
    db.session.commit()

def new_loan(user_id, loan_reason, loan_amount, balance_paid, date_created):
    # Define the SQL query
    sql_query = text("""
        INSERT INTO Loans (user_id, reason, loan_amount, balance_paid, date_created)
        VALUES (
            :user_id,
            :loan_reason,
            :loan_amount,
            :balance_paid,
            :date_created
        );
    """)
    
    # Execute the query with the given parameters
    db.session.execute(sql_query, {
        'user_id': user_id,
        'loan_reason': loan_reason,
        'loan_amount': loan_amount,
        'balance_paid': balance_paid,
        'date_created': date_created
    })
    db.session.commit()

def get_user_household_member(user_id):
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
            SELECT DISTINCT hm.user_id, u.name
            FROM HouseholdMembers hm
            JOIN Users u ON hm.user_id = u.user_id;
        """)
    result = db.session.execute(sql_query, {'user_id': user_id})
        
    # Convert results to a list of user_ids
    household_members_list = [{'user_id':row[0], 'name':row[1]} for row in result]
    return household_members_list

def register_user(name, address, dob, city_name, company_name, job_title, income):
    # Find city_id from City table
    city_query = text("SELECT city_id FROM City WHERE city_name = :city_name LIMIT 1")
    city_result = db.session.execute(city_query, {'city_name': city_name}).fetchone()
    city_id = city_result[0] if city_result else None

    # Find company_id from Company table
    company_query = text("SELECT company_id FROM Company WHERE company_name = :company_name LIMIT 1")
    company_result = db.session.execute(company_query, {'company_name': company_name}).fetchone()
    company_id = company_result[0] if company_result else None

    # Find job_id from Job table
    job_query = text("SELECT job_id FROM Job WHERE job_title = :job_title LIMIT 1")
    job_result = db.session.execute(job_query, {'job_title': job_title}).fetchone()
    job_id = job_result[0] if job_result else None

    # Find the next user_id from Users table
    user_query = text("SELECT COALESCE(MAX(user_id), 0) + 1 AS new_user_id FROM Users")
    user_result = db.session.execute(user_query).fetchone()
    user_id = user_result[0]
    # Insert new user into Users table
    sql_query = text("""
        INSERT INTO Users (user_id, name, address, dob, city_id, company_id, job_id, income)
        VALUES (:user_id, :name, :address, :dob, :city_id, :company_id, :job_id, :income)
    """)
    db.session.execute(sql_query, {
            'user_id': user_id,
            'name': name,
            'address': address,
            'dob': dob,
            'city_id': city_id,
            'company_id': company_id,
            'job_id': job_id,
            'income': income
        })
    db.session.commit()