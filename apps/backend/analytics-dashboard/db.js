const { Pool } = require("pg");

const pool = new Pool({
  user: "your_pg_user", // Replace with your PostgreSQL credentials
  host: "localhost",
  database: "analytics_db",
  password: "aa7a912d25f24a9bbc7597b255e46af0",
  port: 5000,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
