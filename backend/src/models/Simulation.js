const mongoose = require("mongoose");

const simulationSchema = new mongoose.Schema(
  {
    firebaseUID: String,

    waterLevel: Number,

    fertilizerUsage: Number,

    weatherCondition: String,

    expectedYield: Number,

    expectedProfit: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Simulation", simulationSchema);