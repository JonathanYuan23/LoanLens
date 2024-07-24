SELECT 
    U.income AS salary,
    COALESCE(SUM(L.loan_amount), 0) AS total_loans,
    COALESCE(SUM(A.worth), 0) AS total_assets,
    COALESCE(SUM(L.balance_paid), 0) AS total_balance_paid
FROM 
    Users U
LEFT JOIN 
    Loans L ON U.user_id = L.user_id
LEFT JOIN 
    AssetToOwner AO ON U.user_id = AO.user_id
LEFT JOIN 
    Assets A ON AO.asset_id = A.asset_id
WHERE 
    U.user_id = <user_id>
GROUP BY 
    U.user_id, U.income;

