-- Crea la tabla `users` en la base `furniture_db`
CREATE DATABASE IF NOT EXISTS furniture_db;
USE furniture_db;

CREATE TABLE IF NOT EXISTS users (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ejemplo (opcional)
INSERT INTO users (name, email, password_hash) VALUES
('Admin','admin@example.com','$2b$10$uCpBj3mK/x3Kw5.Rp5tmouKoUpd3zV1AKtrrpC/pho0zZf/wSJwra');
