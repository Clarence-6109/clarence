const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const pool = require("../db");

const router = express.Router();

router.use(authenticateToken);

// GET all record types
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM record_types ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch record types error:", err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch record types. Please try again." });
  }
});

module.exports = router;
