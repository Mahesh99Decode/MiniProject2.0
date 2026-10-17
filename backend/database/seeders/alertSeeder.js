const Alert = require("../models/Alert");

const initialAlerts = [
  {
    title: "Heavy Rainfall Expected",
    message: "Moderate to heavy precipitation expected in Nashik region over the next 48 hours. Ensure field drainage channels are clear.",
    type: "warning",
    severity: "high",
    targetRegion: "Maharashtra",
    isActive: true,
  },
  {
    title: "Pest Advisory: Fall Armyworm",
    message: "Early signs of Fall Armyworm detected in surrounding maize & sugarcane fields. Inspect lower leaf surfaces and apply neem spray.",
    type: "danger",
    severity: "critical",
    targetRegion: "Maharashtra",
    isActive: true,
  },
  {
    title: "Favorable Sowing Window",
    message: "Optimal soil temperature and moisture detected for Rabi wheat sowing over the upcoming 5 days.",
    type: "info",
    severity: "low",
    targetRegion: "All India",
    isActive: true,
  },
];

/**
 * Seeds initial alerts into MongoDB
 */
const seedAlerts = async () => {
  console.log(`🚨 Seeding ${initialAlerts.length} farm alerts...`);
  let count = 0;

  for (const alertData of initialAlerts) {
    await Alert.findOneAndUpdate(
      { title: alertData.title },
      { $set: alertData },
      { upsert: true, returnDocument: "after" }
    );
    count++;
  }

  console.log(`✅ Seeded ${count} alerts into MongoDB.`);
  return count;
};

module.exports = seedAlerts;
