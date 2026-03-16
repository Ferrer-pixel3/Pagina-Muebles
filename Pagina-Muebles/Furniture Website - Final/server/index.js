require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Allow frontend at Live Server origin to send credentials (cookies)
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }));

const SESSION_SECRET = process.env.SESSION_SECRET || 'change_this_secret';
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, sameSite: 'lax' }
}));

  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'Christian',
    password: process.env.DB_PASS || '2003Mayo04$',
    database: process.env.DB_NAME || 'furniture_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }).promise();

  async function testDb() {
    try {
      await pool.query('SELECT 1');
      console.log('Connected to MySQL.');
    } catch (err) {
      console.error('Error connecting to MySQL:', err.message);
      process.exit(1);
    }
  }
  testDb();

  // Contacts endpoints
  app.get('/api/contacts', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM contacts ORDER BY id DESC');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/contacts', async (req, res) => {
    try {
      const name = req.body.name || req.body.nombre || '';
      const email = req.body.email || req.body.correo || '';
      const subject = req.body.subject || req.body.asunto || null;
      const message = req.body.message || req.body.mensaje || null;
      const [result] = await pool.query(
        'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject, message]
      );
      res.json({ ok: true, id: result.insertId });
    } catch (err) {
      console.error('Error inserting contact:', err.message);
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  // --- Authentication endpoints ---
  app.post('/api/register', async (req, res) => {
    try {
      const name = req.body.name || req.body.nombre || null;
      const email = req.body.email || req.body.correo;
      const password = req.body.password;
      if (!email || !password) return res.status(400).json({ ok: false, error: 'Email and password required' });

      const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
      if (existing.length) return res.status(409).json({ ok: false, error: 'Email already registered' });

      const hash = await bcrypt.hash(password, 10);
      const [result] = await pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, hash]);
      req.session.userId = result.insertId;
      res.json({ ok: true, id: result.insertId });
    } catch (err) {
      console.error('Register error:', err.message);
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  app.post('/api/login', async (req, res) => {
    try {
      const email = req.body.email || req.body.correo;
      const password = req.body.password;
      if (!email || !password) return res.status(400).json({ ok: false, error: 'Email and password required' });

      const [rows] = await pool.query('SELECT id, name, email, password_hash, role FROM users WHERE email = ?', [email]);
      const user = rows[0];
      if (!user) return res.status(401).json({ ok: false, error: 'Invalid credentials' });

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ ok: false, error: 'Invalid credentials' });

      req.session.userId = user.id;
      res.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
      res.json({ ok: true });
    });
  });

  app.get('/api/me', async (req, res) => {
    try {
      if (!req.session.userId) return res.json({ user: null });
      const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [req.session.userId]);
      res.json({ user: rows[0] || null });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Admin middleware
  async function requireAdmin(req, res, next) {
    try {
      if (!req.session.userId) return res.status(401).json({ ok: false, error: 'Not authenticated' });
      const [rows] = await pool.query('SELECT role FROM users WHERE id = ?', [req.session.userId]);
      const user = rows[0];
      if (!user || user.role !== 'admin') return res.status(403).json({ ok: false, error: 'Admin required' });
      next();
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  }

  // --- Admin routes: manage purchases ---
  app.get('/api/admin/purchases', requireAdmin, async (req, res) => {
    try {
      const [pRows] = await pool.query('SELECT * FROM purchases ORDER BY id DESC');
      for (const p of pRows) {
        const [items] = await pool.query('SELECT id, product_id, product_name, unit_price, quantity, subtotal FROM purchase_items WHERE purchase_id = ?', [p.id]);
        p.items = items;
      }
      res.json({ ok: true, purchases: pRows });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  app.delete('/api/admin/purchases/:id', requireAdmin, async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!id) return res.status(400).json({ ok: false, error: 'Invalid id' });
      await pool.query('DELETE FROM purchases WHERE id = ?', [id]);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  // Allow updating buyer info for a purchase
  app.put('/api/admin/purchases/:id', requireAdmin, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const buyerName = req.body.buyerName || null;
      const buyerEmail = req.body.buyerEmail || null;
      const phone = req.body.phone || null;
      const address = req.body.address || null;
      const location = req.body.location || null;
      if (!id) return res.status(400).json({ ok: false, error: 'Invalid id' });
      await pool.query('UPDATE purchases SET buyer_name = ?, buyer_email = ?, phone = ?, address = ?, location = ? WHERE id = ?', [buyerName, buyerEmail, phone, address, location, id]);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  // --- Purchases endpoints ---
  // Create a purchase (guest or logged-in user)
  app.post('/api/purchases', async (req, res) => {
    let conn;
    try {
      const buyerName = req.body.buyerName || req.body.nombre || null;
      const buyerEmail = req.body.buyerEmail || req.body.email || req.body.correo || null;
      const phone = req.body.phone || req.body.telefono || null;
      const address = req.body.address || req.body.direccion || null;
      const location = req.body.location || req.body.ubicacion || null;
      const items = Array.isArray(req.body.items) ? req.body.items : [];
      if (!items.length) return res.status(400).json({ ok: false, error: 'No items provided' });

      // compute totals
      let total = 0;
      const normalized = items.map(it => {
        const qty = Number(it.quantity || it.qty || 1);
        const unit = Number(it.unit_price || it.price || it.p) || Number(it.price) || 0;
        const subtotal = Math.round((qty * unit + Number.EPSILON) * 100) / 100;
        total += subtotal;
        return { product_id: it.id || it.product_id || null, product_name: it.name || it.product_name || null, unit_price: unit, quantity: qty, subtotal };
      });

      conn = await pool.getConnection();
      await conn.beginTransaction();

      const [pRes] = await conn.query('INSERT INTO purchases (user_id, buyer_name, buyer_email, phone, address, location, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.session.userId || null, buyerName, buyerEmail, phone, address, location, total]);
      const purchaseId = pRes.insertId;

      for (const it of normalized) {
        await conn.query('INSERT INTO purchase_items (purchase_id, product_id, product_name, unit_price, quantity, subtotal) VALUES (?, ?, ?, ?, ?, ?)', [purchaseId, it.product_id, it.product_name, it.unit_price, it.quantity, it.subtotal]);
      }

      await conn.commit();
      res.json({ ok: true, id: purchaseId });
    } catch (err) {
      if (conn) await conn.rollback();
      console.error('Purchase save error:', err.message);
      res.status(500).json({ ok: false, error: err.message });
    } finally {
      if (conn) conn.release();
    }
  });

  // Get purchases for current logged-in user
  app.get('/api/purchases', async (req, res) => {
    try {
      if (!req.session.userId) return res.status(401).json({ ok: false, error: 'Not authenticated' });
      const [pRows] = await pool.query('SELECT * FROM purchases WHERE user_id = ? ORDER BY id DESC', [req.session.userId]);
      // fetch items for each purchase
      for (const p of pRows) {
        const [items] = await pool.query('SELECT product_id, product_name, unit_price, quantity, subtotal FROM purchase_items WHERE purchase_id = ?', [p.id]);
        p.items = items;
      }
      res.json({ ok: true, purchases: pRows });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
