const seedSchemes = require("./schemeSeeder");
const seedAlerts = require("./alertSeeder");

/**
 * Run all seeders in sequence
 */
const runAllSeeders = async () => {
  console.log("⚡ Starting database seeding process...");
  const schemeCount = await seedSchemes();
  const alertCount = await seedAlerts();
  console.log("🎉 All database seeders completed successfully!");
  return { schemeCount, alertCount };
};

module.exports = {
  runAllSeeders,
  seedSchemes,
  seedAlerts,
};
