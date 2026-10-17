const Scheme = require("../models/Scheme");
const schemesData = require("../../data/schemeData.json");

/**
 * Seeds schemes from data/schemeData.json into MongoDB
 */
const seedSchemes = async () => {
  console.log(`🌱 Seeding ${schemesData.length} schemes...`);
  let count = 0;

  for (const item of schemesData) {
    const payload = {
      schemeId: item.id,
      name: item.name,
      state: item.state || "All India",
      type: item.type,
      category: item.category,
      description: item.description,
      eligibility: item.eligibility,
      benefits: item.benefits,
      appProcess: item.appProcess,
      tags: item.tags || [],
      officialLink: item.officialLink || "",
    };

    await Scheme.findOneAndUpdate(
      { schemeId: item.id },
      { $set: payload },
      { upsert: true, returnDocument: "after" }
    );
    count++;
  }

  console.log(`✅ Seeded ${count} schemes into MongoDB.`);
  return count;
};

module.exports = seedSchemes;
