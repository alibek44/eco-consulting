import pg from 'pg';

const { Pool } = pg;

let pool;
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

async function ensureTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      org        TEXT,
      email      TEXT NOT NULL,
      phone      TEXT,
      service    TEXT,
      message    TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL is not set' });
  }

  let client;
  try {
    client = await getPool().connect();
  } catch (err) {
    return res.status(500).json({ error: 'DB connection failed', detail: err.message });
  }

  try {
    await ensureTable(client);

    if (req.method === 'POST') {
      const { name, org, email, phone, service, message } = req.body;

      if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).json({ error: 'name, email and message are required' });
      }

      const result = await client.query(
        `INSERT INTO contact_submissions (name, org, email, phone, service, message)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, created_at`,
        [name.trim(), org?.trim() || null, email.trim(),
         phone?.trim() || null, service?.trim() || null, message.trim()]
      );
      return res.status(201).json(result.rows[0]);
    }

    if (req.method === 'GET') {
      const result = await client.query(
        'SELECT * FROM contact_submissions ORDER BY created_at DESC'
      );
      return res.json(result.rows);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
}
