const express = require("express");
const router = express.Router();
const {
  getRecommendations,
  saveRecommendation,
} = require("../../controllers/recommendationController");

// GET /api/recommendations
router.get("/", getRecommendations);

// POST /api/recommendations
router.post("/", saveRecommendation);

module.exports = router;
