-- seed.sql
-- Mock data for Crypto Dashboard

USE cryptodashboard;

-- Insert Mock Users
INSERT INTO users (id, email, password_hash, first_name) VALUES
('usr-1', 'alex@example.com', '$2b$10$xyz', 'Alexandre'),
('usr-2', 'maria@example.com', '$2b$10$abc', 'Maria');

-- Insert Mock Coins (from CoinGecko)
INSERT INTO coins (id, symbol, name, image_url) VALUES
('bitcoin', 'btc', 'Bitcoin', 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'),
('ethereum', 'eth', 'Ethereum', 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'),
('solana', 'sol', 'Solana', 'https://assets.coingecko.com/coins/images/4128/large/solana.png');

-- Insert Mock Watchlists
INSERT INTO watchlists (user_id, coin_id) VALUES
('usr-1', 'bitcoin'),
('usr-1', 'ethereum'),
('usr-2', 'solana');

-- Insert Mock Price Alerts
INSERT INTO price_alerts (id, user_id, coin_id, target_price, condition_type) VALUES
('alert-1', 'usr-1', 'bitcoin', 100000.00, 'ABOVE'),
('alert-2', 'usr-1', 'ethereum', 2000.00, 'BELOW');
