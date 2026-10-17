const mongoose = require("mongoose");

const simulationSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      index: true,
    },
    cropType: {
      type: String,
    },
    soilQuality: {
      type: String,
    },
    waterLevel: {
      type: Number,
    },
    fertilizerUsage: {
      type: Number,
    },
    weatherCondition: {
      type: String,
    },
    expectedYield: {
      type: Number,
    },
    expectedProfit: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Simulation", simulationSchema);
