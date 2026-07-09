-- schema.sql
-- Crypto Dashboard Schema

CREATE DATABASE IF NOT EXISTS cryptodashboard;
USE cryptodashboard;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Coins Cache (to avoid hitting the API for basic info)
CREATE TABLE IF NOT EXISTS coins (
    id VARCHAR(50) PRIMARY KEY, -- CoinGecko ID
    symbol VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Watchlist (N:M relationship between users and coins)
-- In this simple version, 1 user has 1 main watchlist
CREATE TABLE IF NOT EXISTS watchlists (
    user_id VARCHAR(36) NOT NULL,
    coin_id VARCHAR(50) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, coin_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (coin_id) REFERENCES coins(id) ON DELETE CASCADE
);

-- Price Alerts
CREATE TABLE IF NOT EXISTS price_alerts (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    coin_id VARCHAR(50) NOT NULL,
    target_price DECIMAL(18, 8) NOT NULL,
    condition_type ENUM('ABOVE', 'BELOW') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (coin_id) REFERENCES coins(id) ON DELETE CASCADE
);
