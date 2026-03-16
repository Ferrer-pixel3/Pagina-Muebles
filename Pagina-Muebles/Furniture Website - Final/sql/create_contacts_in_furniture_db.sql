-- Crea la tabla `contacts` dentro de la base de datos `furniture_db`
-- Ejecuta esto en MySQL Workbench con la conexión a tu servidor MySQL

CREATE DATABASE IF NOT EXISTS furniture_db;
USE furniture_db;

CREATE TABLE IF NOT EXISTS contacts (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) DEFAULT NULL,
  message TEXT DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Ejemplo de inserción
INSERT INTO contacts (name, email, subject, message) VALUES
('Prueba','prueba@example.com','Consulta ejemplo','Este es un mensaje de prueba');
