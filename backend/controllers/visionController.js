const { analyzeCropImage } = require("../services/geminiService");

const analyzeImage = async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64 || !mimeType) {
      return res.status(400).json({
        success: false,
        message: "Image data and mimeType are required"
      });
    }

    // Strip the "data:image/jpeg;base64," prefix if it's there
    let base64Data = imageBase64;
    if (imageBase64.includes(",")) {
      base64Data = imageBase64.split(",")[1];
    }

    const analysisResult = await analyzeCropImage(base64Data, mimeType);

    return res.status(200).json({
      success: true,
      data: analysisResult
    });
  } catch (error) {
    console.error("Vision Controller Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to analyze image"
    });
  }
};

module.exports = {
  analyzeImage
};
