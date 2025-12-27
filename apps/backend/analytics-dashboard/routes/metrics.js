const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const DB_NAME = "analytics_dashboard";
const COLLECTION = "metrics";

// GET /api/metrics
router.get("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const metrics = await db
      .collection(COLLECTION)
      .find()
      .sort({ timestamp: -1 })
      .limit(100) // last 100 data points
      .toArray();

    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
