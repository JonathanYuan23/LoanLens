DELIMITER //

CREATE TRIGGER delete_fully_paid_loan
AFTER UPDATE ON Loans
FOR EACH ROW
BEGIN
    IF NEW.loan_amount <= NEW.balance_paid THEN
        DELETE FROM Loans WHERE loan_id = NEW.loan_id;
    END IF;
END;
//

DELIMITER ;

