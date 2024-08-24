const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const pool = require('./db');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes

// Get all products with their categories
app.get('/products', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT products.*, categories.name as category_name 
      FROM products 
      LEFT JOIN categories ON products.category_id = categories.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    if (conn) conn.end();
  }
});

// Add a new product
app.post('/products', upload.single('image'), async (req, res) => {
  const { name, description, price, category_id } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO products (name, description, price, imageUrl, category_id) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, imageUrl, category_id]
    );

    const newProduct = {
      id: result.insertId.toString(),
      name,
      description,
      price,
      imageUrl,
      category_id
    };

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    if (conn) conn.end();
  }
});

// Add a new category
app.post('/categories', async (req, res) => {
  const { name, description } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description]
    );

    res.json({ id: result.insertId, name, description });
  } catch (err) {
    res.status(400).json({ message: 'Error adding category' });
  } finally {
    if (conn) conn.end();
  }
});

// Get all categories
app.get('/categories', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const results = await conn.query('SELECT * FROM categories');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    if (conn) conn.end();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
