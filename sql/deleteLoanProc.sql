DELIMITER //

CREATE PROCEDURE delete_fully_paid_loans()
BEGIN
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE loan_id INT;
    
    DECLARE cur CURSOR FOR
        SELECT loan_id FROM Loans WHERE loan_amount = balance_paid;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO loan_id;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        DELETE FROM Loans WHERE loan_id = loan_id;
    END LOOP;
    
    CLOSE cur;
    
END //

DELIMITER ;
