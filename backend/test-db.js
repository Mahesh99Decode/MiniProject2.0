const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const {
  connectDB,
  disconnectDB,
  getConnectionStatus,
  User,
  Scheme,
  Alert,
} = require("./database");

async function testDatabase() {
  console.log("1. Connecting to MongoDB using backend/database module...");
  await connectDB();

  const status = getConnectionStatus();
  console.log("   Connection Status:", status);

  if (!status.connected) {
    console.error("❌ Failed to connect to MongoDB");
    process.exit(1);
  }

  console.log("\n2. Testing Scheme collection in MongoDB...");
  const schemesCount = await Scheme.countDocuments();
  console.log(`   Total Schemes in DB: ${schemesCount}`);

  console.log("\n3. Testing Alert collection in MongoDB...");
  const alertsCount = await Alert.countDocuments();
  console.log(`   Total Alerts in DB: ${alertsCount}`);

  console.log("\n4. Testing User insert & delete in MongoDB...");
  const testEmail = `test_${Date.now()}@krishimitra.org`;
  const testUsername = `user_${Date.now()}`;
  const user = await User.create({
    username: testUsername,
    email: testEmail,
    password: "Password123!",
    name: "Farmer Tester",
    location: "Nashik, Maharashtra",
  });
  console.log(`   Created user: ${user.name} (${user.email})`);
  await User.deleteOne({ _id: user._id });
  console.log("   Cleaned up test user successfully.");

  console.log("\n🎉 ALL TESTS PASSED FOR backend/database MODULE!");
  await disconnectDB();
  process.exit(0);
}

testDatabase().catch((err) => {
  console.error("❌ Test error:", err);
  process.exit(1);
});
