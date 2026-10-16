const mongoose = require("mongoose");

const DEFAULT_MONGO_URI = "mongodb://127.0.0.1:27017/krishimitra";

/**
 * Connect to MongoDB using Mongoose
 */
const connectDB = async () => {
  const mongoURI =
    process.env.MONGO_URI && process.env.MONGO_URI.trim() !== ""
      ? process.env.MONGO_URI.trim()
      : DEFAULT_MONGO_URI;

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.log("⚠️ Server running with database offline fallbacks.");
  }
};

/**
 * Disconnect from MongoDB
 */
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("🛑 MongoDB connection closed.");
  } catch (error) {
    console.error("❌ Error closing MongoDB connection:", error.message);
  }
};

/**
 * Helper to get current connection status
 */
const getConnectionStatus = () => {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const readyState = mongoose.connection.readyState;
  return {
    status: states[readyState] || "unknown",
    connected: readyState === 1,
    readyState,
    host: readyState === 1 ? mongoose.connection.host : null,
    port: readyState === 1 ? mongoose.connection.port : null,
    database: readyState === 1 ? mongoose.connection.name : null,
  };
};

// Mongoose connection lifecycle events
mongoose.connection.on("connected", () => {
  console.log("📦 Mongoose connection established");
});

mongoose.connection.on("disconnected", () => {
  console.log("🔌 Mongoose connection disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose error:", err.message);
});

// Handle graceful exit on SIGINT
process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});

module.exports = {
  connectDB,
  disconnectDB,
  getConnectionStatus,
  DEFAULT_MONGO_URI,
};
