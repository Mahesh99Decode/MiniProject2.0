const { analyzeCropImage } = require("../services/geminiService");

const analyzeImage = async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        success: false,
        message: "Image data is required"
      });
    }

    // Strip the "data:image/jpeg;base64," prefix if present
    let base64Data = imageBase64;
    if (imageBase64.includes(",")) {
      base64Data = imageBase64.split(",")[1];
    }

    const effectiveMimeType = mimeType || "image/jpeg";
    const analysisResult = await analyzeCropImage(base64Data, effectiveMimeType);

    return res.status(200).json({
      success: true,
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
