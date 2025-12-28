const pool = require("../db");

exports.getRecordTypes = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM record_types ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET record types error:", err);
    res.status(500).json({ message: "Failed to fetch record types" });
  }
};

exports.createRecordType = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const result = await pool.query(
      "INSERT INTO record_types(name) VALUES($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("CREATE record type error:", err);
    res.status(500).json({ message: "Failed to create record type" });
  }
};
