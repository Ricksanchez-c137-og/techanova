CREATE DATABASE IF NOT EXISTS contactdb;

USE contactdb;

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,       
    email VARCHAR(255) NOT NULL,      
    subject VARCHAR(255),            
    message TEXT NOT NULL,            
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS flags (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    flag VARCHAR(255) NOT NULL         
);

INSERT INTO flags (flag) VALUES ("Al-Hosn{sql_injection_success}");
