const { Alert } = require("../database");

// GET /api/alerts
const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ isActive: true }).sort({ createdAt: -1 });
    // Returns array directly to match dashboard.js loadAlerts()
    return res.json(alerts);
  } catch (error) {
    console.error("Alerts Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch alerts",
    });
  }
};

// POST /api/alerts
const createAlert = async (req, res) => {
  try {
    const alert = await Alert.create(req.body);
    return res.status(201).json({
      success: true,
      data: alert,
    });
  } catch (error) {
    console.error("Create Alert Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAlerts,
  createAlert,
};
