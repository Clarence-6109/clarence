// apps/backend/analytics-dashboard/data/mockData.js

const metrics = {
  revenue: 124560,
  revenuePrev: 110000,
  users: 8945,
  usersPrev: 8000,
  conversion: 4.9,
  bounce: 32,
};

const activity = Array.from({ length: 50 }, (_, i) => ({
  user: `User ${i + 1}`,
  action: ["Login", "Purchase", "Logout", "Signup"][i % 4],
  date: `2025-12-${(i % 30) + 1}`,
  status: ["Success", "Failed"][i % 2],
}));

module.exports = { metrics, activity };
