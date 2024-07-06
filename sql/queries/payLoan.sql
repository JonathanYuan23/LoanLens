UPDATE Loans
SET balance_paid = balance_paid + <amount>
WHERE user_id = <user_id> AND reason = '<reason>';
