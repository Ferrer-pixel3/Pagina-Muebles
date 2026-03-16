-- Script para crear la base de datos `contactos` y la tabla `contacts`
CREATE DATABASE IF NOT EXISTS contactos;
USE contactos;

CREATE TABLE IF NOT EXISTS contacts (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) DEFAULT NULL,
  message TEXT DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserta ejemplos (opcional)
INSERT INTO contacts (name, email, subject, message) VALUES
('Juan Perez','juan@example.com','Consulta','Hola, quisiera información sobre la mesa.');
