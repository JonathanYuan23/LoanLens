-- userInfo.sql
-- Index on Users table (primary key is already indexed)
CREATE INDEX idx_users_user_id ON Users(user_id);

-- Index on Loans table
CREATE INDEX idx_loans_user_id ON Loans(user_id);

-- Index on AssetToOwner table
CREATE INDEX idx_assettoowner_user_id ON AssetToOwner(user_id);

-- Index on Assets table
CREATE INDEX idx_assets_asset_id ON Assets(asset_id);
