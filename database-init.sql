CREATE DATABASE contactdb;
USE contactdb;
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    subject VARCHAR(255),
    message TEXT
);
CREATE TABLE flags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flag VARCHAR(255)
);
INSERT INTO flags (flag) VALUES ("Al-Hosn{sql_injection_success}");