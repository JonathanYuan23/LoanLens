SELECT u.name, SUM(a.worth) AS total_assets
FROM Users u
LEFT JOIN AssetToOwner ao ON u.user_id = ao.user_id
LEFT JOIN Assets a ON ao.asset_id = a.asset_id
WHERE u.user_id = <user_id>
GROUP BY u.user_id;
