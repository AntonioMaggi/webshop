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

app.post('/products', upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO products (name, description, price, imageUrl) VALUES (?, ?, ?, ?)',
      [name, description, price, imageUrl]
    );

    const newProduct = {
      id: result.insertId.toString(),
      name,
      description,
      price,
      imageUrl
    };

    res.status(201).json(newProduct);
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
