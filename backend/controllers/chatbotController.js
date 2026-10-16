const {
  getFarmResponse,
} = require("../services/geminiService");

const chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body;

    // Validate message

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Generate AI response

    const aiResponse = await getFarmResponse(message, context);

    // Send response

    return res.status(200).json({
      success: true,
      reply: aiResponse,
    });

  } catch (error) {
    console.error(
      "Chatbot Controller Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate AI response",
    });
  }
};

const getRecommendation = async (req, res) => {
  try {
    const payload = req.body;
    const { generateFarmRecommendation } = require("../services/geminiService");

    const recommendation = await generateFarmRecommendation(payload);

    return res.status(200).json({
      success: true,
      recommendation
    });
  } catch (error) {
    console.error("Recommendation Controller Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to generate recommendation"
    });
  }
};

module.exports = {
  chatWithAI,
  getRecommendation
};