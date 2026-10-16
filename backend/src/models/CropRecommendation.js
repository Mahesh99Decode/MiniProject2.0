const mongoose = require("mongoose");

const cropRecommendationSchema = new mongoose.Schema(
  {
    firebaseUID: String,

    soilType: String,

    temperature: Number,

    humidity: Number,

    rainfall: Number,

    season: String,

    recommendedCrops: [String],

    aiExplanation: String,

    riskLevel: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CropRecommendation",
  cropRecommendationSchema
);