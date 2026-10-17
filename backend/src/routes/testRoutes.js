const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const User = require('../models/User');
const verifyFirebaseToken = require("../middleware/authMiddleware");

router.post("/create-user", verifyFirebaseToken, async (req, res) => {
  try {
    const existingUser = await User.findOne({
      firebaseUID: req.user.uid,
=======
const mongoose = require("mongoose");
const {
  User,
  Scheme,
  CropRecommendation,
  Monitoring,
  Simulation,
  Alert,
} = require("../../database");
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET /api/test/db-status
// @desc    Check MongoDB connection health and collection document counts
router.get("/db-status", async (req, res) => {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const readyState = mongoose.connection.readyState;
  const isConnected = readyState === 1;

  try {
    let counts = {};
    if (isConnected) {
      const [
        userCount,
        schemeCount,
        cropRecCount,
        monitoringCount,
        simulationCount,
        alertCount,
      ] = await Promise.all([
        User.countDocuments().catch(() => 0),
        Scheme.countDocuments().catch(() => 0),
        CropRecommendation.countDocuments().catch(() => 0),
        Monitoring.countDocuments().catch(() => 0),
        Simulation.countDocuments().catch(() => 0),
        Alert.countDocuments().catch(() => 0),
      ]);

      counts = {
        users: userCount,
        schemes: schemeCount,
        cropRecommendations: cropRecCount,
        monitorings: monitoringCount,
        simulations: simulationCount,
        alerts: alertCount,
      };
    }

    res.json({
      success: true,
      mongodb: {
        status: states[readyState] || "unknown",
        connected: isConnected,
        readyState,
        host: isConnected ? mongoose.connection.host : null,
        port: isConnected ? mongoose.connection.port : null,
        database: isConnected ? mongoose.connection.name : null,
      },
      counts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/create-user", authMiddleware, async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.user.email,
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
    });

    if (existingUser) {
      return res.json(existingUser);
    }

    const user = await User.create({
<<<<<<< HEAD
      firebaseUID: req.user.uid,
      name: req.user.name,
      email: req.user.email,
      photoURL: req.user.picture,
=======
      username: req.user.username || ("farmer_" + Date.now()),
      name: req.user.name,
      email: req.user.email,
      photoURL: req.user.photoURL,
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;