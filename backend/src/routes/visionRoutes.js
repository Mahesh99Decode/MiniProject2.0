const express = require("express");
const router = express.Router();
const visionController = require("../../controllers/visionController");

router.post("/analyze", visionController.analyzeImage);

module.exports = router;
