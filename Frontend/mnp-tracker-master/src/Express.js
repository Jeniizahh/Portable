const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MNP_tracker',  // Make sure database name matches exactly
  password: 'root',
  port: 5432,
});

// Test DB connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
  }
  release();
});

app.get('/requests/upc/:mobileNumber', async (req, res) => {
  const mobileNumber = req.params.mobileNumber;

  try {
    const result = await pool.query(
      'SELECT upc_code FROM porting_requests WHERE subscriber_id = $1 LIMIT 1',
      [mobileNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mobile number not found. Please request for porting.' });
    }

    res.json({ upcCode: result.rows[0].upc_code });
  } catch (err) {
    console.error('DB error fetching UPC:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server on desired port
const PORT = process.env.PORT || 8086;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
