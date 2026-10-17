const {
  connectDB,
  disconnectDB,
  getConnectionStatus,
  DEFAULT_MONGO_URI,
} = require("./connection");

const models = require("./models");
const seeders = require("./seeders");

module.exports = {
  // Connection helpers
  connectDB,
  disconnectDB,
  getConnectionStatus,
  DEFAULT_MONGO_URI,

  // Models object & individual models
  models,
  User: models.User,
  Scheme: models.Scheme,
  CropRecommendation: models.CropRecommendation,
  Monitoring: models.Monitoring,
  Simulation: models.Simulation,
  Alert: models.Alert,

  // Seeders
  seeders,
  runAllSeeders: seeders.runAllSeeders,
};
