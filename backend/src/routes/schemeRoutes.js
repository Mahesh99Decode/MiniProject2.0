const express = require("express");
const router = express.Router();

const {
  getSchemes
} = require("../../controllers/schemeController");

// GET /api/schemes
router.get("/", getSchemes);

module.exports = router;