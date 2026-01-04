const express = require("express");
const db = require("../db");
const router = express.Router();

// Add a record (POST /api/finances)
router.post("/", async (req, res) => {
  const { user_id, type, amount, category, date } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO financial_records (user_id, type, amount, category, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, type, amount, category, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all records for a user (GET /api/finances/:user_id)
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM financial_records WHERE user_id = $1 ORDER BY date DESC",
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get aggregated data for charts (GET /api/finances/charts/:user_id)
router.get("/charts/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    // Monthly income/expense
    const monthly = await db.query(
      `
      SELECT 
        TO_CHAR(date, 'YYYY-MM') AS month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense
      FROM financial_records
      WHERE user_id = $1
      GROUP BY month
      ORDER BY month
    `,
      [user_id]
    );

    // Category breakdown (expenses only, for pie chart)
    const categories = await db.query(
      `
      SELECT category, SUM(amount) AS total
      FROM financial_records
      WHERE user_id = $1 AND type = 'expense'
      GROUP BY category
    `,
      [user_id]
    );

    res.json({ monthly: monthly.rows, categories: categories.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
