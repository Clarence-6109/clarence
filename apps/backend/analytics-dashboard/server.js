// apps/backend/analytics-dashboard/server.js
const express = require("express");
const cors = require("cors");
const metricsRouter = require("./routes/metrics");
const activityRouter = require("./routes/activity");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/metrics", metricsRouter);
app.use("/api/activity", activityRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
