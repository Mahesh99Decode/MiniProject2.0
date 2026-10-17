const path = require("path");
const dotenv = require("dotenv");

// Load .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { connectDB, disconnectDB } = require("./connection");
const { runAllSeeders } = require("./seeders");

async function main() {
  try {
    console.log("Connecting to MongoDB for seeding...");
    await connectDB();
    await runAllSeeders();
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
}

main();
