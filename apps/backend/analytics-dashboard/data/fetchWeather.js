const axios = require("axios");
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const DB_NAME = "analytics_dashboard";
const COLLECTION = "metrics";

// Replace with your OpenWeatherMap API key
const API_KEY = "YOUR_API_KEY";
const CITY = "London"; // Change to your city
const INTERVAL = 5 * 60 * 1000; // 5 minutes

async function fetchWeather() {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    );

    const data = {
      metricName: "humidity",
      value: res.data.main.humidity,
      timestamp: new Date(),
    };

    await client.connect();
    const db = client.db(DB_NAME);
    await db.collection(COLLECTION).insertOne(data);

    console.log("Inserted weather data:", data);
  } catch (err) {
    console.error("Error fetching weather data:", err.message);
  } finally {
    await client.close();
  }
}

// Start immediately and run every 5 minutes
fetchWeather();
setInterval(fetchWeather, INTERVAL);
