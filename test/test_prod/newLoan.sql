INSERT INTO Loans (user_id, reason, loan_amount, balance_paid, date_created)
VALUES (
    (SELECT user_id FROM Users WHERE user_id = 4),
    'loan_reason',
    555,
    0,
    '2017-11-23 00:00:00'
);
