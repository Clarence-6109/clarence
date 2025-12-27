// src/utils/mockData.js

// Initial KPI metrics
export const initialMetrics = {
  revenue: 124560, // Current revenue
  revenuePrev: 110000, // Previous revenue (for comparison)
  users: 8945, // Active users current
  usersPrev: 8000, // Active users previous
  conversion: 4.9, // Conversion rate in %
  bounce: 32, // Bounce rate in %
};

// Mock activity data
export const initialActivity = Array.from({ length: 50 }, (_, i) => [
  `User ${i + 1}`, // User name
  ["Login", "Purchase", "Logout", "Signup"][i % 4], // Action
  `2025-12-${(i % 30) + 1}`, // Date
  ["Success", "Failed"][i % 2], // Status
]);
