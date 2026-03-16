-- Agrega campos de dirección, teléfono y ubicación a la tabla purchases
USE furniture_db;

SET @col_exists_addr = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = 'furniture_db' AND TABLE_NAME = 'purchases' AND COLUMN_NAME = 'address'
);
SET @sql_addr = IF(@col_exists_addr = 0,
  'ALTER TABLE purchases ADD COLUMN address VARCHAR(500) DEFAULT NULL',
  'SELECT \'column_address_already_exists\''
);
PREPARE stmt_addr FROM @sql_addr;
EXECUTE stmt_addr;
DEALLOCATE PREPARE stmt_addr;

SET @col_exists_phone = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = 'furniture_db' AND TABLE_NAME = 'purchases' AND COLUMN_NAME = 'phone'
);
SET @sql_phone = IF(@col_exists_phone = 0,
  'ALTER TABLE purchases ADD COLUMN phone VARCHAR(20) DEFAULT NULL',
  'SELECT \'column_phone_already_exists\''
);
PREPARE stmt_phone FROM @sql_phone;
EXECUTE stmt_phone;
DEALLOCATE PREPARE stmt_phone;

SET @col_exists_location = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = 'furniture_db' AND TABLE_NAME = 'purchases' AND COLUMN_NAME = 'location'
);
SET @sql_location = IF(@col_exists_location = 0,
  'ALTER TABLE purchases ADD COLUMN location VARCHAR(200) DEFAULT NULL',
  'SELECT \'column_location_already_exists\''
);
PREPARE stmt_location FROM @sql_location;
EXECUTE stmt_location;
DEALLOCATE PREPARE stmt_location;
