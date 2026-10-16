const mongoose = require("mongoose");

const cropRecommendationSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      index: true,
    },
    soilType: {
      type: String,
    },
    temperature: {
      type: Number,
    },
    humidity: {
      type: Number,
    },
    rainfall: {
      type: Number,
    },
    season: {
      type: String,
    },
    recommendedCrops: [
      {
        type: String,
      },
    ],
    aiExplanation: {
      type: String,
    },
    riskLevel: {
      type: String,
    },
    profitability: {
      type: String,
    },
    score: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CropRecommendation", cropRecommendationSchema);
