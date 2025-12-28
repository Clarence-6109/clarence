const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const pool = require("../db");

// GET user records
router.get("/", authenticateToken, async (req, res) => {
  try {
    const records = await pool.query("SELECT * FROM records WHERE user_id=$1", [
      req.user.id,
    ]);
    res.json(records.rows);
  } catch (err) {
    console.error("Fetch records error:", err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch records. Please try again." });
  }
});

// POST new record
router.post("/", authenticateToken, async (req, res) => {
  const { title, amount, date, record_type_id, notes } = req.body;

  if (!title || !amount || !date || !record_type_id) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    await pool.query(
      "INSERT INTO records(user_id, title, amount, date, record_type_id, notes) VALUES($1,$2,$3,$4,$5,$6)",
      [req.user.id, title, amount, date, record_type_id, notes || ""]
    );
    res.status(201).json({ message: "Record saved successfully" });
  } catch (err) {
    console.error("Save record error:", err.message);
    res
      .status(500)
      .json({ message: "Failed to save record. Please try again." });
  }
});

module.exports = router;
