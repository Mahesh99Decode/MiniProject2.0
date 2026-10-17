const axios = require("axios");
const { analyzeCropImage } = require("../services/geminiService");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:5002";

const analyzeImage = async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        success: false,
        message: "Image data is required"
      });
    }

    // 1. Try Python ML Model Service (MobileNetV3 Deep Learning Model)
    try {
      const mlResponse = await axios.post(
        `${ML_SERVICE_URL}/predict-disease`,
        { imageBase64, mimeType },
        { timeout: 7000 }
      );

      if (mlResponse.data && mlResponse.data.success && mlResponse.data.data) {
        return res.status(200).json({
          success: true,
          source: "ml-model",
          data: mlResponse.data.data
        });
      }
    } catch (mlErr) {
      console.warn("ML Service unavailable or returned error, falling back to secondary engine:", mlErr.message);
    }

    // 2. Fallback to Gemini / Heuristic Clinical Engine
    let base64Data = imageBase64;
    if (imageBase64.includes(",")) {
      base64Data = imageBase64.split(",")[1];
    }

    const effectiveMimeType = mimeType || "image/jpeg";
    const analysisResult = await analyzeCropImage(base64Data, effectiveMimeType);

    return res.status(200).json({
      success: true,
      source: "pathology-engine",
      data: analysisResult
    });
  } catch (error) {
    console.error("Vision Controller Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to analyze image"
    });
  }
};

module.exports = {
  analyzeImage
};
