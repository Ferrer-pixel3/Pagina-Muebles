require('dotenv').config();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function main() {
  const password = process.argv[2];
  if (!password) {
    console.error('Usage: node set_admin_password.js "<new-password>"');
    process.exit(1);
  }

  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'Christian',
    password: process.env.DB_PASS || '2003Mayo04$',
    database: process.env.DB_NAME || 'furniture_db'
  };

  try {
    const hash = await bcrypt.hash(password, 10);
    const conn = await mysql.createConnection(config);
    console.log('Connected to MySQL, updating admin password...');

    // Try to update existing admin
    const [res] = await conn.execute(
      'UPDATE users SET password_hash = ?, role = ? WHERE email = ?',
      [hash, 'admin', 'admin@ferrer.com']
    );

    if (res.affectedRows === 0) {
      // Insert new admin user if update didn't affect rows
      const [ins] = await conn.execute(
        'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        ['Administrador', 'admin@ferrer.com', hash, 'admin']
      );
      console.log('Admin user created with id', ins.insertId);
    } else {
      console.log('Admin password updated');
    }

    await conn.end();
    console.log('Done. You can now login as admin@ferrer.com with the provided password.');
  } catch (err) {
    console.error('Error setting admin password:', err.message || err);
    process.exit(1);
  }
}

main();
