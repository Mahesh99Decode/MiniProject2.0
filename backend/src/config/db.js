const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI || process.env.MONGO_URI.trim() === "") {
    console.log("MongoDB Notice: No MONGO_URI configured. Running server with in-memory fallbacks.");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB Warning:", error.message);
    console.log("Server will continue without MongoDB. DB-dependent routes may not work.");
  }
};

module.exports = connectDB;