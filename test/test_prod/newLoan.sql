INSERT INTO Loans (user_id, reason, loan_amount, balance_paid, date_created)
VALUES (
    (SELECT user_id FROM Users WHERE name = 'Laura Coffey'),
    'test',
    10000,
    5,
    '2017-08-21 00:00:00'
);

