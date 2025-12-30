require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const recordsRoutes = require("./routes/records");
const recordTypesRoutes = require("./routes/recordTypes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://analytics-dashboard-clarence.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/records", recordsRoutes);
app.use("/record-types", recordTypesRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
