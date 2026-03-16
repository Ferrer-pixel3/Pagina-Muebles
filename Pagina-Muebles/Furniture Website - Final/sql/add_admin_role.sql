-- Añade columna role a users y crea/actualiza un usuario admin
USE furniture_db;

-- Si la columna 'role' no existe, alteramos la tabla. Algunos motores MySQL
-- no soportan ADD COLUMN IF NOT EXISTS, así que utilizamos una comprobación
-- en information_schema y PREPARE/EXECUTE para mantener compatibilidad.
SET @col_exists = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = 'furniture_db' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'
);
SET @sql_stmt = IF(@col_exists = 0,
  'ALTER TABLE users ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT \'user\'',
  'SELECT \'column_role_already_exists\''
);
PREPARE stmt FROM @sql_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Crear un admin (si ya existe el correo lo actualiza)
INSERT INTO users (name, email, password_hash, role)
VALUES ('Administrador','admin@ferrer.com','$2b$10$uCpBj3mK/x3Kw5.Rp5tmouKoUpd3zV1AKtrrpC/pho0zZf/wSJwra','admin')
ON DUPLICATE KEY UPDATE role = 'admin', name = VALUES(name);

-- Nota: la contraseña insertada arriba es un hash de ejemplo; si quieres generar
-- una contraseña distinta usa el script hash_generator.js o genera un hash y
-- actualiza manualmente el campo `password_hash`.
