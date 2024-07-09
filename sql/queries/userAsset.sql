SELECT 
    Assets.asset_id,
    Assets.asset_type,
    Assets.worth
FROM 
    Assets
JOIN 
    AssetToOwner ON Assets.asset_id = AssetToOwner.asset_id
WHERE 
    AssetToOwner.user_id = <user_id>;


