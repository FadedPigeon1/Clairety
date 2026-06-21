require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Larger limit for base64 images

// Initialize SQLite Database
const dbPath = path.resolve(__dirname, 'clairety.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(
      `CREATE TABLE IF NOT EXISTS closet_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL,
        price REAL,
        store TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
          return;
        }
        // Seed with mock data if empty
        db.get('SELECT COUNT(*) AS count FROM closet_items', (err, row) => {
          if (row && row.count === 0) {
            const insertStmt = db.prepare(
              'INSERT INTO closet_items (name, category, image, price, store) VALUES (?, ?, ?, ?, ?)'
            );
            insertStmt.run(
              'Vintage Denim Jacket',
              'Outerwear',
              'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
              null,
              null
            );
            insertStmt.run(
              'White Canvas Sneakers',
              'Shoes',
              'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
              null,
              null
            );
            insertStmt.run(
              'Black Turtleneck',
              'Tops',
              'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
              null,
              null
            );
            insertStmt.run(
              'Slim Fit Chinos',
              'Bottoms',
              'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
              null,
              null
            );
            insertStmt.finalize();
            console.log('Seeded database with sample items.');
          }
        });
      }
    );
  }
});

// --- API Routes ---

// GET all closet items
app.get('/api/closet', (req, res) => {
  db.all('SELECT * FROM closet_items ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// POST add a new closet item
app.post('/api/closet', (req, res) => {
  const { name, category, image } = req.body;
  if (!name || !category || !image) {
    return res
      .status(400)
      .json({ error: 'Missing required fields: name, category, image' });
  }

  db.run(
    'INSERT INTO closet_items (name, category, image) VALUES (?, ?, ?)',
    [name, category, image],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: { id: this.lastID, name, category, image },
      });
    }
  );
});

// DELETE a closet item by ID
app.delete('/api/closet/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM closet_items WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'success' });
  });
});

// GET outfit suggestions (mock data for now)
app.get('/api/suggestions', (req, res) => {
  const SUGGESTIONS = [
    {
      id: '101',
      store: 'ASOS',
      name: 'Relaxed Fit Chinos',
      price: 45,
      image:
        'https://images.unsplash.com/photo-1473966968600-fa801b1c7dc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      url: 'https://www.asos.com',
    },
    {
      id: '102',
      store: 'Nordstrom',
      name: 'Classic Wool Coat',
      price: 120,
      image:
        'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      url: 'https://www.nordstrom.com',
    },
    {
      id: '103',
      store: 'Zara',
      name: 'Oversized Knit Sweater',
      price: 60,
      image:
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      url: 'https://www.zara.com',
    },
  ];
  res.json({ data: SUGGESTIONS });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Listen on 0.0.0.0 so phone on same WiFi can reach the backend
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ Clairety backend running on http://0.0.0.0:${PORT}`);
});
