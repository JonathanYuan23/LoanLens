SELECT user_id, SUM(loan_amount) AS total_loan_amount, SUM(balance_paid) AS total_balance_paid
FROM Loans
WHERE user_id = <user_id>
GROUP BY user_id;