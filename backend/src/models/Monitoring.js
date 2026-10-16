const mongoose = require("mongoose");

const monitoringSchema = new mongoose.Schema(
  {
    firebaseUID: String,

    cropName: String,

    imageUrl: String,

    diseasePrediction: String,

    healthScore: Number,

    recommendations: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Monitoring", monitoringSchema);