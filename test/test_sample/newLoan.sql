INSERT INTO Loans (user_id, reason, loan_amount, balance_paid, date_created)
VALUES (
    (SELECT user_id FROM Users WHERE name = 'Albert Keith'),
    'car',
    10000,
    0,
    '2023-05-09 01:25:26'
);
