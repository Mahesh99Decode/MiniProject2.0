const { analyzeCropImage } = require("../services/geminiService");

const analyzeImage = async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;

<<<<<<< HEAD
    if (!imageBase64 || !mimeType) {
      return res.status(400).json({
        success: false,
        message: "Image data and mimeType are required"
      });
    }

    // Strip the "data:image/jpeg;base64," prefix if it's there
=======
    if (!imageBase64) {
      return res.status(400).json({
        success: false,
        message: "Image data is required"
      });
    }

    // Strip the "data:image/jpeg;base64," prefix if present
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
    let base64Data = imageBase64;
    if (imageBase64.includes(",")) {
      base64Data = imageBase64.split(",")[1];
    }

<<<<<<< HEAD
    const analysisResult = await analyzeCropImage(base64Data, mimeType);
=======
    const effectiveMimeType = mimeType || "image/jpeg";
    const analysisResult = await analyzeCropImage(base64Data, effectiveMimeType);
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a

    return res.status(200).json({
      success: true,
      data: analysisResult
    });
  } catch (error) {
    console.error("Vision Controller Error:", error.message);
    return res.status(500).json({
      success: false,
<<<<<<< HEAD
      message: "Failed to analyze image"
=======
      message: error.message || "Failed to analyze image"
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
    });
  }
};

module.exports = {
  analyzeImage
};
