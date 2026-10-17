const { CropRecommendation } = require("../database");

// Default initial recommendations if none saved yet
const DEFAULT_CROPS = [
  { name: "Soybean (JS-335)", profitability: "High", score: 94 },
  { name: "Wheat (HD-2967)", profitability: "Medium-High", score: 88 },
  { name: "Gram / Chickpea (Digvijay)", profitability: "High", score: 82 },
];

// GET /api/recommendations
const getRecommendations = async (req, res) => {
  try {
    const records = await CropRecommendation.find()
      .sort({ createdAt: -1 })
      .limit(10);

    if (records.length === 0) {
      return res.json(DEFAULT_CROPS);
    }

    const formatted = records.map((r) => ({
      name: r.recommendedCrops?.[0] || "Recommended Crop",
      profitability: r.profitability || "High",
      score: r.score || 90,
      riskLevel: r.riskLevel || "Low",
      explanation: r.aiExplanation || "",
    }));

    return res.json(formatted);
  } catch (error) {
    console.error("Recommendation Controller Error:", error);
    return res.json(DEFAULT_CROPS);
  }
};

// POST /api/recommendations
const saveRecommendation = async (req, res) => {
  try {
    const record = await CropRecommendation.create(req.body);
    return res.status(201).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error("Save Recommendation Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRecommendations,
  saveRecommendation,
};
