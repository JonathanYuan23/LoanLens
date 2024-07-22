INSERT INTO Loans (user_id, reason, loan_amount, balance_paid, date_created)
VALUES (
    (SELECT user_id FROM Users WHERE user_id = <user_id>),
    '<loan_reason>',
    <loan_amount>,
    <balance_paid>,
    '<date_created>'
);

