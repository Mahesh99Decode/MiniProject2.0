const express = require("express");
const router = express.Router();

const {
  getSchemes,
  createScheme,
} = require("../../controllers/schemeController");

// GET /api/schemes
router.get("/", getSchemes);

// POST /api/schemes
router.post("/", createScheme);

module.exports = router;