-- Crea tablas para almacenar compras y sus items en la base `furniture_db`
CREATE DATABASE IF NOT EXISTS furniture_db;
USE furniture_db;

CREATE TABLE IF NOT EXISTS purchases (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL,
  buyer_name VARCHAR(255) DEFAULT NULL,
  buyer_email VARCHAR(255) DEFAULT NULL,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (user_id),
  CONSTRAINT fk_purchase_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS purchase_items (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  purchase_id INT NOT NULL,
  product_id INT DEFAULT NULL,
  product_name VARCHAR(255) DEFAULT NULL,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  quantity INT NOT NULL DEFAULT 1,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  CONSTRAINT fk_item_purchase FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Nota: importar este archivo en MySQL Workbench o usando mysql.exe
