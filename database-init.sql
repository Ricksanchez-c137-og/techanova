CREATE DATABASE IF NOT EXISTS contactdb
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE contactdb;

CREATE TABLE IF NOT EXISTS messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    subject VARCHAR(255),
    message TEXT,
    ip_address VARCHAR(45),
    status ENUM('pending', 'read', 'replied', 'archived') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS flags (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    flag VARCHAR(255) NOT NULL,
    points INT UNSIGNED DEFAULT 0,
    capture_count INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS flag_captures (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    flag_id BIGINT UNSIGNED NOT NULL,
    captured_by VARCHAR(255),
    captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (flag_id) REFERENCES flags(id)
);

INSERT INTO flags (flag, points) VALUES 
('145202', 500),
('712354', 400),
('934854', 300),
('445123', 250),
('662311', 350);

DELIMITER //

CREATE PROCEDURE validate_flag(IN flag_attempt VARCHAR(255))
BEGIN
    SET @sql = CONCAT('SELECT id, points FROM flags WHERE flag = ''', flag_attempt, '''');

    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END //

CREATE PROCEDURE search_messages(IN search_term VARCHAR(255))
BEGIN
    SET @sql = CONCAT('SELECT * FROM messages WHERE subject LIKE ''%', search_term, '%'' OR message LIKE ''%', search_term, '%''');

    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END //

DELIMITER ;
