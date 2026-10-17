const mongoose = require("mongoose");

const monitoringSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      index: true,
    },
    cropName: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    diseasePrediction: {
      type: String,
    },
    healthScore: {
      type: Number,
    },
    recommendations: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Monitoring", monitoringSchema);
