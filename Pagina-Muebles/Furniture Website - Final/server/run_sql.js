require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: node run_sql.js <relative-path-to-sql-file>');
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), arg);
  if (!fs.existsSync(filePath)) {
    console.error('SQL file not found:', filePath);
    process.exit(1);
  }

  const sql = fs.readFileSync(filePath, 'utf8');

  const connConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'Christian',
    password: process.env.DB_PASS || '2003Mayo04$',
    multipleStatements: true
  };

  try {
    const conn = await mysql.createConnection(connConfig);
    console.log('Connected to MySQL, executing SQL file:', filePath);
    await conn.query(sql);
    console.log('SQL executed successfully.');
    await conn.end();
  } catch (err) {
    console.error('Error executing SQL:', err.message || err);
    process.exit(1);
  }
}

main();
