const express = require("express");
const router = express.Router();
const { getAlerts, createAlert } = require("../../controllers/alertController");

// GET /api/alerts
router.get("/", getAlerts);

// POST /api/alerts
router.post("/", createAlert);

module.exports = router;
