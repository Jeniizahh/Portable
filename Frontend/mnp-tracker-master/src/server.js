const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection configuration (update with your details)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mnp_tracker',
  password: 'root',
  port: 5432,
});

// POST endpoint to insert porting request with 4-digit UPC code
app.post('/requests', async (req, res) => {
  const {
    subscriberId,
    currentProvider,
    preferredProvider,
    imsi,
    proofIdType,
    proofIdNumber,
  } = req.body;

  // Generate random 4-digit UPC code as a string
  const upcCode = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    const result = await pool.query(
      `INSERT INTO porting_requests (
          subscriber_id,
          current_provider,
          preferred_provider,
          imsi,
          proof_id_type,
          proof_id_number,
          upc_code
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id`,
      [
        subscriberId,
        currentProvider,
        preferredProvider,
        imsi,
        proofIdType,
        proofIdNumber,
        upcCode,
      ]
    );

    res.json({
      requestReferenceId: result.rows[0].id,
      upcCode: upcCode,
    });
  } catch (err) {
    console.error('Database Insert Error:', err);
    res.status(500).json({ error: 'Failed to create porting request' });
  }
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
