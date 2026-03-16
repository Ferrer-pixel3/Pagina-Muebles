const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configuración de conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Christian',          // tu usuario correcto
  password: '2003Mayo04$',    // tu contraseña real
  database: 'furniture_db'
});

// Conectar a la base
db.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Ruta para guardar contactos
app.post('/contacto', (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  const sql = 'INSERT INTO contactos (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, correo, asunto, mensaje], (err, result) => {
    if (err) {
      console.error('Error al insertar:', err);
      return res.json({ ok: false });
    }
    res.json({ ok: true });
  });
});

// Servidor en puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});