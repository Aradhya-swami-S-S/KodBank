-- KodBank Database Schema
-- Run this SQL on your Aiven MySQL database

CREATE DATABASE IF NOT EXISTS KodBank;
USE KodBank;

-- KodUser Table
CREATE TABLE IF NOT EXISTS KodUser (
  uid INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  role ENUM('customer', 'manager', 'admin') DEFAULT 'customer',
  balance DECIMAL(15, 2) DEFAULT 100000.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- UserToken Table
CREATE TABLE IF NOT EXISTS UserToken (
  tid INT PRIMARY KEY AUTO_INCREMENT,
  token TEXT NOT NULL,
  uid INT NOT NULL,
  expiry DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uid) REFERENCES KodUser(uid) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_username ON KodUser(username);
CREATE INDEX idx_email ON KodUser(email);
CREATE INDEX idx_uid_token ON UserToken(uid);
