const db = require("../db");

const getRecords = async (req, res) => {
  const { start, end, type } = req.query;
  let query = "SELECT * FROM records WHERE user_id=$1";
  const params = [req.user.id];

  if (start) {
    params.push(start);
    query += ` AND date >= $${params.length}`;
  }
  if (end) {
    params.push(end);
    query += ` AND date <= $${params.length}`;
  }
  if (type) {
    params.push(type);
    query += ` AND record_type_id=$${params.length}`;
  }

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addRecord = async (req, res) => {
  const { title, amount, date, record_type_id, notes } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO records (user_id, record_type_id, title, amount, date, notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [req.user.id, record_type_id, title, amount, date, notes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRecord = async (req, res) => {
  const { id } = req.params;
  const { title, amount, date, record_type_id, notes } = req.body;
  try {
    const result = await db.query(
      "UPDATE records SET title=$1, amount=$2, date=$3, record_type_id=$4, notes=$5 WHERE id=$6 AND user_id=$7 RETURNING *",
      [title, amount, date, record_type_id, notes, id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM records WHERE id=$1 AND user_id=$2", [
      id,
      req.user.id,
    ]);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getRecords, addRecord, updateRecord, deleteRecord };
