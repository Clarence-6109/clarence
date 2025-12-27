// apps/backend/analytics-dashboard/routes/activity.js
const express = require("express");
const router = express.Router();
const connectDB = require("../db");

// GET /api/activity?page=0&limit=5
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const db = await connectDB();
    const total = await db.collection("activity").countDocuments();
    const data = await db
      .collection("activity")
      .find()
      .skip(page * limit)
      .limit(limit)
      .toArray();

    res.json({ total, page, limit, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching activity" });
  }
});

module.exports = router;
