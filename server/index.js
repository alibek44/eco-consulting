import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const { Pool } = pg;

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME     || 'ecoproekt',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Create table on startup if it doesn't exist
await pool.query(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    org         TEXT,
    email       TEXT NOT NULL,
    phone       TEXT,
    service     TEXT,
    message     TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
  )
`);

// POST /api/contact — save a new submission
app.post('/api/contact', async (req, res) => {
  const { name, org, email, phone, service, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'name, email and message are required' });
  }

  const result = await pool.query(
    `INSERT INTO contact_submissions (name, org, email, phone, service, message)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, created_at`,
    [name.trim(), org?.trim() || null, email.trim(), phone?.trim() || null, service?.trim() || null, message.trim()]
  ).catch((err) => {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
    return null;
  });

  if (!result) return;
  res.status(201).json({ id: result.rows[0].id, created_at: result.rows[0].created_at });
});

// GET /api/contact — list all submissions (protect this in production)
app.get('/api/contact', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM contact_submissions ORDER BY created_at DESC'
  ).catch((err) => {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
    return null;
  });

  if (!result) return;
  res.json(result.rows);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
