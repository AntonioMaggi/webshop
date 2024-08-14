const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/products', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    if (conn) conn.end();
  }
});

app.post('/products', async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query('INSERT INTO products (name, description, price, imageUrl) VALUES (?, ?, ?, ?)', [name, description, price, imageUrl]);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    if (conn) conn.end();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
