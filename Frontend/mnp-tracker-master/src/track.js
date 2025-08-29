const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MNP_tracker',
  password: 'root',
  port: 5432,
});

app.get('/requests/status/:upcCode', async (req, res) => {
  const { upcCode } = req.params;

  try {
    const result = await pool.query(
      'SELECT status FROM porting_requests WHERE upc_code = $1 LIMIT 1',
      [upcCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'UPC code not found. Please check and try again.' });
    }

    res.json({ status: result.rows[0].status });
  } catch (err) {
    console.error('DB error fetching status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 8087;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
