const express = require('express');
const cors = require('cors');
// const { Pool } = require('pg');  // Commented out to disable DB logic

const app = express();
app.use(express.json());
app.use(cors());

// =============================
// DISABLE POSTGRESQL LOGIC
// =============================
/*
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    'postgresql://nementumwaitlist_user:hNfsMfVaDqS1QLltCEE8dMI6Gzl8HshR@dpg-ct43iurtq21c7390i1tg-a.oregon-postgres.render.com/nementumwaitlist',
  ssl: { rejectUnauthorized: false },
});

(async function createTableIfNotExists() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS waitlist_emails (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Table 'waitlist_emails' is created or already exists.");
  } catch (err) {
    console.error("Error creating table 'waitlist_emails':", err);
  }
})();
*/

// 2) Serve static files from the “public” folder
app.use(express.static('public'));

// =============================
// DISABLE /api/waitlist route
// =============================
/*
app.post('/api/waitlist', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'No email provided' });
  }

  try {
    await pool.query('INSERT INTO waitlist_emails (email) VALUES ($1)', [email]);
    return res.json({ success: true });
  } catch (error) {
    console.error('Error inserting email:', error);
    return res.status(500).json({ success: false, message: 'Database error' });
  }
});
*/

// 4) Start listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
