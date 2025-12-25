import cors from "cors"; // <-- Add this line here
import express from "express";

const app = express();
const PORT = 3000;
// Middleware
app.use(cors()); // <-- Add this line here, right after const app = express();
app.use(express.json());

// Mock habits data
const habits = ["Exercise", "Read a book", "Meditate", "Drink water"];

// GET /habits route
app.get("/habits", (req, res) => {
  res.json(habits);
});

// POST /ai-cheer route
app.post("/ai-cheer", (req, res) => {
  const { habit } = req.body;
  if (!habit) {
    return res.status(400).json({ error: "Habit is required" });
  }
  res.json({ message: `Great job on your ${habit}!` });
});
// Add a default route for the frontend to connect to
app.get("/", (req, res) => {
  res.json({ message: "Clarence Backend is Live (Node 24)" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
