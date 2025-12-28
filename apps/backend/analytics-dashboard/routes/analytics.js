const router = require("express").Router();
const pool = require("../db");

/**
 * GET /analytics/summary
 * ?groupBy=month&metric=sum&start=2025-01-01&end=2025-12-31
 */
router.get("/summary", async (req, res) => {
  const { groupBy = "month", metric = "sum", start, end } = req.query;

  const dateTrunc =
    groupBy === "day" ? "day" : groupBy === "year" ? "year" : "month";

  const aggregate = metric === "avg" ? "AVG" : "SUM";

  let where = "";
  const params = [];

  if (start && end) {
    where = "WHERE date BETWEEN $1 AND $2";
    params.push(start, end);
  }

  const query = `
    SELECT
      DATE_TRUNC('${dateTrunc}', date) AS period,
      ${aggregate}(amount) AS total
    FROM records
    ${where}
    GROUP BY period
    ORDER BY period
  `;

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Aggregation failed" });
  }
});

module.exports = router;
