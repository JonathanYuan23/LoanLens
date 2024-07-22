SELECT 
    loan_id,
    reason,
    loan_amount,
    balance_paid,
    date_created
FROM 
    Loans
WHERE 
    user_id = <user_id>;

