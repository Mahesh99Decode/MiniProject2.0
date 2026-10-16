const express = require("express");
const router = express.Router();
const chatbotController = require("../../controllers/chatbotController");

router.post("/chat", chatbotController.chatWithAI);
router.post("/recommend", chatbotController.getRecommendation);

module.exports = router;